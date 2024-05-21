import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import HomePage from "@/pages/home";
import Link from "next/link";

function Header(props) {
  const { setIsLogin } = props;
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("payload");
    setIsLogin(false);
    setIsLoggedIn(false);
    message.success("Đăng xuất thành công!!!");
    router.push("/");
  };

  return (
    <div>
      <div className="flex items-center justify-between h-[100px]  shadow-md">
      <Link href="/" className="flex justify-end">
        <img
          src="/img/logo.png"
          alt="user"
          title="wiicamp-logo"
          className="md:w-[5rem] md:h-[4rem] w-[2.5rem] h-[2.5rem]"
        />
        <span className="items-center flex text-primry text-xl font-normal leading-7 font-roboto">
          JEWELLERY
        </span>
      </Link>
        {isLoggedIn && (
          <Button
            type="button"
            className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black font-thin mr-8"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        )}
      </div>
      {isLoggedIn && <HomePage />}
    </div>
  );
}

export default Header;
