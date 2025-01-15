"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
    const pathname = usePathname();

    const formattedPathname = pathname
        .split('/')
        .filter(Boolean)
        .map((segment) =>
            segment
                .replace(/-/g, ' ') 
                .replace(/\b\w/g, (char) => char.toUpperCase())
        )
        .join(' / ');

    return (
        <div className="site-breadcrumb relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/banner/breadcrumb.jpeg')",
                }}
            ></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 py-20">
                <div className="text-center text-white">
                    <h4 className="text-2xl font-semibold mb-4">{formattedPathname || 'Home'}</h4>
                    <ul className="flex justify-center space-x-4 text-sm">
                        <li>
                            <Link href="/" className="flex items-center hover:text-gray-300">
                                <i className="fas fa-home mr-2"></i> Home
                            </Link>
                        </li>
                        <li className="text-gray-300">/</li>
                        <li className="text-gray-300">{formattedPathname || 'Home'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
