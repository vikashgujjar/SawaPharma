"use client";
import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const marginalia = [
  {
    n: "01",
    title: "Business Model",
    text: "A virtual company connecting people, knowledge, and a network of chosen manufacturing partners.",
  },
  {
    n: "02",
    title: "Our People",
    text: "Expertise across every non-clinical stage — from precursor materials to finished, market-ready products.",
  },
  {
    n: "03",
    title: "Quality",
    text: "Exceptional quality, sustainability, and integrity, extended globally through every affiliate we work with.",
  },
];

const offerings = [
  "Finished Dosage Manufacturing", "Tablets & Capsules", "Liquid & Dry Injections",
  "Regulatory Affairs", "Quality Management", "IP & Patents",
  "Licensing & BD", "Business Process Outsourcing", "Global Distribution",
];

const AboutEditorialRight = () => (
  <section className="w-full bg-[#040d20] py-16 sm:py-24 relative overflow-hidden">
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

      <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-4">
        About Sawa Pharma — A Word From The Director
      </p>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-start">

        {/* ── Pull-quote + marginalia — now on the left ── */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <blockquote className="font-poppins font-bold text-white leading-[1.15] text-[1.75rem] sm:text-[2.3rem] md:text-[2.6rem] mb-8 max-w-2xl">
            Every batch that leaves our facility carries our name{" "}
            <span className="text-[#00A86B]">— and our responsibility.</span>
          </blockquote>
          <p className="font-inter text-white/55 text-[15px] leading-relaxed max-w-xl mb-12">
            Quality isn't a department here, it's a discipline every one of us practices every day. That's the
            partner we want to be for every distributor, hospital, and market we serve.
          </p>

          <div className="h-px w-full bg-white/10 mb-10" />

          <div className="grid sm:grid-cols-3 gap-x-6 gap-y-8">
            {marginalia.map(({ n, title, text }) => (
              <div key={n}>
                <span className="font-mono text-[#00A86B] text-[11px] tracking-wider">{n}</span>
                <h3 className="font-poppins font-semibold text-white text-[13.5px] mt-1.5 mb-2">{title}</h3>
                <p className="font-inter text-white/45 text-[12.5px] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-white/10 my-10" />

          <p className="font-mono text-white/30 text-[10px] tracking-[0.15em] uppercase mb-3">What We Offer —</p>
          <div className="flex flex-wrap gap-2">
            {offerings.map((item, i) => (
              <span
                key={i}
                className="font-inter text-white/60 text-[12px] px-3 py-1.5 rounded-full border border-white/15
                  hover:border-[#00A86B]/50 hover:text-white transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Image collage — now on the right, sticky ── */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative pb-10 lg:sticky lg:top-28">

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
            <Image
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=900&auto=format&fit=crop"
              alt="Sawa Pharma manufacturing facility"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#040d20]/70 backdrop-blur-md border border-[#00A86B]/40 rounded-full pl-2 pr-3 py-1.5">
              <div className="w-5 h-5 rounded-full bg-[#00A86B] flex items-center justify-center shrink-0">
                <ShieldCheck size={11} className="text-white" />
              </div>
              <span className="font-poppins text-white text-[10px] font-semibold tracking-wide">WHO-GMP Certified</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-[48%] aspect-[4/3] rounded-xl overflow-hidden
                          border-[3px] border-[#040d20] shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
            <Image
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop"
              alt="Quality control at Sawa Pharma"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex items-baseline justify-between pl-2">
            <span className="font-mono text-[10px] text-[#00A86B]/70 tracking-wider">FIG. 01</span>
            <div className="text-right">
              <p className="font-poppins font-bold text-white text-[15px]">Manufacturing Excellence</p>
              <p className="font-inter text-white/40 text-[12px]">Sawa Pharma (India) Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutEditorialRight;