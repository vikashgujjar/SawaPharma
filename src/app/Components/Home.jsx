"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";
import {
  Download, Users, CheckCircle2, Send, MessageCircle,
  Package, MapPin, Globe2, Headphones, ShieldCheck,
  User, Phone, Building2, MessageSquare, ArrowRight,
} from "lucide-react";

const stats = [
  { Icon: Package,    value: "500+", label: "Products Manufactured" },
  { Icon: MapPin,     value: "25+",  label: "States Served"         },
  { Icon: Globe2,     value: "10+",  label: "Countries Exported"    },
  { Icon: Headphones, value: "24×7", label: "Customer Support"      },
];

const trustItems = ["WHO-GMP Certified", "ISO Certified", "Made in India", "Export Ready"];
const productCategories = ["Tablets", "Capsules", "Liquid Injections", "Dry Injections", "Syrup"];

/* Real Unsplash pharma-manufacturing photography (free tier, verified working).
   Swap for the client's own factory photos whenever ready — same array shape. */
const bgImages = [
  "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?q=85&w=2400&auto=format&fit=crop", // tablets on the production line
  "https://images.unsplash.com/photo-1732690233982-1d4567384ea1?q=85&w=2400&auto=format&fit=crop", // technician operating tablet press
  "https://images.unsplash.com/photo-1605829329196-bac9533b1c3c?q=85&w=2400&auto=format&fit=crop", // operator running manufacturing plant machinery
];

/* ─── Glass field — icon chip beside an underline input ─── */
const GlassField = ({ icon: Icon, label, type = "text", name, value, onChange, as = "input", options, required }) => {
  const inputCls =
    "w-full bg-transparent border-b border-white/25 focus:border-[#00A86B] outline-none " +
    "font-inter text-white placeholder-white/40 text-[13px] py-2 transition-colors duration-200";

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-[#00A86B]" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block font-poppins text-white/45 text-[10px] font-medium tracking-[0.08em] uppercase mb-0.5">
          {label}
        </label>
        {as === "select" ? (
          <select name={name} value={value} onChange={onChange} required={required}
            className={`${inputCls} appearance-none cursor-pointer [&>option]:text-gray-800`}>
            <option value="" className="text-gray-400">Choose category</option>
            {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
          </select>
        ) : as === "textarea" ? (
          <textarea name={name} value={value} onChange={onChange} rows={1}
            className={`${inputCls} resize-none`} placeholder="Optional" />
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} required={required}
            className={inputCls} placeholder={required ? "Required" : "Optional"} />
        )}
      </div>
    </div>
  );
};

/* ─── Quick Enquiry — glassmorphic, sits directly on the carousel ─── */
const QuickEnquiryForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", company: "", country: "", product: "", message: "" });
  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = (e) => e.preventDefault();

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B3B91]/55 backdrop-blur-2xl shadow-[0_25px_70px_rgba(3,12,35,0.6)]">
      {/* header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/15 flex items-center justify-between bg-[#071B47]/40">
        <div>
          <h3 className="font-poppins font-semibold text-white text-[15px] leading-none flex items-center gap-2">
            Get a Quote
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
          </h3>
          <p className="font-inter text-white/45 text-[11px] mt-1.5">Get a fast response from our export team</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#00A86B]/20 border border-[#00A86B]/40 flex items-center justify-center shrink-0">
          <Send size={14} className="text-[#00A86B]" />
        </div>
      </div>

      <form onSubmit={onSubmit} className="px-5 py-5 flex flex-col gap-4">
        <GlassField icon={User} label="Full Name" name="name" value={form.name} onChange={onChange} required />
        <GlassField icon={Phone} label="Phone / WhatsApp" type="tel" name="phone" value={form.phone} onChange={onChange} required />

        <div className="grid grid-cols-2 gap-4">
          <GlassField icon={Building2} label="Company" name="company" value={form.company} onChange={onChange} />
          <GlassField icon={Globe2} label="Country" name="country" value={form.country} onChange={onChange} />
        </div>

        <GlassField icon={Package} label="Product Category" as="select" name="product" value={form.product} onChange={onChange} options={productCategories} />
        <GlassField icon={MessageSquare} label="Requirements" as="textarea" name="message" value={form.message} onChange={onChange} />

        <button
          type="submit"
          className="w-full mt-1 bg-[#00A86B] hover:bg-[#008f5a] text-white font-poppins font-semibold
            text-[13px] py-3 rounded-xl flex items-center justify-center gap-2
            transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00A86B]/30 group"
        >
          Send Enquiry
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <Link
          href="https://wa.me/919875939879" target="_blank"
          className="flex items-center justify-center gap-2 pt-3 border-t border-white/10
            text-white/50 text-[11px] font-inter hover:text-[#25D366] transition-colors duration-200"
        >
          <MessageCircle size={13} className="text-[#25D366]" />
          Or chat with us on WhatsApp
        </Link>
      </form>
    </div>
  );
};

/* ─── Main Hero ─────────────────────────────────────────── */
const Banner = () => {
  return (
    <section className="w-full bg-[#071B47] relative overflow-hidden">

      {/* ── Background image carousel ── */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="w-full h-full [filter:brightness(0.4)_saturate(0.65)]"
        >
          {bgImages.map((src, i) => (
            <SwiperSlide key={i}>
              <div
                className="w-full h-full bg-gradient-to-br from-[#0B3B91] to-[#040d20]"
                style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* darker, fixed overlay — never depends on how bright the source image is */}
        <div className="absolute inset-0 bg-[#040d20]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d20]/55 via-transparent to-[#040d20]/55" />
      </div>

      <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 pt-14 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">

          {/* ── Left: copy ── */}
          <div className="flex-1 min-w-0 w-full text-center lg:text-left">

            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-6 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-[#00A86B]/15 border border-[#00A86B]/35 rounded-full pl-1.5 pr-3.5 py-1.5">
                <div className="w-5 h-5 rounded-full bg-[#00A86B] flex items-center justify-center shrink-0">
                  <ShieldCheck size={10} className="text-white" />
                </div>
                <span className="font-poppins text-[#00A86B] text-[10px] font-semibold tracking-[0.16em] uppercase">
                  WHO-GMP Certified
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <span className="font-poppins text-white/55 text-[10px] font-semibold tracking-[0.1em] uppercase">
                  Made in India
                </span>
              </div>
            </div>

            <p className="font-poppins text-white/35 font-semibold tracking-[0.32em] uppercase mb-2 text-[12px] sm:text-sm">
              Manufacturing
            </p>
            <h1 className="font-poppins font-bold text-white leading-[1.05] text-[2.6rem] sm:text-[3.4rem] md:text-[3.9rem] xl:text-[4.4rem]">
              Healthcare With
            </h1>
            <h1 className="font-poppins font-bold text-[#00A86B] leading-[1.05] mb-5 text-[2.6rem] sm:text-[3.4rem] md:text-[3.9rem] xl:text-[4.4rem]">
              Precision.
            </h1>

            <p className="font-inter text-white/85 text-[15px] sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-2">
              WHO-GMP certified pharmaceutical manufacturer &amp; global export partner.
            </p>
            <p className="font-inter text-white/45 text-sm leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
              Delivering quality medicines across India and international markets with precision, compliance, and care.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-9">
              <Link href="/contact-us/#contact-form"
                className="inline-flex items-center gap-2 font-poppins font-semibold text-white bg-[#00A86B] rounded-xl
                  transition-all duration-300 hover:bg-[#008f5a] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00A86B]/30
                  text-sm px-6 py-3.5 w-full sm:w-auto justify-center">
                <Download size={15} />
                Request Product Catalogue
              </Link>
              <Link href="/contact-us/#contact-form"
                className="inline-flex items-center gap-2 font-poppins font-semibold text-white border-2 border-white/30 rounded-xl
                  transition-all duration-300 hover:bg-white hover:text-[#0B3B91] hover:border-white hover:-translate-y-0.5
                  text-sm px-6 py-3.5 w-full sm:w-auto justify-center">
                <Users size={15} />
                Become a Partner
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-6 border-t border-white/10">
              {trustItems.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#00A86B] shrink-0" />
                  <span className="font-inter text-white/50 text-[12px] whitespace-nowrap">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: glass enquiry form ── */}
          <div className="w-full max-w-[380px] shrink-0">
            <QuickEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;