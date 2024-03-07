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
              <div className="max-w-4xl mx-auto border border-gray p-6">
              <div className="mb-12">
                    <img
                      src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEapVeY6ZN8p1KqTMpK1wVyso2H55p0AlGyjYfnmnQCUc9WDYxsYPNxRa5Malv8fDsIEqS8M8VG-CCje6Gel7_1&_nc_ohc=g3hIEEKhSb4AX97x2u0&_nc_ht=scontent-hkg4-1.xx&oh=00_AfD6aJ1AVX0BE_B6rBoSc2ZU2elj4alGYpoxw8n3XFxUhQ&oe=6610B9B8"
                      alt="Avatar"
                      className="w-[150px] h-auto rounded-full"
                    />
                  </div>
                <div className="flex item-center justify-center">
                <div className="space-y-6 w-1/2">
                  <div>
                    <label className="block text-sm font-robot">Tên</label>
                    <p className="mt-1 text-lg">
                      {customers.lastName} {customers.firstName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-roboto">
                      Giới tính
                    </label>
                    <p className="mt-1 text-lg">{customers.gender}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-roboto">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-lg">{customers.phoneNumber}</p>
                  </div>
                </div>

                <div className="space-y-6 w-1/2">
                  <div>
                    <label className="block text-sm font-roboto">Email</label>
                    <p className="mt-1 text-lg">{customers.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-roboto">
                      Ngày sinh
                    </label>
                    <p className="mt-1 text-lg">
                      {Moment(customers.birthday).format("DD/MM/YYYY")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-roboto">Địa chỉ</label>
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
