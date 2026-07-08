"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Phone } from "lucide-react";

const Page = () => (
  <section className="w-full bg-white py-24 sm:py-32">
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-[#00A86B]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={34} className="text-[#00A86B]" />
        </div>

        <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
          Message Sent
        </p>
        <h1 className="font-poppins font-bold text-[#0B3B91] text-[1.9rem] sm:text-[2.3rem] leading-tight mb-4">
          Thank You For Reaching Out.
        </h1>
        <p className="font-inter text-gray-500 text-[14.5px] leading-relaxed mb-9">
          We've received your enquiry and our export team will get back to you shortly —
          usually within 24 hours. In the meantime, feel free to explore our products or reach us directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0B3B91] hover:bg-[#0a3280] text-white
              font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-xl transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0B3B91]/25 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={15} />
            Back To Home
          </Link>
          <Link
            href="tel:+919875939879"
            className="inline-flex items-center gap-2 border-2 border-[#0B3B91]/15 hover:border-[#00A86B] text-[#0B3B91]
              font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Phone size={15} />
            Call Us Instead
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Page;
