import { Button } from 'antd';
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import SwiperCore, { Navigation, Pagination, Autoplay, Mousewheel, Lazy, Virtual, EffectFade, Scrollbar, Parallax } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel, Virtual, EffectFade, Scrollbar, Parallax, Lazy]);



export default function Slider({ children, config, name,pagination }) {
   

    var props = {
        spaceBetween: 0,
        Lazy: true,
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        loop: false,
        pagination: {
            el: '.pagination', clickable: true,
            renderBullet: function (index, className) {
                return '<span  class="' + className + '">' + '</span>';
            },
        },

        ...config
    }
    const BlueArrow = {
        display: "flex",
        cursor: "pointer",
        background: "white",
        height: "30px",
        alignItems: "center",
        borderRadius: "50%",
        width: "30px",
        justifyContent: "center"
    }
    const postMiddle = {
        position: "absolute",
        bottom: "50%",
        // left: [null, "5%", "-13%", null, "-8%"],
        // width: [null, "90%", "110%", "124%", "106%"],
        width:"90%",
        cursor: "pointer",
        color: "white",
        display: "flex",
        outline: "none !important",
        justifyContent: "space-between",
    }
    
    
    return (
        <Swiper pagination={true}  {...props} style={{ position: "relative",width:"100%" }}  >
            {children.map((X,i) => {
                return (
                    <>
                        <SwiperSlide key={name + i} style={{width:"100%"}}>{X}</SwiperSlide>
                    </>)
            })}
            {/* {pagination ?
                 <div  style={{ ...postMiddle, zIndex: "500" }}>
                 <div id="prev-btn" className="prev-btn" style={{ ...BlueArrow }}>
                     <div style={{ width: "100%", outline: "none", cursor: "pointer" }} >
                         <BiChevronLeft style={{ height:"30px",width:"30px" }} />
                     </div>
                 </div>
                 <div id="next-btn" className="next-btn" style={{ ...BlueArrow }}>
                     <div style={{ width: "100%", outline: "none", cursor: "pointer" }}>
                         <BiChevronRight style={{ height:"30px",width:"30px" }} />
                     </div>
                 </div>
             </div >

                 :
                null} */}

        </Swiper>
    );
};


