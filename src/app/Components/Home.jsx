// components/Banner.js
"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

const Banner = () => {
    const images = [
        '/images/banner/bn.jpg',
        '/images/banner/bn2.webp',
        '/images/banner/bn3.jpg',
    ];

    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                loop={true}
                className="innerbanner"
                style={{ height: '400px' }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative h-full"
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '400px',
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50"
                                style={{
                                    mixBlendMode: 'multiply',
                                }}
                            ></div>
                            <div className="w-full relative z-1">
                                <h1 className=" text-center font-semibold text-4xl pt-10 lg:pt-28 text-white wow fadeInUp pt-lg-4" >
                                Sawa Pharma (India) Pvt. Ltd.
                                </h1>
                                <h2 className="text-white fz16 mt-4 pb-4 text-center wow fadeInUp" data-wow-delay=".5s">
                                    The Indian pharmaceutical industry is projected to grow at a CAGR of over 10% to reach a size of US$ 130 billion by 2030.
                                </h2>
                                <div className="hero-btn animate-fadeInUp" style={{ animationDelay: "1s" }}>
                                    <Link href="/"
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
