import React, { memo, useState } from "react";
import { Form, Input, Button, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const customers = [
    {
      email: "user@gmail.com",
      password: "User123456",
    },
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const customer = customers.find(
      (c) => c.email === email && c.password === password
    );
    if (customer) {
      message.success("Đăng nhập thành công!!!");
      router.push("/");
    } else {
      message.error("Đăng nhập thất bại");
      console.log("Invalid email or password");
    }
  };

  return (
    <div className="py-9 flex items-center justify-center">
      <Form className="p-4 sm:p-8 shadow-2xl w-full sm:w-7/12 ">
        <h2 className="mt-2 font-bold text-3xl text-center">
          Chào mừng trở lại
        </h2>
        <h4 className="mt-1 text-gray text-center">
          Nhập thông tin đăng nhập để có thể truy cập tài khoản
        </h4>

        <Form.Item
          name="email"
          className="mx-12 pt-2"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ email!",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="h-12"
            prefix={<MailOutlined className="mr-2 text-lg text-primry " />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          className="mx-12"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password
            className="h-12"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            prefix={<LockOutlined className="mr-2 text-lg text-primry" />}
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="text-center mx-12">
          <Button
            type="primry"
            htmlType="submit"
            onClick={handleSubmit}
            className="w-full bg-primry text-white p-2 h-12 "
          >
            Đăng nhập
          </Button>
        </Form.Item>

        <div className="flex mx-6 text-sm">
          <Link href="/forgot-password" className="login-form-forgot">
            Quên mật khẩu?
          </Link>
          <h4 className="ml-auto">Bạn chưa có tài khoản?</h4>
          <Link className="text-primry ml-2" href="/sign-up">
            Đăng ký
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default memo(SignIn);
