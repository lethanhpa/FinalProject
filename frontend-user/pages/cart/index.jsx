import React, { memo, useState, useEffect } from "react";
import {
  Minus,
  Plus,
  AlertCircle,
  CircleDollarSign,
  Trash2,
  Undo,
} from "lucide-react";
import axiosClient from "@/libraries/axiosClient";
import numeral from "numeral";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

function Carts() {
  const router = useRouter;
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      carts.forEach((item) => {
        item.products.forEach((product) => {
          total +=
            ((product.product.price * (100 - product.product.discount)) / 100) *
            product.quantity;
        });
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [carts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;
        console.log("««««« customerId »»»»»", customerId);

        const response = await axiosClient.get(
          `http://localhost:9000/carts/${customerId}`
        );
        const data = response.data;
        console.log("««««« data »»»»»", data);
        setCarts(data.payload.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [router]);

  return (
    <div>
      <img src="https://file.hstatic.net/1000381168/file/baner-thanh-toan_78c520df795d4667b36605c554655bb1_master.png" />
      <div className="container mt-10">
        <table className="w-full mb-10">
          <thead class="bg-black text-white font-roboto  space-x-4">
            <tr>
              <th class="border w-1/2 py-3">SẢN PHẨM</th>
              <th class="border w-1/12 py-3">SỐ LƯỢNG</th>
              <th class="border w-1/6 py-3">ĐƠN GIÁ</th>
              <th class="border w-1/6 py-3">THÀNH TIỀN</th>
              <th class="border w-1/12 py-3">
                <div className="flex justify-center items-center">
                  <AlertCircle />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-slate-400">
            {carts.length > 0 &&
              carts.map((item) =>
                item.products.length > 0 ? (
                  item.products.map((product) => (
                    <tr key={product._id}>
                      <td class="flex justify-center items-center">
                        <div class="mr-4 my-5">
                          <img
                            class="w-32 bg-pink"
                            src={product.product?.img}
                            alt="Product Image"
                          />
                        </div>
                        <div>
                          <p class="font-elle font-light">
                            {product.product?.name}
                          </p>
                          <p>
                            <strong>Size:</strong>{" "}
                            <span>{product.product?.size}</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <button type="button">
                            <Minus size={15} strokeWidth={1.5} />
                          </button>
                          <div className=" w-10 flex justify-center items-center">
                            {product.quantity}
                          </div>

                          <button type="button">
                            <Plus size={15} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          {product.product?.price}đ
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center font-bold">
                          {numeral(
                            ((product.product.price *
                              (100 - product.product.discount)) /
                              100) *
                              product.quantity
                          ).format("0,0")}
                          đ
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <button>
                            <Trash2 size={24} strokeWidth={1} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <Result
                    title="There are no products in your cart yet"
                    extra={
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#1677ff", color: "#fff" }}
                        key="console"
                      >
                        <Link href="/products">Return Shop!</Link>
                      </Button>
                    }
                  />
                )
              )}
          </tbody>
        </table>
        <div class="my-10 flex justify-end">
          <div class="my-3">
            <div class="flex justify-end">
              <div class="flex">
                <CircleDollarSign size={24} strokeWidth={1} />
                <p class="ml-2 font-roboto font-bold text-xl">
                  TỔNG TIỀN (tạm tính)
                </p>
              </div>
              <div class="ml-10">
                <span class="font-roboto font-bold text-lg">
                  {numeral(totalPrice).format("0,0")}đ
                </span>
              </div>
            </div>
            <div class="my-3 flex justify-end">
              <span class="font-roboto w-3/4">
                Thời gian nhận hàng từ 7 - 15 ngày (trường hợp sớm hơn chúng tôi
                sẽ thông báo trước cho Quý khách!)
              </span>
            </div>
            <div class="my-3 flex justify-end">
              <div class="mr-3">
                <button class="flex border py-3 px-6 bg-gray hover:bg-white text-white hover:text-black font-elle">
                  <Undo class="mr-3" size={24} strokeWidth={1} /> CHỌN THÊM SẢN
                  PHẨM KHÁC
                </button>
              </div>
              <div class="ml-3">
                <button class="flex border py-3 px-20 bg-black hover:bg-white text-white hover:text-black font-elle">
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Carts);
