"use client"
import React, { useState } from 'react';
import { FaEnvelope, FaKitMedical, FaMapLocationDot, FaUser } from "react-icons/fa6";
import { PiHeadsetFill } from "react-icons/pi";
import { MdMarkEmailRead, MdMedicalServices } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { RiMessage2Fill } from "react-icons/ri";
import Link from 'next/link';
import Swal from "sweetalert2";


const ContactSection = () => {

    const [formData, setFormData] = useState({
        S_name: "",
        S_email: "",
        S_phone: " ",
        product: " ",
        message: " ",
        userEmailsir: "shivamlugwal01@gmail.com"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.S_name.trim() ||
            !formData.S_email.trim() ||
            !formData.S_phone.trim() ||
            !formData.product.trim() ||
            !formData.message.trim()
        ) {
            Swal.fire({
                title: "Incomplete Form",
                text: "Please fill in all the required fields before submitting.",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#f44336",
            });
            return; // Stop the form submission
        }


        const urlEncodedData = new URLSearchParams(); ``

        for (const [key, value] of Object.entries(formData)) {
            urlEncodedData.append(key, value);
        }

        try {
            const response = await fetch(
                "https://sendingmail-6znv.onrender.com/sendmail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: urlEncodedData.toString(),
                }
            );

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Form submitted successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4CAF50",
                });
                setFormData({
                    S_name: "",
                    S_email: "",
                    S_phone: "",
                    product: "",
                    message: "",
                });
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: "Failed to submit the form. Please try again.",
                    icon: "error",
                    confirmButtonText: "Retry",
                    confirmButtonColor: "#f44336",
                });
            }
        } catch (error) {
            console.error("Network error:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "Retry",
                confirmButtonColor: "#f44336",
            });
        }
    };

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
                                            <p> <Link href="tel:+91 9815178030">+91 9815178030</Link></p>
                                            <p> <Link href="tel:0172452365">0172452365</Link></p>
                                        </div>
                                    </div>

                                    <div className="contact-info">
                                        <div className="contact-info-icon">
                                            <MdMarkEmailRead />
                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Email Us</h5>
                                            <Link href="mailto:ceo@sawapharma.in">ceo@sawapharma.in</Link>
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
                                <form id="contact_form" name="contact_form" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-group relative">
                                            <FaUser className='absolute top-5 left-3 text-[#757f95]' />
                                            <input
                                                id="form_name"
                                                name="S_name"
                                                type="text"
                                                value={formData.S_name}
                                                onChange={handleChange}
                                                className="form-control outline-none w-full"
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group relative">
                                            <FaEnvelope className='absolute top-5 left-3 text-[#757f95]' />
                                            <input
                                                id="form_phone"
                                                name="S_phone"
                                                type="tel"
                                                value={formData.S_phone}
                                                onChange={handleChange}
                                                className="form-control w-full outline-none "
                                                placeholder="Your Phone"
                                                required
                                            />
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                        <div className="form-group relative">
                                            <FaEnvelope className='absolute top-5 left-3 text-[#757f95]' />
                                            <input
                                                id="form_email"
                                                name="S_email"
                                                type="email"
                                                value={formData.S_email}
                                                onChange={handleChange}
                                                className="form-control w-full outline-none "
                                                placeholder="Your Email"
                                                required
                                            />
                                        </div>
                                        <div className="form-group  relative">
                                            <MdMedicalServices className='absolute top-5 left-3 text-[#757f95]' />

                                            <input
                                                id="form_product"
                                                name="product"
                                                type="text"
                                                value={formData.product}
                                                onChange={handleChange}
                                                className="form-control  w-full outline-none"
                                                placeholder="Your Products"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-6 relative">
                                        <RiMessage2Fill className='absolute top-5 left-3 text-[#757f95]' />
                                        <textarea
                                            id="form_message"
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
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
