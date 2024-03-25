import React from "react";
import { Menu } from "antd";
import {
  Users,
  User,
  PackageOpen,
  BookOpen,
  ShoppingCart,
  Boxes,
  MessageSquareQuote,
  AreaChart,
} from "lucide-react";
import Link from "next/link";

function HomePage() {
  const items = [
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
      path: "customers ",
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
      path: "orders ",
    },
    {
      label: "Thống Kê",
      key: "manageStatistical",
      icon: <AreaChart size={20} strokeWidth={1} />,
      path: "statistical ",
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        className="w-auto flex justify-center"
        style={{
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
        }}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

export default HomePage;
