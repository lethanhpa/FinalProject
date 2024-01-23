import React, {memo} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; 

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css";

function Slide(){
    const listSlider = [
        {
            id: "1",
            src: "./img/anh-slide-1.jpg",
        },
        {
            id: "2",
            src: "./img/anh-slide-2.jpg",
        },
        {
            id: "3",
            src: "./img/anh-slide-1.jpg",
        },
        {
            id: "4",
            src: "./img/anh-slide-4.jpg",
        },
    ];
    return(<div className="pt-[20px]"> <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 2000 }}
        pagination={{
            clickable: true,
        }}
        className="swiper_banner "
    >
        {listSlider.map((item) => {
            return (
                <SwiperSlide key={item.id}>
                    <img src={item.src} alt={`slide-${item.id}`} className="w-full sm:h-[30rem] h-[12.5rem] object-cover" />
                </SwiperSlide>
            );
        })}
    </Swiper></div>)
}
export default memo(Slide);