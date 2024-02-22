import React, { memo, useRef } from "react";
import {
    Star
} from "lucide-react";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";

function GoldJewelry() {
    const router = useRouter();

    const handleLink = () => {
        router.push("/");
    }

    const listCategory = [
        {
            id: "1",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "2",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://vangbac24h.vn/wp-content/uploads/2020/10/kim-c%C6%B0%C6%A1ng.png",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "3",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/35/gndrwa73675.5a0-nhan-kim-cuong-pnj-vang-trang.png",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "4",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "5",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "6",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "7",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "8",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
        {
            id: "9",
            name: "Nhẫn kim cương vàng trắng 14k",
            src: "https://cdn.pnj.io/images/detailed/34/GNDRWA46447.516_pbvw-qz_zsca-i1_6ln9-m1_ifm4-cu_t03d-8v_cnyp-ia_14li-65_o5jd-ok_yfu1-w1_r75b-oc_o56i-mx_i6ak-qs_z8c6-81_odnf-fp_enp5-u7_j33d-cb.jpg",
            code: "PNDIHFA000",
            price: "6.151.000",
            sell: "10",
            rating:
                { rate: <Star />, count: "2" },
        },
    ];

    const swiperRef = useRef();
    return (
        <div className="border-b border-primry">
            <div className="mt-[3.125rem] flex justify-center w-full">
                <img src="./img/banner-vang.PNG" alt="trang-suc-vang" className="xl:w-[1200px]" />
            </div>
            <p className="font-roboto font-medium text-primry text-xl mt-[50px] flex justify-center">TRANG SỨC VÀNG</p>
            <div className="flex pb-[2.5rem] pt-[1.25rem]">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={30}
                    navigation
                    slidesPerView="auto"
                    autoplay={{
                        delay: 800,
                    }}
                    ref={swiperRef}
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
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {listCategory &&
                        listCategory.map((item) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <Link
                                        href="./id"
                                        className="sm:min-w-[15.625rem] sm:min-h-[12.5rem] min-w-[100px] min-h-[100px] shadow-md rounded hover:bg-second-3 flex justify-center items-center "
                                    >
                                        <div className="flex flex-col gap-[6px]">
                                            <img src={item.src} alt={`slide-${item.id}`} className="sm:w-full sm:block flex items-center w-[120px] object-cover" />
                                            <p className="font-roboto text-sm font-normal flex justify-center truncate">{item.name}</p>
                                            <span className="font-roboto text-sm font-normal flex justify-center">{item.code}</span>
                                            <span className="font-roboto text-sm flex justify-center text-primry font-semibold">{item.price}đ</span>
                                            <div className="flex justify-between px-[0.5rem]">
                                                <div className="font-roboto text-sm opacity-50 font-normal flex gap-[4px]">
                                                    <p>{item.rating.rate}</p>
                                                    <p>({item.rating.count})</p>
                                                </div>
                                                <p className="font-roboto text-sm opacity-50 font-normal">{item.sell} <span>đã bán</span></p>
                                            </div>
                                        </div>
                                    </Link>
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