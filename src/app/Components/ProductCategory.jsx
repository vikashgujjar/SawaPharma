"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";

const ProductCategory = () => {
    const products = [
        {
            imgSrc: "/images/inject.png",
            title: "Injectables",
            downloadLink: "/pdfs/Cefa Injectables.pdf",
        },
        {
            imgSrc: "/images/pills.png",
            title: "Tablets",
            downloadLink: "/pdfs/tablets.pdf",
        },
        {
            imgSrc: "/images/injection-document.png",
            title: "Liquid Injection",
            downloadLink: "/pdfs/Liquid Injections.pdf",
        },
        {
            imgSrc: "/images/intravenous.png",
            title: "Dry Injection",
            downloadLink: "/pdfs/Dry Injections.pdf",
        },


    ];

    return (
        <section
            className="py-20 bg-cover bg-center overflow-hidden relative"
            style={{
                backgroundImage: "url('/images/pcd.jpeg')",
            }}
        >
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                style={{
                    mixBlendMode: "multiply",
                }}
            ></div>
            <div className="text-center relative z-10 mx-5 lg:mx-28">
                <h2 className="text-3xl font-bold text-white mb-4">OUR PRODUCTS CATEGORY</h2>
                <p className="text-lg text-white mb-8">
                    We are the leading manufacturer and supplier of various pharmaceutical formulations.
                </p>
                <Swiper
                    loop={true}
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: { // For mobile devices
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: { // For tablets and above
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: { // For desktops and larger screens
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Navigation, Autoplay]}
                    className="relative"
                >

                    {products.map((product, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <div className="single-logo-container group p-4 flex flex-col items-center">
                                <img
                                    src={product.imgSrc}
                                    alt={product.title}
                                    className="w-24 h-24 object-contain mb-3 rounded-full border-[2px] group-hover:border-white"
                                />
                                <h3 className="text-xl font-semibold text-[#000] group-hover:text-white">
                                    {product.title}
                                </h3>
                                <button
                                    onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = product.downloadLink;
                                        link.download = `${product.title}.pdf`; // Dynamic file name based on product title
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="mt-4 px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-300 transition"
                                >
                                    Download PDF
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ProductCategory;
