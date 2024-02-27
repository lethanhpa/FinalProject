import React, { memo, useRef } from "react";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronsRight, ShoppingCart } from 'lucide-react';
import numeral from "numeral";
import { API_URL } from "@/constants";
import { Button, Divider } from "antd";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";

function NewProduct({ products }) {

    const swiperRef = useRef();

    const handleAddCart = () => {
        console.log("Add to cart");
    }
    const [autoplayConfig, setAutoplayConfig] = React.useState({
        delay: 3000,
        disableOnInteraction: false,
        reverseDirection: true,
    });
    return (
        <div className="pt-[2.5rem]">
            <div className="flex justify-between">
                <span className="font-roboto font-medium text-primry text-2xl test">SẢN PHẨM MỚI</span>
                <Link href="/products-new" className="flex font-roboto text-primry underline">Xem thêm <ChevronsRight /></Link>
            </div>

            <div className="flex pb-[4.3125rem] border-b border-primry pt-[1.25rem]">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    effect={"coverflow"}
                    spaceBetween={30}
                    navigation
                    slidesPerView="auto"
                    style={{ background: "white" }}
                    ref={swiperRef}
                    speed={3000}
                    autoplay={autoplayConfig}
                    loop={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        360: {
                            slidesPerView: 1.5,
                            spaceBetween: 30,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        600: {
                            slidesPerView: 2.5,
                            spaceBetween: 30,
                        },
                        800: {
                            slidesPerView: 3.5,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        1440: {
                            slidesPerView: 4,
                            centeredSlides: true,
                        },
                    }}
                >
                    {products &&
                        products.map((item) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <div className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex flex-col justify-center items-center"
                                        style={{
                                            background:
                                                "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                                        }}
                                    >
                                        <div className="group relative inline-flex justify-center overflow-hidden items-center">
                                            <Link
                                                href={`/${item.id}`}
                                            >
                                                <img src={`${API_URL}/${item.imageUrl}`} alt={`slide-${item.id}`} className="hover:-translate-y-1 hover:scale-105  duration-300 sm:w-full sm:block flex items-center w-[7.5rem] object-contain" />

                                            </Link>
                                            <div className="!absolute h-10  text-text-1 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ">
                                                <button
                                                    type="button"
                                                    className="bg-primry text-white py-1.5 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
                                                    onClick={handleAddCart}
                                                >
                                                    <ShoppingCart />
                                                    Thêm vào giỏ hàng
                                                </button>
                                            </div>
                                        </div>
                                        {item.discount > 0 && (<span className="!absolute top-0 left-0 bg-primry font-poppins text-sm font-normal py-[4px] sm:px-[25px] px-[10px] text-white">
                                            -{item.discount}%
                                        </span>)}
                                        <div className="flex flex-col gap-[6px]">
                                            <p className="font-roboto text-sm font-normal flex justify-center xxl:truncate text-center">{item.productName}</p>
                                            <span className="font-roboto text-sm font-normal flex justify-center">{item.code}</span>
                                            <div className="flex justify-around">
                                                {item.discount ? (
                                                    <>
                                                        <span className="font-roboto text-sm flex justify-center text-primry font-semibold">{numeral(item.price - (item.price * item.discount * 1) / 100).format("0,0")}đ</span>
                                                        <span className="font-roboto text-sm flex justify-center text-gray line-through">
                                                            {numeral(item.price).format("0,0")}đ
                                                        </span>
                                                    </>
                                                ) : (
                                                    <p className="font-roboto text-sm flex justify-center text-primry font-semibold">
                                                        {numeral(item.price).format("0,0")}đ
                                                    </p>
                                                )}
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

export default memo(NewProduct);
