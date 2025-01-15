import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="wide-40 footer bg-black text-white py-10 pt-20 px-5 lg:px-28">
            <div className="container mx-auto px-4">
                {/* FOOTER CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* FOOTER INFO */}
                    <div className="footer-info w-[90%]">
                        <Image
                            src="/images/logo/logo.png"
                            alt="footer-logo"
                            width={800}
                            height={800}
                            className="h-24  w-auto"
                        />
                        <p className="text-sm mt-5 " >
                            Sawa Pharma (India) Pvt. Ltd. provides a comprehensive outsourcing for Sterile/Non
                            sterile pharmaceutical products.
                        </p>
                        {/* Social Icons */}
                        <div className="mt-5">
                            <ul className="flex space-x-4">
                                <li>
                                    <Link href="#" className=" hover:text-blue-600">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className=" hover:text-blue-400">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className=" hover:text-red-500">
                                        <i className="fab fa-google"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className=" hover:text-red-500">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className=" hover:text-red-500">
                                        <i className="fab fa-youtube"></i>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>



                    <div className="footer-links">
                        <h5 className="text-lg font-semibold mb-3">Products</h5>
                        <ul className="space-y-2 ">
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                     Injectables
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                     Tablets
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                 Liquid Injectables
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                     Dry Injectables
                                </Link>
                            </li>
                           
                        </ul>
                    </div>

                    {/* FOOTER LINKS */}
                    <div className="footer-links">
                        <h5 className="text-lg font-semibold mb-3">About </h5>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Company Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Board of Members
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Our Presence

                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Marketing

                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* FOOTER LINKS */}
                    <div className="footer-box">
                        <h5 className="text-lg font-semibold mb-3">Our Location</h5>
                        <p className="flex gap-2"><FaLocationArrow  className="text-4xl" /> SCO/F 21, 1st Floor, Sector 5, Swastik Vihar, Mansa Devi Complex, Haryana - 134114 (India)</p>
                        <p className="mt-3 flex gap-2 items-center">
                            <FaEnvelope />
                            <Link
                                href="mailto:ceo@sawapharma.in"
                                className=""
                            >
                               ceo@sawapharma.in
                            </Link>
                        </p>
                        <p className="flex gap-2 items-center" ><FaPhone /> <Link href="tel:+91 9815178030"> +91 9815178030 </Link></p>
                    </div>
                </div>

                {/* FOOTER COPYRIGHT */}
                <div className="border-t border-gray-300 mt-10 pt-5 text-center">
                    <p className="text-sm ">
                        © 2024 <span className="font-semibold">Sawa Pharma</span>. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
