import React, { memo, useState, useEffect } from "react";
import {
  Table,
  message,
  Form,
  Modal,
  Input,
  Select,
  Space,
  Button,
  Popconfirm,
} from "antd";
import {
  ArrowBigLeftDash,
  FilePenLine,
  PackagePlus,
  Trash2,
} from "lucide-react";
import { API_URL } from "@/constants";
import axiosClient from "@/libraries/axiosClient";
import numeral from "numeral";
import HomePage from "../home";
const { Column } = Table;

const apiName = "/products";

function ManageProducts() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [showTable, setShowTable] = useState(true);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchProductName, setSearchProductName] = useState("");

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
      .get("/categories")
      .then((response) => {
        const { data } = response;
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  useEffect(() => {
    axiosClient
      .get("/sizes")
      .then((response) => {
        const { data } = response;
        setSizes(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const onFinish = (values) => {
    axiosClient
      .post(apiName, values)
      .then((_response) => {
        setRefresh((f) => f + 1);
        createForm.resetFields();
        message.success("Thêm nhân viên mới thành công", 1.5);
        setShowTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  const getSizeBySizeId = (productId) => {
    const product = data.find((item) => item._id === productId);
    if (product && product.sizeId) {
      const sizeObject = sizes.find((size) => size._id === product.sizeId);
      if (sizeObject && sizeObject.sizes.length > 0) {
        return sizeObject.sizes.map((item) => item.size).join(", ");
      }
    }
    return "";
  };

  const text = "Bạn có muốn xóa sản phẩm?";

  return (
    <div>
      {showTable === false ? (
        <>
          <div style={{ textAlign: "left" }}>
            <button
              className="mt-3 ml-3"
              onClick={() => {
                setShowTable(true);
              }}
            >
              <ArrowBigLeftDash size={25} strokeWidth={1} />
            </button>
          </div>
          <h1 className="text-center text-2xl pb-3">Thêm sản phẩm</h1>
          {/* CREATE FORM */}
          <Form
            className="w-4/5"
            form={createForm}
            name="create-form"
            onFinish={onFinish}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mã"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá gốc"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giảm giá (%)"
              name="discount"
              rules={[{ required: true, message: "Hãy điền đầy đủ thông tin" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Kích cỡ"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
            >
              <Select className="text-start">
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
                <Select.Option value="LGBT">LGBT</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Danh mục"
              name="categoryId"
              hasFeedback
              required={true}
              rules={[
                {
                  required: true,
                  message: "Required to choose",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                options={categories.map((c) => {
                  return { value: c._id, label: c.name };
                })}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" className="bg-black text-white">
                Thêm Mới
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <div>
            <HomePage />
            <h1 className="text-2xl text-center mt-3">Danh Sách Sản Phẩm</h1>
            <div className="flex justify-between px-2 pb-3">
              <Input.Search
                placeholder="____________________"
                className="w-auto bg-black rounded-lg h-3/4"
                allowClear
                enterButton
                value={searchProductName}
                onChange={(e) => setSearchProductName(e.target.value)}
                onSearch={(value) => {
                  setFilteredInfo({ productName: [value] });
                }}
              />
              <button
                className="flex items-center py-1 px-1 mb-2 rounded-md border-2 border-black hover:bg-black hover:text-white"
                onClick={() => {
                  setShowTable(false);
                }}
              >
                <PackagePlus size={25} strokeWidth={1} />
                <span>Thêm sản phẩm</span>
              </button>
            </div>

            <Table dataSource={data} rowKey="_id" scroll={{ x: true }}>
              <Column
                title="Tên sản phẩm"
                dataIndex="productName"
                key="productName"
                filteredValue={filteredInfo.productName || null}
                onFilter={(value, record) =>
                  record.productName.toLowerCase().includes(value.toLowerCase())
                }
              />
              <Column title="Mã" dataIndex="code" key="code" />
              <Column
                title="Giá gốc"
                sorter={(a, b) => a.price - b.price}
                dataIndex="price"
                key="price"
                render={(text) => {
                  return <span>{numeral(text).format("0,0")}đ</span>;
                }}
              />
              <Column
                title="Giảm giá (%)"
                sorter={(a, b) => a.discount - b.discount}
                dataIndex="discount"
                key="discount"
              />
              <Column
                title="Kích cỡ"
                dataIndex="_id"
                key="sizes"
                render={(sizeId) => <span>{getSizeBySizeId(sizeId)}</span>}
              />

              <Column
                title="Danh mục"
                dataIndex="category.name"
                key="category.name"
                render={(_text, record) => {
                  return <span>{record.category.name}</span>;
                }}
              />
              <Column
                title="Ảnh"
                dataIndex="imageUrl"
                key="imageUrl"
                render={(imageUrl, record) => (
                  <img
                    src={`${API_URL}/${imageUrl}`}
                    alt={`Avatar-${record._id}`}
                    style={{ width: "auto", height: 100 }}
                  />
                )}
              />
              <Column
                title="Hành động"
                key="action"
                render={(record) => (
                  <Space size="middle">
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
                        axiosClient
                          .delete(apiName + "/" + record._id)
                          .then(() => {
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
              onCancel={() => setOpen(false)}
              okText="Cập nhật"
              okButtonProps={{
                style: {
                  color: "white",
                  background: "black",
                },
              }}
              onOk={() => updateForm.submit()}
              title="Chỉnh sửa thông tin nhân viên"
              className="text-center"
            >
              <p style={{ textAlign: "center", color: "#888" }}>
                Lưu ý: Chỉ có thể chỉnh sửa các thông tin trong khung
              </p>
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
                <Form.Item label="Họ" name="firstName">
                  <Input className="pointer-events-none" bordered={false} />
                </Form.Item>
                <Form.Item label="Tên" name="lastName">
                  <Input className="pointer-events-none" bordered={false} />
                </Form.Item>
                <Form.Item label="Ngày sinh" name="birthday">
                  <Input className="pointer-events-none" bordered={false} />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                  <Select className="text-start">
                    <Select.Option value="Nam">Nam</Select.Option>
                    <Select.Option value="Nữ">Nữ</Select.Option>
                    <Select.Option value="LGBT">LGBT</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input className="pointer-events-none" bordered={false} />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input className="pointer-events-none" bordered={false} />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                  <Input />
                </Form.Item>
                <Form.Item label="Chức vụ" name="role">
                  <Select className="text-start">
                    <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="Nhân viên">Nhân viên</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(ManageProducts);
