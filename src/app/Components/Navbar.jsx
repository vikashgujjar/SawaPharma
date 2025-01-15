"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);

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
                { label: 'Company Profile', href: '' },
                { label: 'Board of Members', href: '' },
                { label: 'Our Presence ', href: '' },
            ],

        },
        {
            label: 'Marketing',
            href: '',

        },
        {
            label: 'Products',
            href: '',
            subMenu: [
                { label: 'INJECTABLES', href: '/injectables' },
                { label: 'TABLETS', href: '/tablets' },
                { label: 'LIQUID Injections ', href: '/liquid-injection' },
                { label: 'DRY INJECTABLES', href: '' },

            ],
        },
        {
            label: 'Manufacturing',
            href: '',

        },
        {
            label: 'R&D',
            href: '',

        },
        {
            label: 'blog',
            href: '',

        },
        {
            label: 'Contact Us',
            href: '',

        },

    ];

    return (
        <header className="mainHeader bg-[#000]  z-30 py-2 sticky top-0">
            <div className="px-5 lg:px-40 mx-auto ">
                <div className="flex items-center justify-between">

                    <div className="logo">
                        <Link href="/" className="text-xl font-bold text-[#03a297]">
                            <Image src="/images/logo/logo.png" className='w-auto h-20' alt='' width={800} height={800} />
                        </Link>
                    </div>


                    {/* <div
                        id="nav-icon1"
                        className="block lg:hidden text-gray-700 text-2xl cursor-pointer"
                        onClick={() => handleToggle('mobileMenu')}
                    >
                        <i className="fal fa-bars"></i>
                    </div> */}


                    <nav className={`w-full lg:w-auto lg:flex ${dropdownOpen === 'mobileMenu' ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col lg:flex-row gap-8">
                            {menuItems.map((item, index) => (
                                <li key={index} className="relative group">
                                    <Link href={item.href} className="font-medium text-sm text-white uppercase relative py-6 no-underline">{item.label}
                                    </Link>
                                    {item.subMenu && (
                                        <div
                                            className={`absolute left-0 top-10 bg-white px-4 py-2 w-64 ${dropdownOpen === index ? 'block' : 'hidden'
                                                } lg:group-hover:block`}
                                        >
                                            <ul>
                                                {item.subMenu.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="py-2">
                                                        <Link href={subItem.href} className="font-medium text-sm text-black uppercase relative py-6 no-underline">{subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {item.subMenu && (
                                        <span
                                            className="right-4 text-white cursor-pointer"
                                            onClick={() => handleToggle(index)}
                                        >
                                            <i className="fa fa-angle-down ml-2.5"></i>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden lg:block desktop">
                        <Link href="#" className="font-medium text-sm text-white uppercase relative py-6 no-underline">
                            <i className="fa fa-bars text-2xl align-sub mr-2 text-center"></i> More
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
