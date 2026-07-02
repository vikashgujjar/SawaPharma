"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Star, Quote, Building2, Stethoscope, Globe2, Heart, ChevronLeft, ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TESTIMONIALS — CAROUSEL + CLIENT LOGOS
   TOKENS: White · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
───────────────────────────────────────────────────────── */

const categoryStyle = {
  distributor: { color: "#0B3B91", bg: "bg-[#0B3B91]/10", Icon: Building2 },
  hospital:    { color: "#00A86B", bg: "bg-[#00A86B]/10", Icon: Stethoscope },
  export:      { color: "#0B3B91", bg: "bg-[#0B3B91]/10", Icon: Globe2 },
  healthcare:  { color: "#00A86B", bg: "bg-[#00A86B]/10", Icon: Heart },
};

const filterCategories = [
  { key: "all",         label: "All",                 Icon: Star },
  { key: "distributor", label: "Distributors",        Icon: Building2 },
  { key: "hospital",    label: "Hospitals",           Icon: Stethoscope },
  { key: "export",      label: "Export Buyers",       Icon: Globe2 },
  { key: "healthcare",  label: "Healthcare Partners", Icon: Heart },
];

const testimonials = [
  {
    category: "distributor",
    quote: "Sawa Pharma's turnaround time and consistency in batch quality have made them our default manufacturing partner for three product lines now.",
    name: "Rakesh Malhotra", role: "Procurement Head", company: "Meridian Distributors",
    rating: 5, avatar: "/images/testimonials/rakesh-malhotra.jpg",
  },
  {
    category: "hospital",
    quote: "Every shipment arrives with complete documentation and passes our internal QC without exception. That reliability matters more than price to us.",
    name: "Dr. Anjali Rao", role: "Chief Pharmacist", company: "Sunrise Multispecialty Hospital",
    rating: 5, avatar: "/images/testimonials/anjali-rao.jpg",
  },
  {
    category: "export",
    quote: "Their export documentation is the cleanest we've worked with across Indian manufacturers — customs clearance has never been an issue.",
    name: "Yusuf Al-Amin", role: "Import Director", company: "Gulf Pharma Trading LLC",
    rating: 5, avatar: "/images/testimonials/yusuf-al-amin.jpg",
  },
  {
    category: "healthcare",
    quote: "We've partnered with Sawa Pharma on co-branded product lines for over two years — their marketing support team is genuinely responsive.",
    name: "Priya Nair", role: "Brand Manager", company: "Wellness Alliance Network",
    rating: 4, avatar: "/images/testimonials/priya-nair.jpg",
  },
  {
    category: "distributor",
    quote: "Scaling from 5 SKUs to 40+ with them was seamless. Their capacity planning kept pace with our growth without a single delay.",
    name: "Vikram Suri", role: "Managing Director", company: "Suri Pharma Distributors",
    rating: 5, avatar: "/images/testimonials/vikram-suri.jpg",
  },
  {
    category: "export",
    quote: "WHO-GMP certification meant our regulatory approval process in three new markets took weeks, not months.",
    name: "Chidi Okafor", role: "Regulatory Affairs Lead", company: "West Africa Health Supplies",
    rating: 5, avatar: "/images/testimonials/chidi-okafor.jpg",
  },
];

const clientLogos = [
  { name: "Meridian Distributors", color: "#0B3B91" },
  { name: "Sunrise Hospital",      color: "#00A86B" },
  { name: "Gulf Pharma Trading",   color: "#0B3B91" },
  { name: "Wellness Alliance",     color: "#00A86B" },
  { name: "Suri Distributors",     color: "#0B3B91" },
  { name: "West Africa Health",    color: "#00A86B" },
  { name: "Apex Healthcare",       color: "#0B3B91" },
  { name: "NovaCare Group",        color: "#00A86B" },
];

const StarRow = ({ count }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={13} className={i < count ? "text-[#00A86B] fill-[#00A86B]" : "text-gray-200 fill-gray-200"} />
    ))}
  </div>
);

const Avatar = ({ src, name, color }) => {
  const [broken, setBroken] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  if (broken || !src) {
    return (
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center font-poppins font-bold text-[13px] text-white shrink-0"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
    );
  }
  return (
    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: color }}>
      <Image src={src} alt={name} fill sizes="44px" className="object-cover" onError={() => setBroken(true)} />
    </div>
  );
};

const TestimonialCard = ({ category, quote, name, role, company, rating, avatar }) => {
  const style = categoryStyle[category];
  const CatIcon = style.Icon;
  return (
    <div className="relative bg-white rounded-2xl border border-[#0B3B91]/10 p-6 shadow-[0_10px_30px_rgba(11,59,145,0.06)] h-full flex flex-col">
      <div className={`absolute top-6 right-6 w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center`}>
        <CatIcon size={14} style={{ color: style.color }} />
      </div>
      <Quote size={22} style={{ color: style.color }} className="opacity-25 mb-3" />
      <StarRow count={rating} />
      <p className="font-inter text-gray-600 text-[13.5px] leading-relaxed mb-6 pr-8 flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <Avatar src={avatar} name={name} color={style.color} />
        <div>
          <p className="font-poppins font-semibold text-[#0B3B91] text-[13px] leading-tight">{name}</p>
          <p className="font-inter text-gray-400 text-[11.5px]">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const ClientLogo = ({ name, color }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md
          opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        style={{ backgroundColor: color }}
      >
        <span className="font-poppins font-bold text-white text-[13px] leading-none tracking-wide">
          {initials}
        </span>
      </div>
      <span className="font-inter text-[10px] text-gray-400 whitespace-nowrap max-w-[80px] text-center leading-tight">
        {name}
      </span>
    </div>
  );
};

const Testimonials = () => {
  const [filter, setFilter] = useState("all");
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const filtered = filter === "all" ? testimonials : testimonials.filter((t) => t.category === filter);

  return (
    <section className="w-full bg-[#EAF4FF]/30 py-16 sm:py-24">
      <style>{`
        .testimonial-swiper .swiper-pagination-bullet { background: #0B3B91; opacity: 0.2; }
        .testimonial-swiper .swiper-pagination-bullet-active { background: #00A86B; opacity: 1; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_28s_linear_infinite\\] { animation: none !important; }
        }
      `}</style>

      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
            Trusted By Partners Worldwide.
          </h2>
        </div>

        {/* filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterCategories.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-poppins font-medium
                transition-all duration-200 border
                ${filter === key
                  ? "bg-[#0B3B91] text-white border-[#0B3B91]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#0B3B91]/30"}`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* carousel */}
        <div className="relative max-w-6xl mx-auto mb-16 px-1">
          <Swiper
            key={filter}
            modules={[Autoplay, Navigation, Pagination]}
            navigation={{ prevEl, nextEl }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={filtered.length > 3}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-swiper !pb-12"
          >
            {filtered.map((t, i) => (
              <SwiperSlide key={i} className="h-auto pb-1">
                <TestimonialCard {...t} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={(node) => setPrevEl(node)}
            className="hidden sm:flex absolute -left-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full
              bg-white border border-[#0B3B91]/10 shadow-md items-center justify-center text-[#0B3B91]
              hover:bg-[#0B3B91] hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            className="hidden sm:flex absolute -right-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full
              bg-white border border-[#0B3B91]/10 shadow-md items-center justify-center text-[#0B3B91]
              hover:bg-[#0B3B91] hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* client logo marquee */}
        <div className="max-w-6xl mx-auto">
          <p className="text-center font-inter text-gray-400 text-[11px] uppercase tracking-[0.2em] mb-6">
            Trusted By
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-12 animate-[marquee_28s_linear_infinite] w-max">
              {[...clientLogos, ...clientLogos].map((c, i) => (
                <ClientLogo key={i} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
