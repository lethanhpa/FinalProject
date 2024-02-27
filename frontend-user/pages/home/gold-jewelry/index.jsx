// import React, { memo, useRef } from "react";
// import {
//     Star, ShoppingCart
// } from "lucide-react";
// import Link from "next/link";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useRouter } from "next/router";
// import numeral from "numeral";

// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// import "swiper/css";

// function GoldJewelry() {
//     const router = useRouter();

//     const handleLink = () => {
//         router.push("/product-gold");
//     }

//     const listCategory = [
//         {
//             id: "1",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             discount: 10,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "2",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://vangbac24h.vn/wp-content/uploads/2020/10/kim-c%C6%B0%C6%A1ng.png",
//             code: "PNDIHFA000",
//             price: 6151000,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "3",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/35/gndrwa73675.5a0-nhan-kim-cuong-pnj-vang-trang.png",
//             code: "PNDIHFA000",
//             price: 6151000,
//             discount: 10,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "4",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             discount: 10,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "5",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "6",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "7",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "8",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             discount: 10,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//         {
//             id: "9",
//             productName: "Nhẫn kim cương vàng trắng 14k",
//             image1: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
//             code: "PNDIHFA000",
//             price: 6151000,
//             sell: "10",
//             rating:
//                 { rate: <Star />, count: "2" },
//         },
//     ];

//     const swiperRef = useRef();

//     const handleAddCart = () => {
//         console.log("Add to cart");
//     }
//     return (
//         <div className="border-b border-primry">
//             <div className="mt-[3.125rem] flex justify-center w-full">
//                 <img src="./img/banner-vang.PNG" alt="trang-suc-vang" className="xl:w-[1200px]" />
//             </div>            
//             <p className="font-roboto font-medium text-primry text-2xl mt-[50px] flex justify-center">TRANG SỨC VÀNG</p>
//             <div className="flex pb-[2.5rem]  pt-[1.25rem]">
//                 <Swiper
//                     modules={[Autoplay, Navigation]}
//                     spaceBetween={30}
//                     navigation
//                     slidesPerView="auto"
//                     autoplay={{
//                         delay: 800,
//                     }}
//                     ref={swiperRef}
//                     breakpoints={{
//                         320: {
//                             slidesPerView: 1,
//                             spaceBetween: 30,
//                         },
//                         360: {
//                             slidesPerView: 1.5,
//                             spaceBetween: 30,
//                         },
//                         480: {
//                             slidesPerView: 2,
//                             spaceBetween: 30,
//                         },
//                         600: {
//                             slidesPerView: 2.5,
//                             spaceBetween: 30,
//                         },
//                         800: {
//                             slidesPerView: 3.5,
//                             spaceBetween: 30,
//                         },
//                         1280: {
//                             slidesPerView: 4,
//                             spaceBetween: 30,
//                         },
//                         1440: {
//                             slidesPerView: 5,
//                             spaceBetween: 30,
//                         },
//                     }}
//                 >
//                     {listCategory &&
//                         listCategory.map((item) => {
//                             return (
//                                 <SwiperSlide key={item.id}>
//                                     <div className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex flex-col justify-center items-center">
//                                         <div className="group relative inline-flex justify-center overflow-hidden items-center">
//                                             <Link
//                                                 href={`/${item.id}`}
//                                             >
//                                                 <img src={item.image1} alt={`slide-${item.id}`} className="sm:w-full sm:block flex items-center w-[7.5rem] object-contain" />

//                                             </Link>
//                                             <div className="!absolute h-10  text-text-1 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all ">
//                                                 <button
//                                                     type="button"
//                                                     className="bg-primry text-white py-1.5 min-w-[270px] font-roboto text-sm flex justify-center gap-[4px] items-center"
//                                                     onClick={handleAddCart}
//                                                 >
//                                                     <ShoppingCart />
//                                                     Thêm vào giỏ hàng
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         {item.discount && (<span className="!absolute top-0 left-0 bg-primry font-poppins text-sm font-normal py-[4px] sm:px-[25px] px-[10px] text-white">
//                                                 -{item.discount}%
//                                             </span>)}
//                                         <div className="flex flex-col gap-[6px]">
//                                             <p className="font-roboto text-sm font-normal flex justify-center truncate">{item.productName}</p>
//                                             <span className="font-roboto text-sm font-normal flex justify-center">{item.code}</span>
//                                             <div className="flex justify-around">
//                                                 {item.discount ? (
//                                                     <>
//                                                         <span className="font-roboto text-sm flex justify-center text-primry font-semibold">{numeral(item.price - (item.price * item.discount * 1) / 100).format("0,0")}đ</span>
//                                                         <span className="font-roboto text-sm flex justify-center text-gray line-through">
//                                                             {numeral(item.price).format("0,0")}đ
//                                                         </span>
//                                                     </>
//                                                 ) : (
//                                                     <p className="font-roboto text-sm flex justify-center text-primry font-semibold">
//                                                         {numeral(item.price).format("0,0")}đ
//                                                     </p>
//                                                 )}
//                                             </div>

//                                             <div className="flex justify-between px-[0.5rem]">
//                                                 <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
//                                                     <p>{item.rating.rate}</p>
//                                                     <p>({item.rating.count})</p>
//                                                 </div>
//                                                 <p className="font-roboto text-sm opacity-50 font-normal">{item.sell} <span>đã bán</span></p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </SwiperSlide>
//                             );
//                         })}
//                 </Swiper>
//             </div>
//             <div className="flex justify-center items-center text-center pb-[3.125rem] ">
//                 <button type="button" onClick={handleLink} className="rounded-md px-4 py-1 font-roboto border border-primry text-primry hover:text-white hover:bg-primry">
//                     Xem thêm
//                 </button>
//             </div>
//         </div>)
// }

// export default memo(GoldJewelry);

import React, { memo, useRef } from "react";
import {
    Star, ShoppingCart
} from "lucide-react";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import numeral from "numeral";
import { API_URL } from "@/constants";
import { Button, Divider } from "antd";


import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";

function GoldJewelry({products}) {
    const router = useRouter();

    const handleLink = () => {
        router.push("/product-diamond");
    };

    const [autoplayConfig, setAutoplayConfig] = React.useState({
        delay: 3000,
        disableOnInteraction: false,
        reverseDirection: true,
    });

    const swiperRef = useRef();

    const handleAddCart = () => {
        console.log("Add to cart");
    }
    return (
        <div className="border-b border-primry">
            <div className="mt-[3.125rem] flex justify-center w-full">
                <img src="./img/banner-vang.PNG" alt="trang-suc-vang" />
            </div>
            <p className="font-roboto font-medium text-primry text-2xl mt-[50px] flex justify-center">TRANG SỨC VÀNG</p>
            <div className="flex pb-[2.5rem] pt-[1.25rem]">
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
            <div className="flex justify-center items-center text-center pb-[3.125rem] ">
                <button type="button" onClick={handleLink} className="rounded-md px-4 py-1 font-roboto border border-primry text-primry hover:text-white hover:bg-primry">
                    Xem thêm
                </button>
            </div>
        </div>)
}

export default memo(GoldJewelry);
