"use client";
import React, { useState } from 'react';
import { FaEnvelope, FaKitMedical, FaMapLocationDot, FaPhone, FaUser } from "react-icons/fa6";
import { PiHeadsetFill } from "react-icons/pi";
import { MdMarkEmailRead, MdMedicalServices } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { RiMessage2Fill } from "react-icons/ri";
import Link from 'next/link';
import Swal from "sweetalert2";
import { baseLink } from '../config/Apilink';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        product: "",
        text: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, text, product, number } = formData;

        try {

            if (!name || !email || !text) {
                Swal.fire({
                    title: "Validation Error!",
                    text: "Please fill in all required fields (Name, Email, Message).",
                    icon: "warning",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#FFC107",
                });
                return;
            }


            const response = await fetch(`${baseLink}/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, text, product, number }),
            });

            if (response.ok) {
                // If successful, show success message and reset the form
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4CAF50",
                });
                setFormData({
                    name: "",
                    email: "",
                    number: "",
                    product: "",
                    text: "",
                });
            } else {
                // Handle API error response
                const errorData = await response.json();
                Swal.fire({
                    title: "Failed!",
                    text: errorData.message || "Failed to send the message. Please try again.",
                    icon: "error",
                    confirmButtonText: "Retry",
                    confirmButtonColor: "#f44336",
                });
            }
        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Network error:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "Retry",
                confirmButtonColor: "#f44336",
            });
        }
    };


    return (
        <div className="contact-area px-5 lg:px-28 py-20">
            <div className="container">
                <h2 className="text-4xl font-semibold text-steelblue text-center mb-8">Get In Touch</h2>
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
                                            <LuAlarmClockCheck />
                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Factory Address</h5>
                                            <p>Healthonics lifesciencience Pvt. Ltd. SIDCO Ind. Complex Ghati, Kathua Phase 1, J&K, 184143</p>
                                        </div>
                                    </div>

                                    <div className="contact-info">
                                        <div className="contact-info-icon">
                                            <PiHeadsetFill />
                                        </div>
                                        <div className="contact-info-content">
                                            <h5 className="text-xl font-semibold">Call Us</h5>
                                            <p><Link href="tel:+91 98759-39878">+91 98759-39878</Link></p>
                                            <p><Link href="tel:+91 98759-39879">+91 98759-39879</Link></p>
                                            <p><Link href="tel:0172 4523651">0172 4523651</Link></p>
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
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-1">
                            <div className="contact-form">
                                <div className="contact-form-header mb-6">
                                    <p className='text-[#757F95]'>
                                        We’re here to assist you! Whether you have questions, need support, or want to know more about our products and services, feel free to reach out.
                                    </p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-group relative">
                                            <FaUser className="absolute top-5 left-3 text-[#757f95]" />
                                            <input
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control outline-none pl-10 w-full"
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group relative">
                                            <FaPhone className="absolute top-5 left-3 text-[#757f95]" />
                                            <input
                                                name="number"
                                                type="tel"
                                                value={formData.number}
                                                onChange={handleChange}
                                                className="form-control outline-none pl-10 w-full"
                                                placeholder="Your number"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                        <div className="form-group relative">
                                            <FaEnvelope className="absolute top-5 left-3 text-[#757f95]" />
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control w-full outline-none"
                                                placeholder="Your Email"
                                                required
                                            />
                                        </div>
                                        <div className="form-group relative">
                                            <MdMedicalServices className="absolute top-5 left-3 text-[#757f95]" />
                                            <input
                                                name="product"
                                                type="text"
                                                value={formData.product}
                                                onChange={handleChange}
                                                className="form-control w-full outline-none"
                                                placeholder="Your Product"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-6 relative">
                                        <RiMessage2Fill className="absolute top-5 left-3 text-[#757f95]" />
                                        <textarea
                                            name="text"
                                            rows="4"
                                            value={formData.text}
                                            onChange={handleChange}
                                            className="form-control w-full outline-none"
                                            placeholder="Write Your Message"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="text-[16px] bg-[#03A297] text-white px-5 py-2.5 capitalize rounded-[10px] font-medium shadow-lg transition-all"
                                    >
                                        Send Message
                                    </button>
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
