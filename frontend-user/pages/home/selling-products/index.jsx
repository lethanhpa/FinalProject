import React, { memo } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronsRight, ShoppingCart } from "lucide-react";
import numeral from "numeral";
import { API_URL } from "@/constants";
import { Button, Divider } from "antd";
import router from "next/router";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";

function SellingProduct({ products }) {

  const handleAddCart = () => {
    console.log("Add to cart");
  };
  return (
    <div className="pt-[2.5rem]">
      <div className="flex justify-between">
        <span className="font-roboto font-medium text-primry text-2xl test" >
          SẢN PHẨM BÁN CHẠY
        </span>
        <Link
          href="/selling"
          className="flex font-roboto text-primry underline"
        >
          Xem thêm <ChevronsRight />
        </Link>
      </div>

      <div className="flex pb-[4.3125rem] border-b border-primry pt-[1.25rem]">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={"coverflow"}
          grabCursor={true}
          spaceBetween={70}
          className="swiper_banner "
          style={{ background: "white" }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          // pagination={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          speed={3000}
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: true,
              // initialSlide: 3,
            },
            320: {
              slidesPerView: 1,
              centeredSlides: true,
              // initialSlide: 3,
            },
            360: {
              slidesPerView: 2,
              centeredSlides: true,
              // initialSlide: 3,
            },
            900: {
              slidesPerView: 2,
              centeredSlides: true,
              // initialSlide: 3,
            },
            1200: {
              slidesPerView: 3,
              centeredSlides: true,
              // initialSlide: 3,
            },
          }}
        >
          {products &&
            products.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[50px] min-h-[50px] shadow-md rounded hover:bg-second-3 flex flex-col justify-center items-center border-pink"
                  style={{
                    background:
                      "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                  }}
                  >
                    <div className="group relative inline-flex justify-center overflow-hidden items-center">
                      <Link
                        href={`/${item.id}`}
                      >
                        <img src={`${API_URL}/${item.imageUrl}`} alt={`slide-${item.id}`} className="hover:-translate-y-1 hover:scale-105  duration-300 text-clip sm:w-full sm:block flex items-center w-[7.5rem] object-contain" />

                      </Link>
                      <div className="!absolute h-10  text-text-1 flex mb-[10px] items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ">
                        <button
                          type="button"
                          className="bg-primry text-white py-2 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
                          onClick={handleAddCart}
                        >
                          <ShoppingCart />
                          Thêm vào giỏ hàng
                        </button>
                      </div>

                    </div>
                    {item.discount > 0 && (<span className="!absolute top-0 right-0 bg-primry font-poppins text-md font-normal py-[5px] sm:px-[50px] px-[10px] text-white">
                      -{item.discount}%
                    </span>)}
                    <div className="flex flex-col gap-[6px]">
                      <h3 className="font-roboto text-md font-normal flex justify-center xxl:truncate text-center">{item.productName}</h3>
                      <span className="font-roboto text-md font-normal flex justify-center">{item.code}</span>
                      <div className="flex justify-around">
                        {item.discount ? (
                          <>
                            <span className="font-roboto text-md flex justify-center text-primry font-semibold">{numeral(item.price - (item.price * item.discount * 1) / 100).format("0,0")}đ</span>
                            <span className="font-roboto text-md flex justify-center text-gray line-through">
                              {numeral(item.price).format("0,0")}đ
                            </span>
                          </>
                        ) : (
                          <p className="font-roboto text-md flex justify-center text-primry font-semibold">
                            {numeral(item.price).format("0,0")}đ
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center gap-2">
                        <p>Đã bán : </p>
                        <p>{item.stockQuantity} cái</p>
                      </div>
                      <Divider>
                      <Button
                        // type="primary"
                        className="bg-slate-800 text-white hover:bg-white hover:text-black"
                        onClick={() => {
                          router.push(`/${item.id}`);
                        }}
                      >
                        Chi tiết
                      </Button>
                    </Divider>
                      {/* <div className="flex justify-between px-[0.5rem]">
                                                <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                                                    <p>{item.rating.rate}</p>
                                                    <p>({item.rating.count})</p>
                                                </div>
                                                <p className="font-roboto text-sm opacity-50 font-normal">{item.sell} <span>đã bán</span></p>
                                            </div> */}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default memo(SellingProduct);
