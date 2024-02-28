import React, { memo, useState, useEffect } from "react";
import { Form, Input, Button, Radio, DatePicker, Space, Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const SignUp = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    fetchProvinces();
    fetchDistricts();
    fetchWards();
  }, []);

  const fetchProvinces = () => {
    fetch("https://vapi.vnappmob.com/api/province/")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.results);
        console.log("««««« data »»»»»", data.results);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  const fetchDistricts = (provinceId) => {
    fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((response) => response.json())
      .then((data) => {
        setDistricts(data.results);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  const fetchWards = (districtId) => {
    fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then((response) => response.json())
      .then((data) => {
        setWards(data.results);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  const handleProvinceChange = (value) => {
    fetchDistricts(value);
    setWards([]);
  };

  const handleDistrictChange = (value) => {
    fetchWards(value);
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

        <div className="mx-12 xl:space-x-3 lg:block xl:flex">
          <Form.Item
            name="province"
            className="xl:w-[221px] lg:w-full"
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <Select
              placeholder="Chọn Tỉnh/Thành phố"
              onChange={handleProvinceChange}
              size="large"
            >
              {provinces.length > 0 &&
                provinces.map((province) => (
                  <Option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province_name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            className="xl:w-[221px] lg:w-full"
            rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
          >
            <Select
              placeholder="Chọn Quận/Huyện"
              onChange={handleDistrictChange}
              size="large"
            >
              {districts.length > 0 &&
                districts.map((district) => (
                  <Option
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district_name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="ward"
            className="xl:w-[221px] lg:w-full"
            rules={[{ required: true, message: "Vui lòng chọn Phường/Xã" }]}
          >
            <Select placeholder="Chọn Phường/Xã" size="large">
              {wards.length > 0 &&
                wards.map((ward) => (
                  <Option key={ward.ward_id} value={ward.ward_id}>
                    {ward.ward_name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          className="mx-12"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
        >
          <Input size="large" placeholder="Nhập địa chỉ cụ thể" />
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
          className="mx-12 border border-gray rounded-lg h-auto py-1 flex items-center"
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
      </Form>
    </div>
  );
};

export default memo(SignUp);
