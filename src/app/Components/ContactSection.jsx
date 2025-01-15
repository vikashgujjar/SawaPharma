import React from 'react';
import { FaEnvelope, FaKitMedical, FaMapLocationDot, FaUser } from "react-icons/fa6";
import { PiHeadsetFill } from "react-icons/pi";
import { MdMarkEmailRead, MdMedicalServices } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { RiMessage2Fill } from "react-icons/ri";

const ContactSection = () => {
    return (
        <div className="contact-area px-5 lg:px-28 py-20 ">
            <div className="container">
                <h2 className="text-4xl font-semibold text-steelblue text-center mb-8 ">Get In Touch</h2>
                <div className="contact-wrapper">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div className="col-span-1 lg:col-span-1">
                            <div className="contact-content">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="contact-info">
                                        <div className="contact-info-icon">
                                            <FaMapLocationDot />

                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Office Address</h5>
                                            <p>SCO/F 21, 1st Floor, Sector 5, Swastik Vihar, Mansa Devi Complex, Haryana - 134114 (India)</p>
                                        </div>
                                    </div>

                                    <div className="contact-info">
                                        <div className="contact-info-icon">
                                            <PiHeadsetFill />
                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Call Us</h5>
                                            <p>+2 123 4565 788</p>
                                            <p>+2 123 4565 789</p>
                                        </div>
                                    </div>

                                    <div className="contact-info">
                                        <div className="contact-info-icon">
                                            <MdMarkEmailRead />
                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Email Us</h5>
                                            <p>info@example.com</p>
                                            <p>support@example.com</p>
                                        </div>
                                    </div>


                                    <div className="contact-info">
                                        <div className="contact-info-icon">
                                            <LuAlarmClockCheck />
                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Open Time</h5>
                                            <p>Mon - Sat (10AM - 05PM)</p>
                                            <p>Sunday - <span className="text-red-500">Closed</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-1 lg:col-span-1">
                            <div className="contact-form">
                                <div className="contact-form-header mb-6">

                                    <p className='text-[#757F95]'>
                                        It is a long established fact that a reader will be distracted by the readable content of a page words which even slightly when looking at its layout.
                                    </p>
                                </div>
                                <form method="post" id="contact-form">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-group relative">
                                            <FaUser className='absolute top-5 left-3 text-[#757f95]' />
                                            <input
                                                type="text"
                                                className="form-control outline-none w-full"
                                                name="name"
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group relative">
                                            <FaEnvelope className='absolute top-5 left-3 text-[#757f95]' />
                                            <input
                                                type="email"
                                                className="form-control w-full outline-none "
                                                name="email"
                                                placeholder="Your Email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-6 relative">
                                        <MdMedicalServices className='absolute top-5 left-3 text-[#757f95]' />

                                        <input
                                            type="text"
                                            className="form-control  w-full outline-none"
                                            name="subject"
                                            placeholder="Your Subject"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-6 relative">
                                        <RiMessage2Fill className='absolute top-5 left-3 text-[#757f95]' />
                                        <textarea
                                            name="message"
                                            cols="30"
                                            rows="4"
                                            className="form-control  w-full outline-none"
                                            placeholder="Write Your Message"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="relative text-[16px] bg-[#03A297] text-white px-5 py-2.5 inline-block align-middle capitalize rounded-[10px] font-medium cursor-pointer text-center overflow-hidden border-none shadow-lg transition-all duration-300 z-[1]"
                                    >
                                        Send Message <i className="far fa-paper-plane ml-2"></i>
                                    </button>
                                    <div className="col-md-12 my-3">
                                        <div className="form-message text-success"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
