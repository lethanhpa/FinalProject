import React, { memo, useEffect, useState } from "react";
import numeral from "numeral";
import { BackTop, Modal, Input, Rate, message } from "antd";
import axiosClient from "@/libraries/axiosClient";
import { API_URL } from "@/constants";
import Moment from "moment";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const { TextArea } = Input;

function PurchaseHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [reviewedProducts, setReviewedProducts] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const updatedReviewedProducts = orders.reduce((acc, order) => {
        order.orderDetails.forEach(detail => {
          if (reviewedProducts[detail.productId._id]) {
            acc[detail.productId._id] = true;
          }
        });
        return acc;
      }, {});
      setReviewedProducts(updatedReviewedProducts);
    }
  }, [orders]);

  useEffect(() => {
    const reviewedProductsFromStorage = JSON.parse(localStorage.getItem("reviewedProducts"));
    if (reviewedProductsFromStorage) {
      setReviewedProducts(reviewedProductsFromStorage);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const customerId = decoded._id;

      const response = await axiosClient.get(`/orders/${customerId}`);
      const data = response.data.results;

      data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const showModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      if (rating === 0) {
        message.error("Vui lòng chọn số sao để đánh giá sản phẩm.");
        return;
      }

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const customerId = decoded._id;

      const reviewData = {
        customerId: customerId,
        productId: selectedProductId._id,
        ratingRate: rating,
        comment: comment,
        reviewDate: new Date()
      };

      const response = await axiosClient.post('/reviews', reviewData);

      message.success("Bạn đã đánh giá thành công!");

      const updatedReviewedProducts = {
        ...reviewedProducts,
        [selectedProductId._id]: true,
      };
      setReviewedProducts(updatedReviewedProducts);
      localStorage.setItem("reviewedProducts", JSON.stringify(updatedReviewedProducts));

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axiosClient.patch(`/orders/${orderId}`, {
        status: "CANCELED",
      });

      if (response.status === 200) {
        await axiosClient.patch(`/orders/return-stock/${orderId}`);
        fetchOrders();
      } else {
        console.error("Có lỗi xảy ra khi hủy đơn hàng");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu hủy đơn hàng", error);
    }
  };

  const getOrderAction = (status, productId, order) => {
    console.log('order', order);
    const isReviewed = reviewedProducts[productId._id];

    if (status === "COMPLETE") {
      if (!isReviewed) { // Nếu sản phẩm chưa được đánh giá
        return (
          <button
            className="bg-primry text-white font-bold w-[150px] h-[40px] rounded-full hover:bg-white hover:text-primry hover:border-primry hover:border mr-5"
            onClick={() => showModal(productId)}
          >
            Đánh giá
          </button>
        );
      } else {
        return (
          <button
            className="bg-primry text-white font-bold w-[150px] h-[40px] rounded-full hover:bg-white hover:text-primry hover:border-primry hover:border mr-5"
            onClick={() => HandleMuaLai(productId)}
          >
            Mua lại
          </button>
        );
      }
    } else if (status === "WAITING") {
      return (
        <button
          className="mr-5 bg-primry text-white font-bold w-[150px] h-[40px] rounded-full hover:bg-white hover:text-primry hover:border-primry hover:border"
          onClick={() => handleCancelOrder(order)}
        >
          Hủy đơn hàng
        </button>
      );
    }
    return null;
  };

  const HandleMuaLai = (productId) => {
    router.push(`/${productId._id}`);
  }

  const getStatusText = (status) => {
    if (status === "COMPLETE") {
      return "Đã mua";
    } else if (status === "WAITING") {
      return "Đang đợi duyệt";
    } else {
      return "Đã hủy";
    }
  };

  return (
    <div className="py-14  md:px-6 xl:px-20 xl:container ">
      <div className="flex justify-start item-start flex-col ">
        <h1 className="text-xl leading-[28px] font-bold text-center font-roboto text-primry">
          LỊCH SỬ MUA HÀNG
        </h1>
      </div>
      <div className="flex flex-col mt-[20px]" style={{
        background: "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
      }}>
        {orders &&
          orders
            .filter((order) => order.status !== "CANCELED")
            .map((order) => (
              <div key={order._id}>
                {order.orderDetails.map((detail, index) => {
                  const totalAmount = detail.price * detail.quantity;
                  return (
                    <div key={index} className="flex shadow-xl border-b">
                      <div className="max-w-[250px]">
                        <img
                          src={`${API_URL}${detail.imageUrl}`}
                          alt={`Image-${detail._id}`}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-[30px]">
                        <div className="w-full flex flex-col justify-center items-center md:items-start gap-[16px] ">
                          <h3 className="font-bold font-roboto w-[300px]">
                            {detail.productName}
                          </h3>
                          <div className="flex justify-start items-start flex-col gap-[8px] max-w-[400px]">
                            <p className="text-sm font-roboto">
                              <span>Số lượng: </span>
                              {detail.quantity}
                            </p>
                            <p className="text-sm font-roboto">
                              <span>Giá: </span>
                              {numeral(totalAmount).format("0,0")}đ
                            </p>
                          </div>
                        </div>
                        <p className="text-lg flex justify-center items-center font-roboto font-medium w-full">
                          {getStatusText(order.status)}
                        </p>
                        <div className="flex xl:gap-[180px] lg:gap-[100px]">
                          <p className="text-lg flex justify-center items-center font-roboto ">
                            {Moment(`${order.createdDate}`).format("DD/MM/YYYY")}
                          </p>
                          {getOrderAction(order.status, detail.productId, order._id)}
                          <Modal
                            title={"Đánh giá sản phẩm"}
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            className="font-roboto text-sm"
                          >
                            {selectedProductId && orders && orders.map(order => (
                              order.orderDetails.map((detail, index) => {
                                if (detail.productId === selectedProductId) {
                                  return (
                                    <div key={index}>
                                      <div className="flex">
                                        <div className="max-w-[100px]">
                                          <img
                                            src={`${API_URL}${detail.imageUrl}`}
                                            alt={`Image-${detail._id}`}
                                            className="object-contain"
                                          />
                                        </div>
                                        <h3 className="font-roboto flex items-center justify-center">
                                          {detail.productName}
                                        </h3>
                                      </div>
                                      <div className="flex gap-8">
                                        <p className="font-roboto mb-4">Chất lượng sản phẩm</p>
                                        <Rate allowHalf defaultValue={0} onChange={handleRatingChange} />
                                      </div>
                                      <TextArea placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với người mua khác nhé!" allowClear value={comment} onChange={handleCommentChange} />
                                    </div>
                                  );
                                }
                              })
                            ))}
                          </Modal>
                        </div>
                      </div>
                    </div>);
                })}
              </div>
            ))}
        {orders &&
          orders
            .filter((order) => order.status === "CANCELED")
            .map((order) => (
              <div key={order._id}>
                {order.orderDetails.map((detail, index) => (
                  <div key={index} className="flex shadow-xl border-b">
                    <div className="max-w-[250px]">
                      <img
                        src={`${API_URL}${detail.imageUrl}`}
                        alt={`Image-${detail._id}`}
                        style={{ width: 200 }}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-[30px]">
                      <div className="w-full flex flex-col justify-center items-center md:items-start gap-[16px] ">
                        <h3 className="font-bold font-roboto w-[300px]">
                          {detail.productName}
                        </h3>
                        <div className="flex justify-start items-start flex-col gap-[8px] max-w-[400px]">
                          {/* <p className="text-sm">
                        <span className="font-roboto">Mã : </span> {detail.ma}
                      </p>
                      <p className="text-sm  ">
                        <span className="font-roboto">Size : </span>
                        {detail.size}
                      </p> */}
                          <p className="text-sm font-roboto">
                            <span>Số lượng: </span>
                            {detail.quantity}
                          </p>
                          <p className="text-sm font-roboto">
                            <span>Giá: </span>
                            {numeral(detail.price).format("0,0")}đ
                          </p>
                        </div>
                      </div>
                      <p className="text-lg flex justify-center items-center font-roboto font-medium w-full">
                        {getStatusText(order.status)}
                      </p>
                      {/* <div className="flex xl:gap-[180px] lg:gap-[100px]">
                        <p className="text-lg flex justify-center items-center font-roboto ">
                          {Moment(`${order.createdDate}`).format("DD/MM/YYYY")}
                        </p>
                        {getOrderAction(order.status, detail, order._id)}

                        <Modal
                          title="Đánh giá sản phẩm"
                          visible={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          className="font-roboto text-sm"
                        >
                          <div className="flex">
                            <div className="max-w-[100px]">
                              <img
                                src={`${API_URL}${detail.imageUrl}`}
                                alt={`Image-${detail._id}`}
                                className="object-contain"
                              />
                            </div>
                            <h3 className="font-roboto flex items-center justify-center">
                              {detail.productName}
                            </h3>
                          </div>
                          <div className="flex gap-8">
                            <p className="font-roboto mb-4">
                              Chất lượng sản phẩm
                            </p>
                            <Rate allowHalf defaultValue={0} onChange={handleRatingChange} />
                          </div>
                          <TextArea
                            placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này với người mua khác nhé!"
                            allowClear
                          />
                        </Modal>
                      </div> */}
                      <div className="flex xl:gap-[180px] lg:gap-[100px]">
                          <p className="text-lg flex justify-center items-center font-roboto ">
                            {Moment(`${order.createdDate}`).format("DD/MM/YYYY")}
                          </p>
                          {getOrderAction(order.status, detail.productId, order._id)}
                          <Modal
                            title={"Đánh giá sản phẩm"}
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            className="font-roboto text-sm"
                          >
                            {selectedProductId && orders && orders.map(order => (
                              order.orderDetails.map((detail, index) => {
                                if (detail.productId === selectedProductId) {
                                  return (
                                    <div key={index}>
                                      <div className="flex">
                                        <div className="max-w-[100px]">
                                          <img
                                            src={`${API_URL}${detail.imageUrl}`}
                                            alt={`Image-${detail._id}`}
                                            className="object-contain"
                                          />
                                        </div>
                                        <h3 className="font-roboto flex items-center justify-center">
                                          {detail.productName}
                                        </h3>
                                      </div>
                                      <div className="flex gap-8">
                                        <p className="font-roboto mb-4">Chất lượng sản phẩm</p>
                                        <Rate allowHalf defaultValue={0} onChange={handleRatingChange} />
                                      </div>
                                      <TextArea placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với người mua khác nhé!" allowClear value={comment} onChange={handleCommentChange} />
                                    </div>
                                  );
                                }
                              })
                            ))}
                          </Modal>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
      </div>

      <BackTop />
    </div>
  );
}

export default memo(PurchaseHistory);
