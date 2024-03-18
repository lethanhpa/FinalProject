import React, { memo, useState, useEffect } from "react";
import { Table, Space, Rate } from "antd";
import { LockIcon, UnlockIcon } from "lucide-react";
import axiosClient from "@/libraries/axiosClient";
import { API_URL } from "@/constants";
import Moment from "moment";
import HomePage from "../home";
const { Column } = Table;

const apiName = "/reviews";

function ManageReview() {
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axiosClient
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  useEffect(() => {
    axiosClient
      .get("/customers")
      .then((response) => {
        const { data } = response;
        setCustomers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  useEffect(() => {
    axiosClient
      .get("/products")
      .then((response) => {
        const { data } = response;
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <div>
      <HomePage />
      <h1 className="text-2xl text-center my-3">Danh Sách Đánh Giá</h1>
      <Table dataSource={data} rowKey="_id" scroll={{ x: true }}>
        <Column
          title="Khách hàng"
          dataIndex="customer"
          key="customer"
          render={(_text, record) => {
            return (
              <div className="flex items-center justify-between">
                <span className="font-semibold ">{`${record.customer.firstName} ${record.customer.lastName}`}</span>

                <img
                  src={`${API_URL}/${record.customer.avatarUrl}`}
                  alt={`Ảnh-${record.customer._id}`}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            );
          }}
        />
        <Column
          title="Tên"
          dataIndex="productName"
          key="productName"
          render={(_text, record) => {
            return <span>{record.product.productName}</span>;
          }}
        />
        <Column
          title="Hình ảnh"
          dataIndex="product.imageUrl"
          key="product.imageUrl"
          render={(_text, record) => (
            <img
              src={`${API_URL}/${record.product.imageUrl}`}
              alt={`Ảnh-${record.product._id}`}
              style={{ width: 100, height: 100 }}
            />
          )}
        />
        <Column
          title="Đánh giá"
          dataIndex="ratingRate"
          key="ratingRate"
          render={(ratingRate) => (
            <Rate
              className="flex"
              allowHalf
              disabled
              defaultValue={ratingRate}
            />
          )}
        />
        <Column title="Bình luận" dataIndex="comment" key="comment" />
        <Column
          title="Ngày đánh giá"
          dataIndex="reviewDate"
          key="reviewDate"
          className="w-32"
          render={(text) => {
            return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
          }}
        />
        <Column
          title="Hành động"
          key="action"
          render={(record) => (
            <Space size="middle">
              {!record.status && (
                <button
                  className="w-full flex justify-between items-center text-black py-1 px-1 rounded-md border-2 border-black hover:bg-gray hover:text-black"
                  onClick={() => lockCustomers(record._id)}
                >
                  <LockIcon className="mr-2" size={20} strokeWidth={1} />
                  Khóa
                </button>
              )}
              {record.status && (
                <button
                  className="w-full flex justify-between items-center text-black py-1 px-1 rounded-md border-2 border-black hover:bg-gray hover:text-black"
                  onClick={() => unlockCustomers(record._id)}
                >
                  <UnlockIcon className="mr-2" size={20} strokeWidth={1} />
                  Mở
                </button>
              )}
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default memo(ManageReview);
