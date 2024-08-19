"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

import "./ImageCarousel.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { API_KEY } from "@/utils";

export default function ImageCarousel({ data }: any) {
  return (
    <section>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data?.length > 1 ? (
          data?.map((image: any) => {
            return (
              <SwiperSlide key={image?.Title}>
                <img
                  src={`${API_KEY}/get/static?path=ProjectMedia/${image?.image_url}`}
                  className="w-[300px] h-[300px] object-cover rounded-lg"
                />
              </SwiperSlide>
            );
          })
        ) : (
          <div>No media files</div>
        )}
      </Swiper>
    </section>
  );
}
