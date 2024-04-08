const yup = require("yup");
const express = require("express");
const router = express.Router();
const { Order, Product, Size } = require("../models");

const ObjectId = require("mongodb").ObjectId;

const { CONNECTION_STRING } = require('../constants/dbSettings');
const { default: mongoose } = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);


router.get('/', async (req, res, next) => {
    try {
        let orders = await Order.find().populate('customer').populate('employee').populate('shippingAddress').lean({ virtuals: true });

        // Bổ sung thông tin về giá sản phẩm trong mỗi đơn hàng
        orders = await Promise.all(orders.map(async (order) => {
            order.orderDetails = await Promise.all(order.orderDetails.map(async (detail) => {
                const product = await Product.findById(detail.productId);
                return {
                    ...detail,
                    price: product.price // Thêm thông tin giá sản phẩm vào mỗi mục trong orderDetails
                };
            }));
            return order;
        }));

        res.json(orders);
    } catch (error) {
        res.status(500).json({ ok: false, error });
    }
});

router.get('/status', async (req, res) => {
    try {
        const statusCounts = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const formattedData = statusCounts.reduce((acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
        }, {});
        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/revenue', async (req, res, next) => {
    try {
        const orders = await Order.find({ status: 'COMPLETE' }); // Chỉ lấy các đơn hàng có status là 'COMPLETE'
        const monthlyRevenue = calculateMonthlyRevenue(orders);
        res.status(200).json(monthlyRevenue);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Hàm tính toán doanh thu theo tháng và năm từ danh sách đơn hàng
const calculateMonthlyRevenue = (orders) => {
    const monthlyRevenue = {};
    orders.forEach((order) => {
        if (order.status === 'COMPLETE') { // Chỉ tính toán doanh thu cho các đơn hàng có status là 'COMPLETE'
            const year = new Date(order.createdAt).getFullYear(); // Lấy năm từ createdAt
            const month = new Date(order.createdAt).getMonth() + 1; // Lấy tháng từ createdAt
            const revenue = order.orderDetails.reduce((total, item) => total + (((item.price * (100 - item.discount)) /
                100) *
                item.quantity), 0); // Tính doanh thu từ orderDetails
            if (!monthlyRevenue[year]) {
                monthlyRevenue[year] = {};
            }
            monthlyRevenue[year][month] = (monthlyRevenue[year][month] || 0) + revenue; // Thêm doanh thu vào tháng và năm tương ứng hoặc mặc định là 0 nếu không có doanh số
        }
    });

    // Đảm bảo rằng cả các tháng không có doanh số cũng được đưa vào đối tượng monthlyRevenue
    for (const year in monthlyRevenue) {
        for (let i = 1; i <= 12; i++) {
            if (!monthlyRevenue[year][i]) {
                monthlyRevenue[year][i] = 0;
            }
        }
    }

    return monthlyRevenue;
};

router.get("/:id", async function (req, res, next) {
    try {
        const validationSchema = yup.object().shape({
            params: yup.object({
                id: yup
                    .string()
                    .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
                        return ObjectId.isValid(value);
                    }),
            }),
        });

        await validationSchema.validate({ params: req.params }, { abortEarly: false });

        const { id } = req.params;

        const orders = await Order.find({ customerId: id })
            .populate("orderDetails.productId")
            .populate("customer")
            .lean({ virtual: true });

        if (orders.length > 0) {
            return res.send({ ok: true, results: orders });
        }

        return res.send({ ok: false, message: "No orders found for the customer" });
    } catch (error) {
        return res.status(400).json({
            type: error.name,
            errors: error.errors,
            message: error.message,
            provider: "yup",
        });
    }
});


router.post("/", async function (req, res, next) {
    try {
        const data = req.body;

        const newItem = new Order(data);
        const savedItem = await newItem.save();

        await updateProductStock(savedItem);

        res.send(savedItem);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

async function updateProductStock(order) {
    for (const orderDetail of order.orderDetails) {
        const productId = orderDetail.productId;
        const quantity = orderDetail.quantity;

        if (orderDetail.size) {
            const product = await Product.findOne({ _id: productId }).populate("sizeId")

            const sizeIndex = product.sizeId.sizes.findIndex(size => size.size === orderDetail.size);
            
            if (sizeIndex >= 0) {
              
                product.sizeId.sizes[sizeIndex].stock -= quantity;
               
                await product.sizeId.save();
            } else {
                console.log(`Không tìm thấy kích thước ${orderDetail.size} cho sản phẩm ${productId}`);
            }
        } else {
            await Product.updateOne({ _id: productId }, { $inc: { stock: -quantity } });
        }
    }
}




router.delete("/:id", function (req, res, next) {
    const validationSchema = yup.object().shape({
        params: yup.object({
            id: yup
                .string()
                .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
                    return ObjectId.isValid(value);
                }),
        }),
    });

    validationSchema
        .validate({ params: req.params }, { abortEarly: false })
        .then(async () => {
            try {
                const id = req.params.id;

                let found = await Order.findByIdAndDelete(id);

                if (found) {
                    return res.send({ ok: true, result: found });
                }

                return res.status(410).send({ ok: false, message: "Object not found" });
            } catch (err) {
                return res.status(500).json({ error: err });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                type: err.name,
                errors: err.errors,
                message: err.message,
                provider: "yup",
            });
        });
});


router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;
        await Order.findByIdAndUpdate(id, data);

        res.send({ ok: true, message: "Updated" });
    } catch (error) {
        res.status(500).send({ ok: false, error });
    }
});

router.patch("/return-stock/:orderId", async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        // Lấy thông tin đơn hàng được hủy từ orderId
        const cancelledOrder = await Order.findById(orderId);

        // Kiểm tra xem đơn hàng có tồn tại hay không
        if (!cancelledOrder) {
            return res.status(404).json({ message: "Đơn hàng không tồn tại" });
        }

        // Trả lại số lượng sản phẩm cho mỗi product trong orderDetails
        for (const orderDetail of cancelledOrder.orderDetails) {
            const productId = orderDetail.productId;
            const quantity = orderDetail.quantity;

            if (orderDetail.size) {
                const product = await Product.findOne({ _id: productId }).populate("sizeId")

                const sizeIndex = product.sizeId.sizes.findIndex(size => size.size === orderDetail.size);

                if (sizeIndex >= 0) {
                    product.sizeId.sizes[sizeIndex].stock += quantity;

                    await product.sizeId.save();
                } else {
                    console.log(`Không tìm thấy kích thước ${orderDetail.size} cho sản phẩm ${productId}`);
                }
            } else {
                await Product.updateOne(
                    { _id: productId },
                    { $inc: { stock: quantity } }
                );
            }
        }

        res.status(200).json({ message: "Đã hoàn trả số lượng sản phẩm thành công" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
