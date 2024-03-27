import React, { memo, useEffect, useState } from "react";
import numeral from "numeral";
import { BackTop } from "antd";
import axiosClient from "@/libraries/axiosClient";
import { API_URL } from "@/constants";
import Moment from "moment";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

function PurchaseHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const customerId = decoded._id;

      const response = await axiosClient.get(`/orders/${customerId}`);
      const data = response.data.results;

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderAction = (status, orderDetails) => {
    if (status === "COMPLETE") {
      return (
        <button
          className="bg-primry text-white font-bold w-[150px] h-[40px] rounded-full hover:bg-white hover:text-primry hover:border-primry hover:border mr-5"
          onClick={() => handleComment(orderDetails)}
        >
          Đánh giá
        </button>
      );
    } else if (status === "WAITING") {
      return (
        <button
          className="mr-5 bg-primry text-white font-bold w-[150px] h-[40px] rounded-full hover:bg-white hover:text-primry hover:border-primry hover:border"
          onClick={handleCancelOrder}
        >
          Hủy đơn hàng
        </button>
      );
    }
    return null;
  };

  const handleComment = (orderDetails) => {
    const productId = orderDetails.productId;
    router.push(`/${productId}`);
  };

  const handleCancelOrder = () => {
    console.log("cancel order");
  };

  return (
    <div className="py-14  md:px-6 xl:px-20 xl:container ">
      <div className="flex justify-start item-start flex-col ">
        <h1 className="text-xl leading-[28px] font-bold text-center font-roboto text-primry">
          LỊCH SỬ MUA HÀNG
        </h1>
      </div>
      <div className="flex flex-col mt-[20px]">
        {orders.map((order) => (
          <div key={order._id}>
            {order.orderDetails.map((detail, index) => (
              <div key={index} className="flex shadow-xl">
                <div className="max-w-[250px]">
                  <img
                    src={`${API_URL}${detail.imageUrl}`}
                    alt={`Image-${detail._id}`}
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-[80px]">
                  <div className="w-full flex flex-col justify-center items-center md:items-start gap-[16px] ">
                    <h3 className="font-bold font-roboto ">
                      {detail.productName}
                    </h3>
                    <div className="flex justify-start items-start flex-col gap-[8px] max-w-[500px]">
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
                  <div className="flex xl:gap-[180px] lg:gap-[100px]">
                    <p className="text-lg flex justify-center items-center font-roboto font-medium">
                      {order.status}
                    </p>
                    <p className="text-lg flex justify-center items-center font-roboto ">
                      {Moment(`${order.createdDate}`).format("DD/MM/YYYY")}
                    </p>
                    {getOrderAction(order.status, detail)}
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
