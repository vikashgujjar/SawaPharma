"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseLink } from "../config/Apilink";
import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseLink}/layout`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching topbar data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className="fixed bottom-4 right-4 lg:bottom-3 lg:right-3 z-[999]">

                <Link
                    href="tel:+91 98759-39879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white rounded-[20px]"
                >
                    <Image
                        src="/images/viber.webp"
                        alt="WhatsApp Icon"
                        className="w-8 lg:w-12 h-auto"
                        width={900}
                        height={900}
                        loading="lazy"
                    />
                </Link>

                <Link
                    href="tel:+91 98759-39878"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white mt-2 overflow-hidden rounded-[10px]  lg:hidden "
                >
                    <Image
                        src="/images/whatsappicon.webp"
                        alt="WhatsApp Icon"
                        className="w-8 lg:w-12 h-auto"
                        width={900}
                        height={900}
                        loading="lazy"
                    />
                </Link>
            </div>

            <footer className="wide-40 footer bg-black text-white py-10 pt-20 px-5 lg:px-28">
                <div className="container mx-auto px-0 lg:px-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="footer-info w-[90%]">
                            <Image
                                src="/images/logo/logo.webp"
                                alt="footer-logo"
                                width={800}
                                height={800}
                                loading="lazy"
                                className="h-24  w-auto bg-white "
                            />
                            <p className="text-sm mt-5 " >
                                Sawa Pharma (India) Pvt. Ltd. provides a comprehensive  for Sterile/Non
                                sterile pharmaceutical products.
                            </p>

                            <div className="mt-5">
                                <ul className="flex space-x-4">


                                    {loading ? (
                                        <>
                                            {/* Skeleton Loaders for Social Icons */}
                                            <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                                            <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                                            <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                                            <li className="h-5 w-5 bg-gray-400 animate-pulse rounded-full"></li>
                                        </>
                                    ) : (
                                        data?.links?.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.link} target="_blank" className="hover:text-gray-300">
                                                    {item.platform === "facebook" && <i className="fab fa-facebook-f"></i>}
                                                    {item.platform === "tweeter" && <i className="fab fa-twitter"></i>}
                                                    {item.platform === "instagram" && <i className="fab fa-instagram"></i>}
                                                    {item.platform === "youtube" && <i className="fab fa-youtube"></i>}
                                                </Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>



                        <div className="footer-links">
                            <h5 className="text-lg font-semibold mb-3">Products</h5>
                            <ul className="space-y-2 ">
                               
                                <li>
                                    <Link
                                        href="/tablets"
                                        className=""
                                    >
                                        Tablets
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/liquid-injection"
                                        className=""
                                    >
                                        Liquid Injections
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dry-injection"
                                        className=""
                                    >
                                        Dry Injections
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/capsules"
                                        className=""
                                    >
                                        Capsules
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/syrup"
                                        className=""
                                    >
                                        Syrup
                                    </Link>
                                </li>

                            </ul>
                        </div>


                        <div className="footer-links">
                            <h5 className="text-lg font-semibold mb-3">About </h5>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/company-profile"
                                        className=""
                                    >
                                        Company Profile
                                    </Link>
                                </li>
                               

                                <li>
                                    <Link
                                        href="/our-presence"
                                        className=""
                                    >
                                        Our Presence
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/marekting"
                                        className=""
                                    >
                                        Marketing

                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact-us"
                                        className=""
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-box">
                            <h5 className="text-lg font-semibold mb-3">Our Location</h5>
                            <p className="flex gap-2"><FaLocationArrow className="text-4xl" /> SCO/F 21, 1st Floor, Sector 5, Swastik Vihar, Mansa Devi Complex, Haryana - 134114 (India)</p>
                            <p className="mt-3 flex gap-2 items-center">
                                <FaEnvelope />
                                <Link
                                    href="mailto:ceo@sawapharma.in"
                                    className=""
                                >
                                    ceo@sawapharma.in
                                </Link>
                            </p>
                            <p className="flex gap-2 items-center" ><FaPhone /> <Link href="tel:+91 98759-39878">+91 98759-39878
                            </Link></p>
                            <p className="flex gap-2 items-center" ><FaPhone /> <Link href="tel:+91 98759-39879">
                                +91 98759-39879 </Link></p>
                        </div>
                    </div>


                    <div className="border-t border-gray-300 mt-10 pt-5 text-center">
                        <p className="text-sm">
                            © {currentYear} <span className="font-semibold">Sawa Pharma</span>. All Rights Reserved. Developed By Future Touch
                        </p>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Footer;
