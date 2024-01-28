import React, { memo } from "react";
import { Form, Input, Button, Radio, DatePicker, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const SignUp = () => {
  const onFinish = (values) => {
    // Xử lý logic đăng ký ở đây
    console.log(values);
  };

  return (
    <div className="py-9 flex items-center justify-center">
      <Form
        onFinish={onFinish}
        className="p-4 sm:p-8 shadow-2xl w-full sm:w-6/12"
      >
        <h2 className="mt-2 font-bold text-3xl text-center">
          Đăng ký tài khoản
        </h2>
        <h4 className="mt-1 text-gray text-center">
          Nhập thông tin để tạo tài khoản mới
        </h4>

        <Form.Item
          name="firstName"
          className="pt-2 mx-12"
          rules={[{ required: true, message: "Vui lòng nhập Tên" }]}
        >
          <Input
            prefix={<UserOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Tên"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          className="mx-12"
          rules={[{ required: true, message: "Vui lòng nhập Họ" }]}
        >
          <Input
            prefix={<UserOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Họ"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="email"
          className="mx-12"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          className="mx-12"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          className="mx-12"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu xác nhận không khớp");
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Nhập lại mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          className="mx-12"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input
            prefix={<PhoneOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Số điện thoại"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          className="mx-12 border border-gray rounded-lg h-10 flex items-center"
        >
          <Space>
            <TeamOutlined className="ml-3 mr-3 text-lg text-primry" />
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
              <Radio value="lgbt">Khác</Radio>
            </Radio.Group>
          </Space>
        </Form.Item>

        <Form.Item
          name="birthday"
          className="mx-12"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker
            placeholder="Ngày sinh"
            size="large"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item name="submit" className="mx-12">
          <Button
            type="primry"
            htmlType="submit"
            className="w-full bg-primry text-white p-2 h-12"
          >
            Đăng ký
          </Button>
        </Form.Item>

        <div className="flex mx-6">
          <h4 className="ml-auto">Bạn đã có tài khoản?</h4>
          <Link className="text-primry ml-2" href="/sign-in">
            Đăng nhập
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default memo(SignUp);
