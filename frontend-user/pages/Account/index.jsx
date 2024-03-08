import React, { memo, useState, useEffect } from "react";
import axios from "../../libraries/axiosClient";
import Moment from "moment";
import { useRouter } from "next/router";
import {
  Input,
  Form,
  Button,
  message,
  Select,
  Space,
  Modal,
  Radio,
  DatePicker,
  Upload
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

const apiName = "/customers";

function Account() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [open, setOpen] = useState(false);
  const [updateForm] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [wards, setWards] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchProvinces();
    fetchDistricts();
    fetchWards();
    fetchCustomers();
  }, []);

  const fetchProvinces = () => {
    fetch("https://vapi.vnappmob.com/api/province/")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.results);
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

  const onFinishUpdate = (values) => {
    const { provinceId, districtId, wardId, address } = values;

    const provinceName = provinces.find(
      (province) => province.province_id === provinceId
    )?.province_name;
    const districtName = districts.find(
      (district) => district.district_id === districtId
    )?.district_name;
    const wardName = wards.find((ward) => ward.ward_id === wardId)?.ward_name;

    if (provinceName && districtName && wardName) {
      const fullAddress = `${address}, ${wardName}, ${districtName}, ${provinceName}  `;

      const dataToSend = { ...values, address: fullAddress };

      axios
        .patch(apiName + "/" + updateId, dataToSend)
        .then((_response) => {
          setRefresh((f) => f + 1);
          updateForm.resetFields();
          setOpen(false);
          message.success("Cập nhật thành công!");
        })
        .catch((err) => {
          console.error(err);
          message.error("Cập nhật thất bại");
        });
    } else {
      message.error("Cập nhật thất bại.");
    }
    [refresh];
  };

  

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    }
  }, [router]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Gửi yêu cầu POST để tải lên ảnh lên máy chủ
      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Ở đây, bạn có thể lấy URL của ảnh từ response.data và lưu vào cơ sở dữ liệu
      const imageUrl = response.data.imageUrl;

      // Sau khi lưu vào cơ sở dữ liệu, bạn có thể thực hiện các hành động khác, ví dụ hiển thị ảnh đã tải lên
      console.log("Đã tải lên ảnh thành công:", imageUrl);
    } catch (error) {
      console.error("Lỗi khi tải lên ảnh:", error);
    }
  };

  return (
    <>
      {isLogin ? (
        <div>
          {customers && (
            <>
              <div className="text-gray-800 py-10 px-4 sm:px-6 lg:px-8 font-roboto">
                <div className="max-w-4xl mx-auto border border-gray p-6">
                  <div className="flex mt-8">
                    <div className="w-1/3 ml-8 mr-14 space-y-6">
                    <div>
      <h2>Tải lên ảnh</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Tải lên</button>
    </div>
                      <img
                        src="https://scontent.fdad4-1.fna.fbcdn.net/v/t39.30808-1/425451190_1867342267049631_4750115328709052757_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH16DOgmil9XJbKZ29oDY59DvDCT7tlJAMO8MJPu2UkAyHHPs6J_-_bD_ybzHNI2dc1RuFBK1POkETtmlu4U3pi&_nc_ohc=tfabMYX11moAX9gcmiK&_nc_ht=scontent.fdad4-1.fna&oh=00_AfBLMuDqzU78bF1RaGjWY6rRCrvACPeWFKJAib2uOkJ88w&oe=65EE6807"
                        alt="Avatar"
                        className="w-[300px] object-cover h-[300px]"
                      />
                    </div>

                    <div className="space-y-6 w-1/2">
                      <div>
                        <label className="block text-lg text-slate-500">
                          Tên
                        </label>
                        <p className="mt-1 text-lg border-b border-gray w-[400px]">
                          {customers.lastName} {customers.firstName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-lg text-slate-500">
                          Giới tính
                        </label>
                        <p className="mt-1 text-lg border-b border-gray w-[400px]">
                          {customers.gender}
                        </p>
                      </div>
                      <div>
                        <label className="block text-lg text-slate-500">
                          Số điện thoại
                        </label>
                        <p className="mt-1 text-lg border-b border-gray w-[400px]">
                          {customers.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <label className="block text-lg text-slate-500">
                          Email
                        </label>
                        <p className="mt-1 text-lg border-b border-gray w-[400px]">
                          {customers.email}
                        </p>
                      </div>
                      <div>
                        <label className="block text-lg text-slate-500">
                          Ngày sinh
                        </label>
                        <p className="mt-1 text-lg border-b border-gray w-[400px]">
                          {Moment(customers.birthday).format("DD/MM/YYYY")}
                        </p>
                      </div>

                      <div>
                        <label className="block text-lg text-slate-500">
                          Địa chỉ
                        </label>
                        <p className="mt-1 text-lg border-b border-gray w-[400px]">
                          {customers.address}
                        </p>
                      </div>

                      <div className="">
                        <button
                          onClick={() => {
                            setOpen(true);
                            setUpdateId(customers._id);
                          }}
                          className="mt-8 mb-8 bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray hover:text-black transition-colors duration-300 w-[400px]"
                        >
                          Chỉnh sửa thông tin cá nhân
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Modal
                title="Cập nhật thông tin cá nhân"
                open={open}
                onCancel={() => {
                  setOpen(false);
                }}
                cancelText="Đóng"
                okText="Cập nhật"
                onOk={() => {
                  updateForm.submit();
                }}
                className=""
              >
                <Form
                  form={updateForm}
                  name="update-form"
                  onFinish={onFinishUpdate}
                  className=""
                >
                  <Form.Item
                    name="firstName"
                    className="pt-2 mx-12"
                    rules={[{ required: true, message: "Vui lòng nhập Tên" }]}
                  >
                    <Input
                      prefix={
                        <UserOutlined className="mr-2 text-lg text-primry" />
                      }
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
                      prefix={
                        <UserOutlined className="mr-2 text-lg text-primry" />
                      }
                      placeholder="Họ"
                      size="large"
                    />
                  </Form.Item>

                  <div className="mx-12 block">
                    <Form.Item
                      name="provinceId"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn Tỉnh/Thành phố",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn Tỉnh/Thành phố"
                        onChange={handleProvinceChange}
                        size="large"
                        options={
                          provinces.length > 0 &&
                          provinces.map((province) => {
                            return {
                              value: province.province_id,
                              label: province.province_name,
                            };
                          })
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      name="districtId"
                      rules={[
                        { required: true, message: "Vui lòng chọn Quận/Huyện" },
                      ]}
                    >
                      <Select
                        placeholder="Chọn Quận/Huyện"
                        onChange={handleDistrictChange}
                        size="large"
                        options={
                          districts.length > 0 &&
                          districts.map((district) => {
                            return {
                              value: district.district_id,
                              label: district.district_name,
                            };
                          })
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      name="wardId"
                      rules={[
                        { required: true, message: "Vui lòng chọn Phường/Xã" },
                      ]}
                    >
                      <Select
                        placeholder="Chọn Phường/Xã"
                        size="large"
                        options={
                          wards.length > 0 &&
                          wards.map((ward) => {
                            return {
                              value: ward.ward_id,
                              label: ward.ward_name,
                            };
                          })
                        }
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    className="mx-12"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ cụ thể",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <EnvironmentOutlined className="mr-2 text-lg text-primry" />
                      }
                      size="large"
                      placeholder="Nhập địa chỉ cụ thể"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    className="mx-12"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <PhoneOutlined className="mr-2 text-lg text-primry" />
                      }
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
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                        <Radio value="LGBT">LGBT</Radio>
                      </Radio.Group>
                    </Space>
                  </Form.Item>

                  <Form.Item
                    name="birthday"
                    className="mx-12"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày sinh" },
                    ]}
                  >
                    <DatePicker
                      placeholder="Ngày sinh"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </>
          )}
        </div>
      ) : (
        <div>no data</div>
      )}
    </>
  );
}

export default memo(Account);
