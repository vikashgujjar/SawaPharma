"use client";
import React from "react";
import Image from "next/image";
import Breadcrumb from "../Components/Breadcrumb";
import { Globe2, Target, Award, ShieldCheck } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   COMPANY PROFILE — POLAROID CLUSTER
   A fourth, different idea: real facility photography shown as
   a scattered cluster of tilted polaroid-style prints next to
   the About text — a candid, behind-the-scenes feel instead of
   a single hero image or a stamp/document metaphor. Vision gets
   a full-bleed photo band with the quote as a plaque overlay.
   Values get small circular photo medallions instead of flat
   icon boxes.

   Content bug fixed from the original: the "Vision & Values"
   card used to repeat the "Our Vision" paragraph word-for-word.
   Rewritten as its own distinct value statement.

   TOKENS: White (base) · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
   Display: Poppins · Body: Inter

   Images: verified working Unsplash pharma-manufacturing photos.
   Swap for the client's own facility photos whenever ready.
───────────────────────────────────────────────────────── */

const polaroids = [
  { src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=500&auto=format&fit=crop", caption: "Our production floor", rotate: "-rotate-6", pos: "top-0 left-0" },
  { src: "https://images.unsplash.com/photo-1748349221526-33b51820b21e?q=80&w=500&auto=format&fit=crop", caption: "Cleanroom operations", rotate: "rotate-3", pos: "top-10 left-[38%]" },
  { src: "https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?q=80&w=500&auto=format&fit=crop", caption: "Quality in motion", rotate: "-rotate-2", pos: "top-[210px] left-[14%]" },
];

const values = [
  { Icon: ShieldCheck, title: "Commitment", text: "A passionate, dedicated, experienced team — proud of every batch, every shipment, every partnership.", img: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=300&auto=format&fit=crop" },
  { Icon: Target,       title: "Vision-Driven", text: "Every decision — portfolio, partnerships, presence — measured against one question: does this move us forward.", img: "https://images.unsplash.com/photo-1745420052756-1b1c294a6420?q=80&w=300&auto=format&fit=crop" },
  { Icon: Award,        title: "Compliance", text: "National and international standards, regularly inspected by competent authorities, fully upheld.", img: "https://images.unsplash.com/photo-1607398027609-fbd1a06fb5d4?q=80&w=300&auto=format&fit=crop" },
];

const presenceCountries = ["Somalia", "Angola", "Afghanistan"];

const Polaroid = ({ src, caption, rotate, pos }) => (
  <div className={`absolute ${pos} ${rotate} hover:rotate-0 hover:z-20 transition-transform duration-300 w-[150px] sm:w-[170px]`}>
    <div className="bg-white p-2.5 pb-4 shadow-[0_15px_35px_rgba(11,59,145,0.18)]">
      <div className="relative w-full h-[110px] sm:h-[125px]">
        <Image src={src} alt={caption} fill sizes="170px" className="object-cover" />
      </div>
      <p className="font-poppins text-gray-500 text-[10px] text-center mt-2.5 italic">{caption}</p>
    </div>
  </div>
);

const CompanyProfilePage = () => (
  <>
    <Breadcrumb />

    {/* ── About Us + polaroid cluster ── */}
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
              About Us
            </p>
            <h2 className="font-poppins font-bold text-[#0B3B91] text-[1.8rem] sm:text-[2.2rem] mb-6 leading-tight">
              A Global Healthcare Company, Built On Access.
            </h2>
            <p className="font-inter text-gray-600 text-[15px] leading-relaxed mb-5">
              Sawa Pharma (India) Pvt. Ltd. is a global healthcare company focused on exporting our unique
              pharmaceutical formulations worldwide. Our core philosophy centers on expanding our business and
              providing affordable healthcare solutions.
            </p>
            <p className="font-inter text-gray-600 text-[15px] leading-relaxed mb-8">
              Our mission is to improve access to affordable, high-quality medicines. Sawa Pharma (India) Pvt.
              Ltd. has established a presence in countries across Africa and South Asia, among others.
            </p>

            <div className="flex items-center gap-2 mb-3">
              <Globe2 size={15} className="text-[#00A86B]" />
              <span className="font-poppins font-semibold text-[#0B3B91] text-[13px]">Global Presence</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {presenceCountries.map((c) => (
                <span key={c} className="font-inter text-[#0B3B91] text-[12px] bg-[#EAF4FF] border border-[#0B3B91]/10 rounded-full px-3 py-1.5">
                  {c}
                </span>
              ))}
              <span className="font-inter text-gray-400 text-[12px] bg-[#EAF4FF]/50 border border-dashed border-gray-200 rounded-full px-3 py-1.5">
                +more
              </span>
            </div>
          </div>

          {/* polaroid cluster */}
          <div className="relative h-[380px] sm:h-[420px] mt-10 lg:mt-0">
            {polaroids.map((p, i) => <Polaroid key={i} {...p} />)}
          </div>
        </div>
      </div>
    </section>

    {/* ── Vision — full-bleed photo band with plaque overlay ── */}
    <section className="relative w-full h-[380px] sm:h-[440px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?q=80&w=1600&auto=format&fit=crop"
        alt="Sawa Pharma manufacturing operations"
        fill
        sizes="100vw"
        className="object-cover [filter:brightness(0.5)_saturate(0.7)]"
      />
      <div className="absolute inset-0 bg-[#040d20]/55" />
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 w-full">
          <div className="max-w-2xl bg-[#040d20]/70 backdrop-blur-md border border-white/10 rounded-2xl p-7 sm:p-10">
            <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-4">
              Our Vision
            </p>
            <p className="font-poppins font-semibold text-white text-[1.2rem] sm:text-[1.5rem] leading-relaxed">
              To become the preferred supplier, manufacturer, and service provider to the pharmaceutical
              industry — through a unique product portfolio, technological strength, and an expanding
              international presence.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── Values — circular photo medallions ── */}
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            What Drives Us
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.2rem]">
            Our Values
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3 max-w-5xl mx-auto">
          {values.map(({ Icon, title, text, img }, i) => (
            <div key={i} className="text-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-5 border-4 border-white shadow-[0_10px_30px_rgba(11,59,145,0.18)]">
                <Image src={img} alt={title} fill sizes="80px" className="object-cover" />
                <div className="absolute inset-0 bg-[#0B3B91]/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
              </div>
              <h3 className="font-poppins font-semibold text-[#0B3B91] text-[16px] mb-2.5">{title}</h3>
              <p className="font-inter text-gray-500 text-[13px] leading-relaxed max-w-xs mx-auto">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default CompanyProfilePage;