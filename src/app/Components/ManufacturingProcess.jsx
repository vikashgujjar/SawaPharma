"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FlaskConical, Beaker, ShieldCheck, Factory, Package, Truck } from "lucide-react";

const stages = [
  {
    n: "01",
    Icon: FlaskConical,
    title: "Research",
    text: "Identifying formulations and precursor materials that meet global regulatory benchmarks.",
    img: "https://images.unsplash.com/photo-1745420052756-1b1c294a6420?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "02",
    Icon: Beaker,
    title: "Formulation",
    text: "Precision-blending active ingredients under controlled, sterile cleanroom conditions.",
    img: "https://images.unsplash.com/photo-1748349221526-33b51820b21e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "03",
    Icon: ShieldCheck,
    title: "Quality Testing",
    text: "Every batch checked against WHO-GMP standards before it's cleared to move forward.",
    img: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "04",
    Icon: Factory,
    title: "Production",
    text: "Full-scale manufacturing on GMP-certified lines, monitored at every step.",
    img: "https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "05",
    Icon: Package,
    title: "Packaging",
    text: "Tamper-evident, export-ready packaging that protects potency from plant to pharmacy.",
    img: "https://images.unsplash.com/photo-1607398027609-fbd1a06fb5d4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "06",
    Icon: Truck,
    title: "Distribution",
    text: "Warehousing and global logistics that get every batch where it's needed, on time.",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1600&auto=format&fit=crop",
  },
];

const StagePanel = ({ n, Icon, title, text, img, align, onVisible, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onVisible(index);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <div ref={ref} className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
      <Image
        src={img}
        alt={title}
        fill
        sizes="100vw"
        className={`object-cover transition-transform duration-[1400ms] ease-out ${visible ? "scale-100" : "scale-110"}`}
      />
      {/* light wash instead of dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/40" />
      <div className="absolute inset-0 bg-[#0B3B91]/[0.06] mix-blend-multiply" />

      {/* ghost numeral */}
      <span
        className={`absolute top-4 sm:top-8 ${align === "right" ? "right-4 sm:right-8" : "left-4 sm:left-8"}
          font-poppins font-bold text-[6rem] sm:text-[9rem] leading-none text-[#0B3B91]/[0.07] select-none pointer-events-none`}
      >
        {n}
      </span>

      <div
        className={`relative z-10 h-full flex flex-col justify-end px-6 sm:px-12 lg:px-20 pb-10 sm:pb-14
          transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
      >
        <div className={`flex items-center gap-2.5 mb-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
          <div className="w-9 h-9 rounded-lg bg-[#00A86B]/12 border border-[#00A86B]/35 flex items-center justify-center">
            <Icon size={16} className="text-[#00A86B]" />
          </div>
          <span className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Stage {n}
          </span>
        </div>
        <h3 className="font-poppins font-bold text-[#0B3B91] text-[2rem] sm:text-[2.8rem] leading-none mb-3">
          {title}
        </h3>
        <p className="font-inter text-gray-600 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
          {text}
        </p>
      </div>
    </div>
  );
};

const ManufacturingProcessLight = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-white relative">
      <div className="text-center max-w-2xl mx-auto pt-16 sm:pt-20 pb-12 px-4">
        <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
          Manufacturing Process
        </p>
        <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem] md:text-[2.7rem]">
          From Research To Your Doorstep.
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        {stages.map((s, i) => (
          <StagePanel
            key={i}
            {...s}
            index={i}
            align={i % 2 === 0 ? "left" : "right"}
            onVisible={setActive}
          />
        ))}
      </div>
    </section>
  );
};

export default ManufacturingProcessLight;