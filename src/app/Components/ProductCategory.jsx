"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FaDownload } from "react-icons/fa6";
import { baseLink, storageLink } from "../config/Apilink";

// Skeleton loader component
const SkeletonLoader = () => (
    <div className="flex justify-center space-x-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
    </div>
);

const ProductCategory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseLink}/prcate`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section
            className="py-20 bg-cover bg-center overflow-hidden relative"
            style={{
                backgroundImage: "url('/images/pcd.webp')",
            }}
        >
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                style={{
                    mixBlendMode: "multiply",
                }}
            ></div>
            <div className="text-center relative z-10 mx-5 lg:mx-28">
                <h2 className="text-3xl font-bold text-white mb-4">
                    OUR PRODUCTS CATEGORY
                </h2>
                <p className="text-lg text-white mb-8">
                    We are the leading manufacturer and supplier of various pharmaceutical
                    formulations.
                </p>
                <Swiper
                    loop={true}
                    slidesPerView={4}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Autoplay]}
                    className="relative"
                >
                    {loading ? (

                        Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <SwiperSlide key={index} className="flex justify-center">
                                    <SkeletonLoader />
                                </SwiperSlide>
                            ))
                    ) : (

                        products.map((product) => (
                            <SwiperSlide key={product.id} className="flex justify-center">
                                <div className="single-logo-container group p-4 flex flex-col items-center">
                                    <img
                                        src={`${storageLink}/${product.img}`}
                                        alt={product.heading}
                                         loading="lazy"
                                        className="w-24 h-24 object-contain mb-3 rounded-full border-[2px] group-hover:border-white"
                                    />
                                    <div className="flex gap-3 items-center">
                                        <h3 className="text-xl font-semibold text-[#000] group-hover:text-white">
                                            {product.heading}
                                        </h3>
                                        {product.pdf_for_model && (
                                            <button
                                                onClick={() => {
                                                    try {
                                                        const link = document.createElement("a");
                                                        link.href = `${storageLink}/${product.pdf_for_model}`;
                                                        link.download = `${product.heading}.pdf`;
                                                        document.body.appendChild(link);
                                                        link.target = "_blank";
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    } catch (error) {
                                                        console.error("Failed to download the file:", error);
                                                    }
                                                }}
                                                className="font-medium transition relative group"
                                                aria-label={`Download ${product.heading} PDF`}
                                                title={`Download ${product.heading} PDF`}
                                            >
                                                <FaDownload className="text-[#000] group-hover:text-white" />
                                            </button>
                                        )}

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default ProductCategory;
