import { Button } from "antd";
import React from "react";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const HandleLogout = () => {
    console.log("logout");
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-between h-[125px]  shadow-md">
      <div className="flex">
        <img
          src="/img/5.png"
          alt="user"
          title="jewellery-logo"
          className="w-3/4 ml-16"
        />
      </div>

      <Button
        type="button"
        className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black font-thin mr-8"
        onClick={HandleLogout}
      >
        Đăng xuất
      </Button>
    </div>
  );
}

export default Header;
