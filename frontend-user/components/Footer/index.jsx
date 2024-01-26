import React, { memo } from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-gray shadow-md">
      <div className="ssm:grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 ssm:grid-cols-1 md:grid-cols-3 flex container justify-around flex-col md:flex-row  ">
        <div className="xl:grid-cols-5 cols-span-12    ">
          <div className="flex flex-col gap-[0.25rem]  pl-14 pt-5  " >
          <Link href="/">
            <img
              className="max-w-[6rem] max-h-[6rem] pl-5"
              src="/img/logo.png"
              alt="logo"
            />
          </Link>
          <p className="text-primry font-roboto text-xl font-normal leading-7 pr-10">
            Sunlit Diamond
          </p>
          </div>
            <p className=" w-[240px] font-roboto text-sm font-normal leading-7 ">
            © 2017 Công Ty Cổ Phần Trang Sức Hải Châu Giấy chứng nhận đăng ký
            doanh nghiệp do Sở Kế hoạch & Đầu tư Đà Nẵng cấp lần đầu ngày
            01/01/2010. Ngành, nghề kinh doanh.
          </p>
        </div>
        <div>
          <h5 className=" uppercase tracking-wide font-roboto mt-10 font-bold text-primry ">
            VỀ DSC
          </h5>
          <ul className="list-none mt-6 space-y-2 ">
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                K29 Hồ Xuân Hương,Bắc Mỹ An,
                <p> Ngũ Hành Sơn,Đà Nẵng</p>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className=" hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Xuất khẩu
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Kiểm định kim cương
              </Link>
            </li>
          </ul>
        </div>
        <div className="   ">
          <h5 className=" uppercase tracking-wide font-roboto mt-10 font-bold text-primry ">
            TỔNG ĐÀI HỖ TRỢ
          </h5>
          <ul className="list-none mt-6 space-y-2 ">
            <li className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7">
              (08-21:00,miễn phí gọi)
            </li>
            <li>
              <span>Gọi mua:</span>
              <Link
                href="tel:+19001006"
                className="text-blue-500 hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                {" "}
                19001006{" "}
              </Link>
              <span> (phím 1)</span>
            </li>
            <li>
              <span>Khiếu nại:</span>
              <Link
                href="tel:+19001006"
                className="text-blue-500 hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                {" "}
                19001006{" "}
              </Link>
              <span> (phím 2)</span>
            </li>
          </ul>
        </div>
        <div className="   ">
          <h5 className=" uppercase tracking-wide font-roboto mt-10 font-bold text-primry">
            Mua Hàng
          </h5>
          <ul className="list-none mt-6 space-y-2 ">
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Thương hiệu
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Hướng dẫn đo size
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-all duration-500 ease-in-out font-roboto text-sm font-normal leading-7"
              >
                Đánh giá sản phẩm
              </Link>
            </li>
          </ul>
        </div>
        <div className="   ">
          <h5 className=" uppercase tracking-wide font-roboto mt-10 font-bold text-primry">
            Kết nối với chúng tôi
          </h5>
          {/* <div className="flex gap-6 pb-5 mt-8">
            <Link href="/">
              <FaFacebook className="text-2xl cursor-pointer hover:text-primry" />
            </Link>
            <Link href="/">
              <FaInstagram className="text-2xl cursor-pointer hover:text-primry" />
            </Link>
            <Link href="/">
              <FaTwitter className="text-2xl cursor-pointer hover:text-primry" />
            </Link>
            <Link href="/">
              <FaGoogle className="text-2xl cursor-pointer hover:text-primry" />
            </Link>
          </div> */}

          <h5 className="uppercase tracking-wide font-roboto  font-bold ">
            Quan tâm Zalo OA PNJ
          </h5>

          <Link href="/">
            <img
              className="max-w-[5rem] max-h-[5rem]"
              src="/img/zalo.png"
              alt="zalo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default memo(Footer);
