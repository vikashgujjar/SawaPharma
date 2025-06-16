"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { baseLink, storageLink } from "../config/Apilink";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${baseLink}/banner`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <section className="relative">
      <div className="relative h-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="innerbanner"
          style={{ height: "400px" }}
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full">
                  <Skeleton
                    className="w-full h-full"
                    style={{ height: "400px" }}
                  />
                </div>
              </SwiperSlide>
            ))
            : banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-full"
                  style={{
                    backgroundImage: `url(${storageLink}/${banner.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                  }}
                >
                  {/* <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    style={{
                      mixBlendMode: "multiply",
                    }}
                  ></div> */}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Text and Button Section (not in the Swiper) */}
      <div className="w-full  absolute top-5 lg:top-0  z-20 ">
        <div className="w-full lg:w-1/2 px-28">
          {banners.length > 0 && !isLoading && (
            <>
             
              {/* <p
                className="text-white  fz16  mt-4 pb-4 wow fadeInUp"
                data-wow-delay=".5s"
              >
                {banners[0].text}
              </p>
              <div
                className="hero-btn animate-fadeInUp"
                style={{ animationDelay: "1s" }}
              >
                <Link href="/contact-us" className="theme-btn flex items-center">
                  Contact Us
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
                <Link href="#learn" className="theme-btn theme-btn2 flex items-center">
                  Learn More
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div> */}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
