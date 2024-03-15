import React, { memo, useState, useEffect } from "react";
import {
  Table,
  message,
  Form,
  Modal,
  Select,
  Space,
  Button,
  Popconfirm,
} from "antd";
import { API_URL } from "@/constants";
import numeral from "numeral";
import { EyeIcon, FilePenLine, Trash2 } from "lucide-react";
import axiosClient from "@/libraries/axiosClient";
import HomePage from "../home";

const { Column } = Table;

const apiName = "/orders";

function ManageOrder() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [updateForm] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
      .get("/employees")
      .then((response) => {
        const { data } = response;
        setEmployees(data);
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

  const onUpdateFinish = (values) => {
    axiosClient
      .patch(apiName + "/" + updateId, values)
      .then((_response) => {
        setRefresh((f) => f + 1);
        updateForm.resetFields();
        message.success("Cập nhật thành công", 1.5);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchProductInfo = async (productId) => {
    try {
      const response = await axios.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm từ API /products ", error);
      throw error;
    }
  };

  const text = "Xác nhận xóa ?";

  return (
    <div>
      <h1 className="text-2xl text-center my-3">Danh Sách Đơn Hàng</h1>
      <Table
        dataSource={data}
        rowKey="_id"
        scroll={{ x: true }}
        className="w-full"
      >
        <Column
          title="Khách hàng"
          key="customerName"
          render={(_text, record) => {
            return (
              <span>{`${record.customer.firstName} ${record.customer.lastName}`}</span>
            );
          }}
        />

        <Column title="Email" dataIndex="emailOrder" key="emailOrder" />
        <Column
          title="Số điện thoại"
          dataIndex="phoneNumberOrder"
          key="phoneNumberOrder"
        />
        <Column title="Phương thức" dataIndex="paymentType" key="paymentType" />
        <Column title="Trạng thái" dataIndex="status" key="status" />
        <Column
          title="Nhân viên"
          dataIndex="employeesName"
          key="employees.name"
          render={(_text, record) => {
            return (
              <span>{`${record.employee.firstName} ${record.employee.lastName}`}</span>
            );
          }}
        />
        <Column title="Ghi chú" dataIndex="description" key="description" />
        <Column
          title="Hành động"
          key="action"
          render={(record) => (
            <Space>
              <button
                className="w-full flex justify-between items-center text-black py-1 px-1 rounded-md border-2 border-black hover:bg-gray hover:text-black"
                onClick={() => {
                  setOpenOrderDetail(true);
                  setSelectedOrderId(record);
                }}
              >
                <EyeIcon className="mr-2" size={20} strokeWidth={1} />
                Xem
              </button>
              <button
                className="w-full flex justify-between items-center text-blue py-1 px-1 rounded-md border-2 border-blue hover:bg-gray hover:text-black"
                onClick={() => {
                  setOpen(true);
                  setUpdateId(record._id);
                  updateForm.setFieldsValue(record);
                }}
              >
                <FilePenLine className="mr-2" size={20} strokeWidth={1} />
                Sửa
              </button>

              <Popconfirm
                placement="top"
                title={text}
                onConfirm={() => {
                  axiosClient.delete(apiName + "/" + record._id).then(() => {
                    setRefresh((f) => f + 1);
                    message.success("Xóa thành công", 1.5);
                  });
                }}
                okText="Có"
                okButtonProps={{ className: "bg-black text-white" }}
                cancelText="Không"
              >
                <button className="w-full flex justify-between items-center text-red py-1 px-1 rounded-md border-2 border-red hover:bg-gray hover:text-black">
                  <Trash2 className="mr-2" size={20} strokeWidth={1} />
                  Xóa
                </button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Modal
        open={open}
        title="Update"
        onCancel={() => {
          setOpen(false);
        }}
        cancelText="Đóng"
        okText="Đồng ý"
        okButtonProps={{ className: "bg-black text-white" }}
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="update-form"
          onFinish={onUpdateFinish}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="Employees" name="employeeId">
            <Select
              style={{ width: "80%" }}
              options={employees.map((c) => {
                return {
                  value: c._id,
                  label: c.lastName + " " + c.firstName,
                };
              })}
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select style={{ width: "80%" }}>
              <Select.Option value="WAITING">WAITING</Select.Option>
              <Select.Option value="COMPLETED">COMPLETED</Select.Option>
              <Select.Option value="CANCELED">CANCELED</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={1000}
        orderDetails={selectedOrderId}
        open={openOrderDetail}
        title="Chi tiết đơn hàng"
        onCancel={() => {
          setOpenOrderDetail(false);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setOpenOrderDetail(false);
            }}
          >
            Close
          </Button>,
        ]}
      >
        <Table dataSource={selectedOrderId?.orderDetails} rowKey="_id">
          <Table.Column
            title="Tên sản phẩm"
            dataIndex="productName"
            key="productName"
            render={(_text, record) => {
              return <span>{record.productName}</span>;
            }}
          />
          <Table.Column
            title="Ảnh"
            dataIndex="imageUrl"
            key="imageUrl"
            render={(_text, record) => (
              <img
                src={`${API_URL}${record.imageUrl}`}
                alt={`Avatar-${record._id}`}
                style={{ width: "auto", height: 100 }}
              />
            )}
          />
          <Table.Column
            title="Quantity"
            dataIndex="quantity"
            key="quantity"
            render={(_text, record) => {
              return <span>{record.quantity}</span>;
            }}
          />
          <Table.Column
            title="Price"
            dataIndex="price"
            key="price"
            render={(_text, record) => {
              return <span>{numeral(record.price).format("0,0")}đ</span>;
            }}
          />
          <Table.Column
            title="Discount"
            dataIndex="discount"
            key="discount"
            render={(_text, record) => {
              return <span>{record.discount}%</span>;
            }}
          />
          <Table.Column
            title="Total"
            key="total"
            render={(_text, record) => {
              const total =
                record.quantity * record.price * (1 - record.discount / 100);
              return <span>{numeral(total).format("0,0")}đ</span>;
            }}
          />
        </Table>
      </Modal>
    </div>
  );
}

export default memo(ManageOrder);
