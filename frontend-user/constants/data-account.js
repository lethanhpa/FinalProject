import { User, ShoppingBag, FileLock } from "lucide-react";
const listAccount = [
  {
    id: "1",
    icon: <User size={24} />,
    name: "Thông tin cá nhân",
    link: "/Account",
  },
  {
    id: "2",
    icon: <ShoppingBag size={24} />,
    name: "Lịch sử mua hàng",
    link: "/purchase-history",
  },
  {
    id: "3",
    icon: <FileLock size={24} />,
    name: "Đổi mật khẩu",
    link: "/change-password",
  },
];

export { listAccount };