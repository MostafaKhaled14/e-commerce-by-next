"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const sliderImages = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"];

export default function Slider() {
  return (
    <section className="w-full flex flex-col md:flex-row gap-4 py-10">
      {/* Slider: full width on small screens, 3/4 on large screens */}
      <div className="w-full md:w-3/4 h-[250px] md:h-[400px] rounded-lg overflow-hidden shadow-md">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={10}
          slidesPerView={1}
          className="w-full h-full"
        >
          {sliderImages.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Static Images: hidden on small screens */}
      <div className="hidden md:flex flex-col w-1/4 gap-4">
        <div className="relative w-full h-[195px] rounded-lg overflow-hidden shadow-md">
          <Image src="/static1.jpg" alt="Static 1" fill className="object-cover" />
        </div>
        <div className="relative w-full h-[195px] rounded-lg overflow-hidden shadow-md">
          <Image src="/static2.jpg" alt="Static 2" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
