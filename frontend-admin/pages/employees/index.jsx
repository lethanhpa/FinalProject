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
} from "antd";
import {
  ArrowBigLeftDash,
  FilePenLine,
  LockIcon,
  UnlockIcon,
  UserRoundPlus,
} from "lucide-react";
import axiosClient from "@/libraries/axiosClient";
import Moment from "moment";
import HomePage from "../home";
const { Column } = Table;

const apiName = "/employees";

function ManageEmployees() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [showTable, setShowTable] = useState(true);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
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

  const lockEmployees = (employeesId) => {
    axiosClient
      .post(apiName + `/${employeesId}/lock`)
      .then(() => {
        setRefresh((f) => f + 1);
        message.success("Khóa thành công!", 1.5);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const unlockEmployees = (employeesId) => {
    axiosClient
      .post(apiName + `/${employeesId}/unlock`)
      .then(() => {
        setRefresh((f) => f + 1);
        message.success("Mở khóa thành công!", 1.5);
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
          <h1 className="text-center text-2xl pb-3">Thêm nhân viên</h1>
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
              label="Họ"
              name="firstName"
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
              label="Tên"
              name="lastName"
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
              label="Ngày sinh"
              name="birthday"
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
              label="Giới tính"
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                {
                  min: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
                  message:
                    "Mật khẩu phải chứa ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số và một ký tự đặc biệt",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
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
              label="Địa chỉ"
              name="address"
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
              label="Chức vụ"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Hãy điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
            >
              <Select className="text-start">
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Nhân viên">Nhân viên</Select.Option>
              </Select>
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
        <div>
          <HomePage/>
          <h1 className="text-2xl text-center mt-3">Danh Sách Nhân Viên</h1>
          <div className="flex justify-end pr-2">
            <button
              className="flex items-center py-1 px-1 mb-2 rounded-md border-2 border-black hover:bg-black hover:text-white"
              onClick={() => {
                setShowTable(false);
              }}
            >
              <UserRoundPlus size={25} strokeWidth={1} />
              <span>Thêm nhân viên</span>
            </button>
          </div>
          <Table dataSource={data} rowKey="_id" scroll={{ x: true }}>
            <Column title="Họ" dataIndex="firstName" key="firstName" />
            <Column title="Tên" dataIndex="lastName" key="lastName" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column
              title="Số điện thoại"
              dataIndex="phoneNumber"
              key="phoneNumber"
            />
            <Column title="Địa chỉ" dataIndex="address" key="address" />
            <Column
              title="Ngày sinh"
              dataIndex="birthday"
              key="birthday"
              render={(text) => {
                return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
              }}
            />
            <Column title="Giới tính" dataIndex="gender" key="gender" />
            <Column title="Chức vụ" dataIndex="role" key="role" />
            <Column
              title="Trạng thái"
              dataIndex="isLocked"
              key="isLocked"
              render={(isLocked) => (
                <span>
                  {isLocked ? (
                    <div className="flex items-center text-red font-extrabold">
                      KHÓA
                    </div>
                  ) : (
                    <div className="flex items-center text-green font-extrabold">
                      MỞ
                    </div>
                  )}
                </span>
              )}
            />
            <Column
              title="Hành động"
              key="action"
              render={(record) => (
                <Space size="middle">
                  {!record.isLocked && (
                    <button
                      className="w-full flex justify-between items-center text-black py-1 px-1 rounded-md border-2 border-black hover:bg-gray hover:text-black"
                      onClick={() => lockEmployees(record._id)}
                    >
                      <LockIcon className="mr-2" size={20} strokeWidth={1} />
                      Khóa
                    </button>
                  )}
                  {record.isLocked && (
                    <button
                      className="w-full flex justify-between items-center text-black py-1 px-1 rounded-md border-2 border-black hover:bg-gray hover:text-black"
                      onClick={() => unlockEmployees(record._id)}
                    >
                      <UnlockIcon className="mr-2" size={20} strokeWidth={1} />
                      Mở
                    </button>
                  )}
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
      )}
    </div>
  );
}

export default memo(ManageEmployees);
