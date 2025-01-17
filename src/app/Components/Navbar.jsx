"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

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
                { label: 'Board of Members', href: '/board-of-members' },
                { label: 'Our Presence ', href: '/our-presence' },
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
                { label: 'INJECTABLES', href: '/injectables' },
                { label: 'TABLETS', href: '/tablets' },
                { label: 'LIQUID Injections ', href: '/liquid-injection' },
                { label: 'DRY Injections', href: '/dry-injection' },
            ],
        },
        {
            label: 'Manufacturing',
            href: '/manufacturing',
        },
        {
            label: 'R&D',
            href: '',
        },
        {
            label: 'Blog',
            href: '/blog',
        },
        {
            label: 'Contact Us',
            href: '/contact-us',
        },
    ];

    return (
        <header className="mainHeader bg-[#000] z-30 py-2 sticky top-0">
            <div className="px-5 lg:px-40 mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="logo">
                        <Link href="/" className="text-xl font-bold text-[#03a297]">
                            <Image
                                src="/images/logo/logo.png"
                                className="w-auto h-20"
                                alt=""
                                width={800}
                                height={800}
                            />
                        </Link>
                    </div>

                    <div
                        className="lg:hidden text-white text-2xl cursor-pointer"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>


                    <nav
                        className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent lg:flex transition-transform duration-300 ${mobileMenuOpen ? 'block' : 'hidden'
                            }`}
                    >
                        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-5 lg:p-0">
                            {menuItems.map((item, index) => (
                                <li key={index} className="relative group">
                                    <div className="flex gap-1 items-center">
                                        <Link
                                            href={item.href}
                                            className="font-medium text-sm text-white uppercase py-2 lg:py-6 no-underline block"
                                        >
                                            {item.label}
                                        </Link>
                                        {item.subMenu && (
                                            <span
                                                className="text-white cursor-pointer"
                                                onClick={() => handleToggle(index)}
                                            >
                                                <i className="fa fa-angle-down ml-2.5"></i>
                                            </span>
                                        )}
                                    </div>
                                    {item.subMenu && (
                                        <div
                                            className={`lg:absolute lg:left-0 lg:top-16 bg-white px-4 py-2 w-full lg:w-64 ${dropdownOpen === index
                                                ? 'block'
                                                : 'hidden'
                                                } lg:group-hover:block`}
                                        >
                                            <ul>
                                                {item.subMenu.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="py-2">
                                                        <Link
                                                            href={subItem.href}
                                                            className="font-medium text-sm text-black uppercase no-underline block"
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

                    <div className="hidden lg:block">
                        <Link
                            href="#"
                        >
                            <Image src="/images/whatsappicon.png" alt='whatsapicon' className='w-12 h-auto rounded-full' width={900} height={900}></Image>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
