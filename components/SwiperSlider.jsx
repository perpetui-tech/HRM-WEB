'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SwiperSlider({ urls }) {
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true }}
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
