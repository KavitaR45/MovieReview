import { Button } from 'antd';
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import SwiperCore, { Navigation, Pagination, Autoplay, Mousewheel, Lazy, Virtual, EffectFade, Scrollbar, Parallax } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel, Virtual, EffectFade, Scrollbar, Parallax, Lazy]);



export default function Slider({ children, config, navigation,pagination }) {
   

    var props = {
        spaceBetween: 0,
        Lazy: true,
        // autoplay: {
        //     delay: 4500,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        loop: false,
        // pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        pagination: {
            el: '.pagination', clickable: true,
            renderBullet: function (index, className) {
                return '<span  class="' + className + '">' + '</span>';
            },
        },

        ...config
    }

    return (
        <Swiper pagination={true}  {...props} style={{ position: "relative",width:"100%" }}  >
            {children.map((X) => {
                return (
                    <>
                        <SwiperSlide style={{width:"100%"}}>{X}</SwiperSlide>
                    </>)
            })}
            {pagination ?
                <div className="pagination" >
                </div> :
                null}

        </Swiper>
    );
};


