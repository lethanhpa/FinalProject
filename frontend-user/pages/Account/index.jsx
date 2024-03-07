import React, { memo, useState, useEffect } from "react";
import axios from "../../libraries/axiosClient";
import Moment from "moment";
import { useRouter } from "next/router";
import { Input, Form, Button, Modal, message, Table, Space, Spin } from "antd";
import { jwtDecode } from "jwt-decode";

const apiName = "/customers";

function Account() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const customerId = decoded._id;

        const response = await axios.get(`/customers/${customerId}`);
        const data = response.data;

        setCustomers(data);
        console.log("««««« data »»»»»", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    }
  }, [router]);

  return (
    <>
      {isLogin ? (
        <div className="container">
          {customers && (
            <div className="text-gray-800 py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex">
                <div className=" space-y-6">
                  <div className="">
                    <img
                      src="https://scontent.fdad4-1.fna.fbcdn.net/v/t39.30808-6/415028565_3664751977177475_3727908222255302408_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeHXWYySZuN2mURY3ROBSltDRE7gxU6Y6NBETuDFTpjo0FRQlIR2QFyjGmG5l3uGIOZY6G50FG3w_45eLqB51wha&_nc_ohc=q3LZzAG18V8AX9Zk1qA&_nc_ht=scontent.fdad4-1.fna&oh=00_AfAa1ckprBc8CzeVCoghJO-D-1DbXUzePjkXQjnGeYN_AA&oe=65EB93A0"
                      alt="Avatar"
                      className="w-1/2 h-auto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Tên</label>
                    <p className="mt-1 text-lg">
                      {customers.lastName} {customers.firstName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Giới tính
                    </label>
                    <p className="mt-1 text-lg">{customers.gender}</p>
                  </div>
                </div>

                <div className="space-y-6">                  
                  <div>
                    <label className="block text-sm font-medium">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-lg">{customers.phoneNumber}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <p className="mt-1 text-lg">{customers.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Ngày sinh
                    </label>
                    <p className="mt-1 text-lg">
                      {Moment(customers.birthday).format("DD/MM/YYYY")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Địa chỉ</label>
                    <p className="mt-1 text-lg">{customers.address}</p>
                  </div>
                </div>
                </div>
                <div className="mt-8 text-center">
                  <button className="bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300">
                    Chỉnh sửa thông tin cá nhân
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>no data</div>
      )}
    </>
  );
}

export default memo(Account);
