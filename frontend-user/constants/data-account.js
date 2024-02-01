import { User, ShoppingBag,XCircle, Star ,LogOut } from "lucide-react";
const listAccount = [
    {
      id: "1",
      icon: <User size={24} />,
      name: "Manage My Account",
      link: "./Account",
    },
    {
      id: "2",
      icon: <ShoppingBag size={24} />,
      name: "My Order",
      link: "./purchase-history",
    },
    {
      id: "3",
      icon: <XCircle size={24} />,
      name: "My Cancellations",
      link: "./",
    },
    {
      id: "4",
      icon: <Star size={24} />,
      name: "My Reviews",
      link: "./",
    },
    {
      id: "5",
      icon: <LogOut size={24} />,
      name: "Logout",
      link: "./",
    },
  ];

export {listAccount};