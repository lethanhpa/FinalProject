import React, { memo, useState, useEffect } from "react";
import {
  Minus,
  Plus,
  AlertCircle,
  CircleDollarSign,
  Trash2,
  Undo,
} from "lucide-react";
import {Result, Button} from "antd";
import Link from "next/link";
import axiosClient from "@/libraries/axiosClient";
import numeral from "numeral";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

function Carts() {
  const router = useRouter();
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;

      if (carts && Array.isArray(carts)) {
        carts.forEach((item) => {
          if (item.products && Array.isArray(item.products)) {
            item.products.forEach((product) => {
              total +=
            ((product.product.price * (100 - product.product.discount)) / 100) *
            product.quantity;
            });
          }
        });
      }
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [carts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const customerId = decoded._id;
        console.log("««««« customerId »»»»»", customerId);

        const response = await axiosClient.get(
          `http://localhost:9000/carts/${customerId}`
        );
        const data = response.data;
        setCarts(data.payload.results);
        console.log("««««« data »»»»»", data.payload.results);
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
          <thead className="bg-black text-white font-roboto  space-x-4">
            <tr>
              <th className="border w-1/2 py-3">SẢN PHẨM</th>
              <th className="border w-1/12 py-3">SỐ LƯỢNG</th>
              <th className="border w-1/6 py-3">ĐƠN GIÁ</th>
              <th className="border w-1/6 py-3">THÀNH TIỀN</th>
              <th className="border w-1/12 py-3">
                <div className="flex justify-center items-center">
                  <AlertCircle />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-slate-400">
            {carts && carts.length > 0 &&
              carts.map((item) =>
              item.cartDetails && item.cartDetails.length > 0 ? (
                  item.cartDetails.map((product) => (
                    <tr key={product._id}>
                      <td className="flex justify-center items-center">
                        <div className="mr-4 my-5">
                          <img
                            className="w-[200px] h-auto bg-pink"
                            src={product.product?.imageUrl}
                            alt="Product Image"
                          />
                        </div>
                        <div>
                          <p className="font-elle font-light">
                            {product.product?.name}
                          </p>
                          <p>
                            <strong>Size:</strong>
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
                  key="no-products"
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
        <div className="my-10 flex justify-end">
          <div className="my-3">
            <div className="flex justify-end">
              <div className="flex">
                <CircleDollarSign size={24} strokeWidth={1} />
                <p className="ml-2 font-roboto font-bold text-xl">
                  TỔNG TIỀN (tạm tính)
                </p>
              </div>
              <div className="ml-10">
                <span className="font-roboto font-bold text-lg">
                  {numeral(totalPrice).format("0,0")}đ
                </span>
              </div>
            </div>
            <div className="my-3 flex justify-end">
              <span className="font-roboto w-3/4">
                Thời gian nhận hàng từ 7 - 15 ngày (trường hợp sớm hơn chúng tôi
                sẽ thông báo trước cho Quý khách!)
              </span>
            </div>
            <div className="my-3 flex justify-end">
              <div className="mr-3">
                <button className="flex border py-3 px-6 bg-gray hover:bg-white text-white hover:text-black font-elle">
                  <Undo className="mr-3" size={24} strokeWidth={1} /> CHỌN THÊM SẢN
                  PHẨM KHÁC
                </button>
              </div>
              <div className="ml-3">
                <button className="flex border py-3 px-20 bg-black hover:bg-white text-white hover:text-black font-elle">
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
