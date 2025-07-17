"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper as SwiperType } from "swiper/types";

const categories = [
  { name: "Clothes", img: "/cat1.jpg" },
  { name: "Electronics", img: "/cat2.jpg" },
  { name: "Shoes", img: "/cat3.jpg" },
  { name: "Watches", img: "/cat4.jpg" },
  { name: "Toys", img: "/cat5.jpg" },
  { name: "Furniture", img: "/cat6.jpg" },
];

export default function CategorySlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full py-4 relative">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>

      {/* Wrapper to hold arrows and slider in row */}
      <div className="relative flex items-center">
        {/* Left Button */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-150 absolute left-0 -translate-x-1/2 hidden md:block"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slider */}
        <Swiper
          modules={[FreeMode]}
          freeMode
          spaceBetween={16}
          slidesPerView="auto"
          className="w-full px-8" // padding to leave space for arrows
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i} className="!w-40">
              <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md hover:scale-105 duration-200 cursor-pointer">
                <Image src={cat.img} alt={cat.name} fill className="object-cover" />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-700">{cat.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Button */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-150 absolute right-0 translate-x-1/2 hidden md:block"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
