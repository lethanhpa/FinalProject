import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  Home,
  Users,
  User,
  Boxes,
  PackageOpen,
  MessageSquareQuote,
  BookOpen,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SigIn from "../sign-in";
import { jwtDecode } from "jwt-decode";

const itemAdmin = [
  {
    label: "Trang Chủ",
    key: "home",
    icon: <Home size={20} strokeWidth={1} />,
    path: "/",
  },
  {
    label: "Quản Lý Nhân Viên",
    key: "manageEmployees",
    icon: <User size={20} strokeWidth={1} />,
    path: "employees",
  },
  {
    label: "Quản Lý Khách Hàng",
    key: "manageCustomers",
    icon: <Users size={20} strokeWidth={1} />,
    path: "customers",
  },
  {
    label: "Quản Lý Số Lượng",
    key: "manageStock",
    icon: <Boxes size={20} strokeWidth={1} />,
    path: "stocks",
  },
  {
    label: "Quản Lý Sản Phẩm",
    key: "manageProducts",
    icon: <PackageOpen size={20} strokeWidth={1} />,
    path: "products",
  },
  {
    label: "Quản Lý Đánh Giá",
    key: "manageReviews",
    icon: <MessageSquareQuote size={20} strokeWidth={1} />,
    path: "reviews",
  },
  {
    label: "Quản Lý Danh Mục",
    key: "manageCategories",
    icon: <BookOpen size={20} strokeWidth={1} />,
    path: "categories",
  },
  {
    label: "Quản Lý Đơn Hàng",
    key: "manageOrders",
    icon: <ShoppingCart size={20} strokeWidth={1} />,
    path: "orders",
  },
];

const itemEmployee = [
  {
    label: "Quản Lý Khách Hàng",
    key: "manageCustomers",
    icon: <Users size={20} strokeWidth={1} />,
    path: "customers",
  },
  {
    label: "Quản Lý Số Lượng",
    key: "manageStock",
    icon: <Boxes size={20} strokeWidth={1} />,
    path: "stocks",
  },
  {
    label: "Quản Lý Sản Phẩm",
    key: "manageProducts",
    icon: <PackageOpen size={20} strokeWidth={1} />,
    path: "products",
  },
  {
    label: "Quản Lý Đánh Giá",
    key: "manageReviews",
    icon: <MessageSquareQuote size={20} strokeWidth={1} />,
    path: "reviews",
  },
  {
    label: "Quản Lý Danh Mục",
    key: "manageCategories",
    icon: <BookOpen size={20} strokeWidth={1} />,
    path: "categories",
  },
  {
    label: "Quản Lý Đơn Hàng",
    key: "manageOrders",
    icon: <ShoppingCart size={20} strokeWidth={1} />,
    path: "orders",
  },
];

function HomePage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        setIsLogin(true);
        setRole(decoded.role)
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      if (router.pathname !== "/") {
        router.push("/");
      }
    }
  }, [router.pathname]);

  return (
    <>
      {isLogin ? (
        <>
          <Menu
            mode="horizontal"
            className="w-auto flex justify-center"
            style={{ boxShadow: "0 5px 10px rgba(0,0,0,0.1)" }}
          >
            {role === "Admin"
              ? itemAdmin.map((item) => (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link href={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))
              : itemEmployee.map((item) => (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link href={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
          </Menu>
        </>
      ) : (
        <SigIn setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default HomePage;
