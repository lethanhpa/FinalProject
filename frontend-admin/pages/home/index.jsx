import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {
    UserOutlined,
    FileDoneOutlined,
    DropboxOutlined,
    FileTextOutlined,
    IdcardOutlined,
} from "@ant-design/icons";

function HomePage() {

    const items = [
        {
            label: "Home",
            key: "home",
            icon: <UserOutlined />,
        },
        {
            label: "Manager Employees",
            key: "manageEmployees",
            icon: <UserOutlined />,
        },
        {
            label: "Manager Customers",
            key: "manageCustomers",
            icon: <UserOutlined />,
        },
        {
            label: "Manager Products",
            key: "manageProducts",
            icon: <DropboxOutlined />,
        },
        {
            label: "Manager Categories",
            key: "manageCategories",
            icon: <FileTextOutlined />,
        },
        {
            label: "Manager Supplier",
            key: "manageSuppliers",
            icon: <IdcardOutlined />,
        },
        {
            label: "Manager Order",
            icon: <FileDoneOutlined />,
            key: "manageOrders",
        },
    ];

    return (<>
        <Menu
            mode="inline"
            className="pt-[50"
            // openKeys={openKeys}
            // onOpenChange={onOpenChange}
            style={{
                width: 256,
            }}
            items={items}
        />
    </>)
}

export default HomePage;