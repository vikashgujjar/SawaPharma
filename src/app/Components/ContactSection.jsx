"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { baseLink } from "../config/Apilink";
import {
  MapPin, Factory, Phone, Mail, Clock, MessageCircle,
  User, Package, MessageSquare, Send,
} from "lucide-react";

const quickInfo = [
  {
    Icon: MapPin,
    title: "Office Address",
    lines: ["SCO/F 21, 1st Floor, Sector 5, Swastik Vihar,", "Mansa Devi Complex, Haryana - 134114 (India)"],
  },
  {
    Icon: Factory,
    title: "Factory Address",
    lines: ["Healthonics Lifesciences Pvt. Ltd., SIDCO Ind. Complex,", "Ghati, Kathua Phase 1, J&K, 184143"],
  },
  {
    Icon: Phone,
    title: "Call Us",
    links: [
      { label: "+91 98759-39878", href: "tel:+919875939878" },
      { label: "+91 98759-39879", href: "tel:+919875939879" },
      { label: "0172 4523651", href: "tel:01724523651" },
    ],
  },
  {
    Icon: Mail,
    title: "Email Us",
    links: [{ label: "ceo@sawapharma.in", href: "mailto:ceo@sawapharma.in" }],
  },
];

const businessHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { day: "Saturday",        hours: "9:00 AM – 2:00 PM" },
  { day: "Sunday",          hours: "Closed" },
];

/* Office location used for the map embed — swap the query text
   for the exact address once confirmed with the client. */
const MAP_QUERY = encodeURIComponent(
  "SCO/F 21, Sector 5, Swastik Vihar, Mansa Devi Complex, Panchkula, Haryana 134114"
);

const facilityPhotos = [
  { label: "Office", src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=800&auto=format&fit=crop" },
  { label: "Factory", src: "https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?q=80&w=800&auto=format&fit=crop" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", number: "", product: "", text: "" });

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, text, product, number } = formData;

    if (!name || !email || !text) {
      Swal.fire({
        title: "Validation Error!",
        text: "Please fill in all required fields (Name, Email, Message).",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#0B3B91",
      });
      return;
    }

    try {
      const response = await fetch(`${baseLink}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, text, product, number }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#00A86B",
        });
        setFormData({ name: "", email: "", number: "", product: "", text: "" });
      } else {
        const errorData = await response.json().catch(() => ({}));
        Swal.fire({
          title: "Failed!",
          text: errorData.message || "Failed to send the message. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#f44336",
        });
      }
    } catch (error) {
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

  const field =
    "w-full border border-gray-200 bg-[#EAF4FF]/40 rounded-xl pl-10 pr-3.5 py-3 font-inter " +
    "text-gray-700 placeholder-gray-400 text-[13.5px] focus:outline-none focus:border-[#00A86B] " +
    "focus:ring-2 focus:ring-[#00A86B]/15 transition-all duration-200";

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
            We're Here To Help.
          </h2>
        </div>

        {/* quick info strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-12">
          {quickInfo.map(({ Icon, title, lines, links }, i) => (
            <div key={i} className="bg-[#EAF4FF]/40 rounded-2xl p-5 border border-[#0B3B91]/8">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3">
                <Icon size={17} className="text-[#0B3B91]" />
              </div>
              <h3 className="font-poppins font-semibold text-[#0B3B91] text-[13.5px] mb-1.5">{title}</h3>
              {lines?.map((l, j) => (
                <p key={j} className="font-inter text-gray-500 text-[11.5px] leading-relaxed">{l}</p>
              ))}
              {links?.map((l, j) => (
                <Link key={j} href={l.href} className="block font-inter text-gray-500 text-[11.5px] hover:text-[#00A86B] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">

          {/* ── Left: map + hours + whatsapp + photos ── */}
          <div className="flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#0B3B91]/8 h-[280px]">
              <iframe
                title="Sawa Pharma office location"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                className="w-full h-full grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* business hours */}
              <div className="bg-[#0B3B91] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-[#00A86B]" />
                  <h3 className="font-poppins font-semibold text-white text-[13.5px]">Business Hours</h3>
                </div>
                <div className="space-y-1.5">
                  {businessHours.map((h, i) => (
                    <div key={i} className="flex justify-between text-[11.5px] font-inter">
                      <span className="text-white/50">{h.day}</span>
                      <span className="text-white/85">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* whatsapp */}
              <Link
                href="https://wa.me/919875939879"
                target="_blank"
                className="bg-[#00A86B] rounded-2xl p-5 flex flex-col justify-between hover:bg-[#008f5a] transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={16} className="text-white" />
                  <h3 className="font-poppins font-semibold text-white text-[13.5px]">Chat On WhatsApp</h3>
                </div>
                <p className="font-inter text-white/70 text-[11.5px] leading-relaxed">
                  Fastest way to reach our team — usually replies within minutes.
                </p>
                <span className="font-poppins text-white text-[11.5px] font-semibold mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start chat →
                </span>
              </Link>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="bg-[#EAF4FF]/30 rounded-2xl p-6 sm:p-8 border border-[#0B3B91]/8">
            <p className="font-inter text-gray-500 text-[13.5px] leading-relaxed mb-6">
              Whether you have questions, need support, or want to know more about our products and services,
              feel free to reach out.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="name" type="text" value={formData.name} onChange={handleChange}
                    className={field} placeholder="Your Name *" required />
                </div>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="number" type="tel" value={formData.number} onChange={handleChange}
                    className={field} placeholder="Your Number" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="email" type="email" value={formData.email} onChange={handleChange}
                    className={field} placeholder="Your Email *" required />
                </div>
                <div className="relative">
                  <Package size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="product" type="text" value={formData.product} onChange={handleChange}
                    className={field} placeholder="Your Product" />
                </div>
              </div>

              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                <textarea name="text" rows="4" value={formData.text} onChange={handleChange}
                  className={`${field} resize-none`} placeholder="Write Your Message *" required />
              </div>

              <button
                type="submit"
                className="self-start inline-flex items-center gap-2 bg-[#00A86B] hover:bg-[#008f5a] text-white
                  font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-xl transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00A86B]/25"
              >
                <Send size={14} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;