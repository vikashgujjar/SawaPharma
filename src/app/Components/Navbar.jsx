"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { baseLink } from "../config/Apilink";

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navColor, setNavColor] = useState("#ffffff");

    const handleToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };


    useEffect(() => {
        const fetchNavColor = async () => {
            try {
                const response = await fetch(`${baseLink}/layout`);
                const result = await response.json();

                if (result?.navcolor) {
                    setNavColor(result.navcolor);
                }
            } catch (error) {
                console.error("Error fetching navbar color:", error);
            }
        };

        fetchNavColor();
    }, []);


    const menuItems = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'About Us',
            href: '',
            subMenu: [
                { label: 'Company Profile', href: '/company-profile' },

                { label: 'Our Presence ', href: '/our-presence' },
                { label: 'Our Gallery ', href: '/our-gallery' },
            ],
        },
        {
            label: 'Marketing',
            href: '/marketing',
        },
        {
            label: 'Products',
            href: '',
            subMenu: [

                { label: 'TABLETS', href: '/tablets' },
                { label: 'LIQUID Injections ', href: '/liquid-injection' },
                { label: 'DRY Injections', href: '/dry-injection' },
                { label: 'Capsules', href: '/capsules' },
                { label: 'SYRUP', href: '/syrup' },
            ],
        },



        {
            label: 'Contact Us',
            href: '/contact-us',
        },
    ];

    return (
        <header
            className="mainHeader z-30 py-2 border-b sticky top-0"
            style={{ backgroundColor: navColor || "#ffffff" }}
        >
            <div className="px-5 lg:px-28 mx-auto">
                <div className="flex items-center justify-between">


                    <Link href="/" className=" logo flex items-center gap-4">
                        <Image
                            src="/images/logo/logo.webp"
                            className="w-auto h-20"
                            alt=""
                            width={800}
                            height={800}
                            loading="lazy"
                        />

                        <h1 className="font-semibold text-[#3a3a3a] text-3xl  wow fadeInUp pt-lg-4">
                            Sawa Pharma (India) Pvt. Ltd.
                        </h1>
                    </Link>

                    <div
                        className="lg:hidden text-2xl cursor-pointer"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>


                    <nav
                        className={`absolute lg:static top-24 left-0 w-full lg:w-auto bg-white lg:bg-transparent lg:flex transition-transform duration-300 ${mobileMenuOpen ? 'block' : 'hidden'
                            }`}
                    >
                        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-5 lg:p-0">
                            {menuItems.map((item, index) => (
                                <li key={index} className="relative group">
                                    <div className="flex gap-1 items-center">
                                        <Link
                                            href={item.href}
                                            className="font-semibold text-base uppercase py-2 lg:py-6 no-underline block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                        {item.subMenu && (
                                            <span
                                                className=" cursor-pointer"
                                                onClick={() => handleToggle(index)}
                                            >
                                                <i className="fa fa-angle-down ml-2.5"></i>
                                            </span>
                                        )}
                                    </div>
                                    {item.subMenu && (
                                        <div
                                            className={`lg:absolute lg:left-0  lg:top-16 border  bg-white px-4 py-2 w-full lg:w-[300px] ${dropdownOpen === index
                                                ? 'block'
                                                : 'hidden'
                                                } lg:group-hover:block`}
                                        >
                                            <ul>
                                                {item.subMenu.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="py-2">
                                                        <Link
                                                            href={subItem.href}
                                                            className="text-base font-semibold text-black uppercase no-underline block"
                                                            onClick={() => setMobileMenuOpen(false)} // Close menu on sub-menu click
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>


                    {/* <div className="hidden lg:flex items-center space-x-3">
                        <Link href="https://wa.me/9875939879" target='blank' className="">
                            <Image
                                src="/images/whatsappicon.webp"
                                alt="whatsapp icon"
                                className="w-12 h-auto rounded-full"
                                width={900}
                                height={900}
                                loading="lazy"
                            />
                        </Link>
                    </div> */}


                </div>
            </div>
        </header>
    );
};

export default NavBar;
