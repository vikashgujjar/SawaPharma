"use client";
import React, { useState } from "react";
import { Plus, HelpCircle, Factory, Globe2, Handshake } from "lucide-react";

const categories = [
  { key: "all",          label: "All",          Icon: HelpCircle },
  { key: "general",      label: "General",      Icon: HelpCircle },
  { key: "manufacturing",label: "Manufacturing",Icon: Factory },
  { key: "export",       label: "Export",       Icon: Globe2 },
  { key: "partnership",  label: "Partnership",  Icon: Handshake },
];

const faqs = [
  {
    category: "general",
    q: "What makes Sawa Pharma WHO-GMP certified different from other manufacturers?",
    a: "Our facilities undergo regular WHO-GMP audits covering everything from raw material sourcing to finished-product release testing — it's a continuous standard we maintain, not a one-time certificate on the wall.",
  },
  {
    category: "manufacturing",
    q: "What dosage forms can you manufacture?",
    a: "We manufacture the full range — tablets, capsules, liquid injections, dry injections, and syrups — across 500+ products, with in-house and contract-partner capacity depending on the project.",
  },
  {
    category: "manufacturing",
    q: "How long does a typical production run take?",
    a: "Turnaround depends on dosage form and order volume, but our streamlined production planning is built to keep committed timelines — we'll give you a concrete schedule before the order is confirmed.",
  },
  {
    category: "export",
    q: "Which countries do you currently export to?",
    a: "We currently export to 10+ countries across the Middle East, Africa, and Southeast Asia, with export-ready documentation and regulatory support built into every shipment.",
  },
  {
    category: "export",
    q: "Do you handle regulatory documentation for import approval?",
    a: "Yes — our regulatory affairs team prepares the documentation your local authorities require, which is one of the reasons partner approval timelines tend to move faster with us.",
  },
  {
    category: "partnership",
    q: "How do I become a distribution partner?",
    a: "Start with the \"Become a Partner\" form on this site or reach out directly — our business development team will walk you through product fit, MOQs, and onboarding.",
  },
  {
    category: "partnership",
    q: "Do you offer marketing or branding support to partners?",
    a: "Yes, we provide co-branded marketing materials and launch support for distribution and healthcare partners as part of our standard partnership package.",
  },
  {
    category: "general",
    q: "Can I request product samples before placing an order?",
    a: "Absolutely — request samples through our Quick Enquiry form or Request Catalogue button, and our team will coordinate sample shipment based on your product interest.",
  },
];

const FAQItem = ({ n, q, a, isOpen, onToggle }) => (
  <div className="group">
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-4 text-left"
    >
      {/* capsule cap */}
      <div
        className={`relative shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
          ${isOpen ? "bg-[#00A86B] rotate-45" : "bg-[#0B3B91]"}`}
      >
        <Plus size={16} className="text-white" />
      </div>

      {/* capsule body */}
      <div
        className={`flex-1 flex items-center justify-between gap-3 rounded-full px-5 py-3.5 transition-all duration-300 border
          ${isOpen
            ? "bg-[#00A86B]/8 border-[#00A86B]/30"
            : "bg-[#EAF4FF]/50 border-[#0B3B91]/8 hover:border-[#0B3B91]/20"}`}
      >
        <span className="font-poppins font-semibold text-[#0B3B91] text-[13.5px] sm:text-[14.5px] leading-snug">
          {q}
        </span>
        <span className="font-mono text-[#0B3B91]/25 text-[10px] shrink-0 hidden sm:block">{n}</span>
      </div>
    </button>

    {/* answer — grid-rows trick for smooth height animation */}
    <div
      className="grid transition-all duration-300 ease-out"
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <p className="font-inter text-gray-500 text-[13px] leading-relaxed pl-[68px] pr-5 pt-3 pb-5">
          {a}
        </p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = filter === "all" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <section className="w-full bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#EAF4FF_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            FAQ
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
            Questions, Answered.
          </h2>
        </div>

        {/* category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => { setFilter(key); setOpenIndex(0); }}
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

        {/* capsule accordion */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {filtered.map((f, i) => (
            <FAQItem
              key={f.q}
              n={String(i + 1).padStart(2, "0")}
              q={f.q}
              a={f.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;