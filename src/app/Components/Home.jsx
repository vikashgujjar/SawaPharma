// components/Banner.js
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { baseLink, storageLink } from "../config/Apilink";

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch banner data from the backend
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${baseLink}/banner`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setBanners(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching banner data:", error);
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (isLoading) {
        return (
            <section className="flex justify-center items-center h-400 bg-gray-200">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                loop={true}
                className="innerbanner"
                style={{ height: "400px" }}
            >
                {banners.map((banner, index) => (
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
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50"
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                            ></div>
                            <div className="w-full relative z-1">
                                <h1 className="text-center font-semibold text-4xl pt-10 lg:pt-28 text-white wow fadeInUp pt-lg-4">
                                    {banner.title}
                                </h1>
                                <h2
                                    className="text-white fz16 mt-4 pb-4 text-center wow fadeInUp"
                                    data-wow-delay=".5s"
                                >
                                    {banner.text}
                                </h2>
                                <div className="hero-btn animate-fadeInUp" style={{ animationDelay: "1s" }}>
                                    <Link href="/contact-us"
                                        className="theme-btn flex items-center">
                                        Contact Us
                                        <i className="fas fa-arrow-right ml-2"></i>

                                    </Link>
                                    <Link href="#learn"
                                        className="theme-btn theme-btn2 flex items-center">
                                        Learn More
                                        <i className="fas fa-arrow-right ml-2"></i>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;
