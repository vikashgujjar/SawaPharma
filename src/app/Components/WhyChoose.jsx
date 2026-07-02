"use client";
import React from "react";
import {
  ShieldCheck, Globe2, Factory, Package, Zap, CheckCircle2, Megaphone, Users,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   WHY CHOOSE US — BLISTER PACK POP-OUT GRID
   The most recognizable pharma object there is: a blister pack.
   Each reason sits in its own foil pocket — dashed perforation
   border, subtle foil sheen — and "pops" up on hover like a
   tablet being pressed out, instead of just lifting like a
   generic card.

   TOKENS: White (base) · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

const reasons = [
  { Icon: ShieldCheck, title: "WHO-GMP Certified",     text: "Every facility audited and certified to global manufacturing standards." },
  { Icon: Globe2,       title: "Export Ready",          text: "Documentation and compliance built for international shipping from day one." },
  { Icon: Factory,      title: "Advanced Manufacturing", text: "Modern, automated production lines with real-time quality monitoring." },
  { Icon: Package,      title: "500+ Products",          text: "A catalogue spanning tablets, capsules, injectables, and syrups." },
  { Icon: Zap,          title: "Fast Turnaround",        text: "Streamlined production planning that keeps your timelines on track." },
  { Icon: CheckCircle2, title: "Quality Tested",         text: "Multi-stage testing at every checkpoint, not just before dispatch." },
  { Icon: Megaphone,    title: "Marketing Support",      text: "Co-branded materials and launch support for our distribution partners." },
  { Icon: Users,        title: "Experienced Team",       text: "Decades of combined expertise across the pharmaceutical value chain." },
];

const BlisterCard = ({ Icon, title, text }) => (
  <div className="group relative">
    {/* foil pocket */}
    <div
      className="relative bg-[#EAF4FF]/50 rounded-[28px] p-6 border-2 border-dashed border-[#0B3B91]/15
        transition-all duration-300 group-hover:border-[#00A86B]/40 group-hover:bg-white
        group-hover:shadow-[0_25px_50px_rgba(11,59,145,0.15)] group-hover:-translate-y-2"
    >
      {/* pop indicator dot */}
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#0B3B91]/15 group-hover:bg-[#00A86B] transition-colors duration-300" />

      <div
        className="w-12 h-12 rounded-2xl bg-white border border-[#0B3B91]/10 flex items-center justify-center mb-4
          shadow-[0_6px_16px_rgba(11,59,145,0.08)] transition-all duration-300
          group-hover:bg-[#00A86B] group-hover:border-[#00A86B] group-hover:scale-110 group-hover:rotate-3"
      >
        <Icon size={20} className="text-[#0B3B91] transition-colors duration-300 group-hover:text-white" />
      </div>

      <h3 className="font-poppins font-semibold text-[#0B3B91] text-[14.5px] mb-2 leading-snug">
        {title}
      </h3>
      <p className="font-inter text-gray-500 text-[12px] leading-relaxed">
        {text}
      </p>
    </div>

    {/* foil shadow peeking from behind — sells the "popped out of the pack" effect */}
    <div
      className="absolute inset-x-3 -bottom-1.5 h-4 rounded-[24px] bg-[#0B3B91]/[0.04] -z-10
        transition-opacity duration-300 opacity-0 group-hover:opacity-100"
    />
  </div>
);

const WhyChooseUs = () => (
  <section className="w-full bg-white py-16 sm:py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#EAF4FF_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

    <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem] md:text-[2.7rem]">
          Eight Reasons Partners Stay With Us.
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
        {reasons.map((r, i) => (
          <BlisterCard key={i} {...r} />
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;