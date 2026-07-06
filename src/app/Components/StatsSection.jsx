"use client";
import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
   TOKENS
   Navy #0B3B91 · Green #00A86B · Ice Blue #EAF4FF
   Display: Poppins · Body: Inter

   SIGNATURE: stats laid out as a molecular chain — the zigzag
   bond-line skeletal formula pharma chemists actually draw.
   Each stat sits in a hexagon "atom," bonds connect them in
   sequence, and the whole chain draws itself in as you scroll.
   Five items, zigzag high/low, exactly like a skeletal formula.
───────────────────────────────────────────────────────── */

const metrics = [
  { value: 25,  suffix: "+", label: "Years Combined\nExperience" },
  { value: 500, suffix: "+", label: "Products\nManufactured" },
  { value: 100, suffix: "+", label: "Business\nPartners" },
  { value: 25,  suffix: "+", label: "States\nServed" },
  { value: 10,  suffix: "+", label: "Countries\nExported" },
];

/* x/y are percentages within a 0–100 coordinate space that both
   the SVG bond-lines and the hexagon nodes share, so they always
   line up regardless of container size. */
const desktopPoints = [
  { x: 6,  y: 62 },
  { x: 27, y: 18 },
  { x: 50, y: 62 },
  { x: 73, y: 18 },
  { x: 94, y: 62 },
];

const useCountUp = (target, active, duration = 1500) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
};

/* ─── Hexagon "atom" node ─── */
const AtomNode = ({ value, suffix, label, active, delay }) => {
  const count = useCountUp(value, active);
  return (
    <div
      className="flex flex-col items-center opacity-0 animate-[popIn_0.55s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
      style={{ animationDelay: active ? `${delay}ms` : "9999s" }}
    >
      <div
        className="relative w-[86px] h-[96px] sm:w-[100px] sm:h-[112px] flex items-center justify-center
          bg-gradient-to-b from-[#0B3B91] to-[#071B47] shadow-[0_12px_28px_rgba(11,59,145,0.28)]"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        <div
          className="absolute inset-[3px] flex flex-col items-center justify-center gap-0.5
            bg-gradient-to-b from-[#0B3B91] to-[#071B47]"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          <p className="notranslate font-poppins font-bold text-white leading-none text-xl sm:text-2xl" translate="no">
            {count}{suffix}
          </p>
          <span className="w-4 h-[2px] rounded-full bg-[#00A86B]" />
        </div>
      </div>
      <p className="font-inter text-gray-500 text-[11px] sm:text-[12px] text-center leading-snug mt-3 max-w-[100px] whitespace-pre-line">
        {label}
      </p>
    </div>
  );
};

/* separate so the hook order stays valid inside the mobile map */
const MobileCount = ({ value, suffix, active }) => {
  const count = useCountUp(value, active);
  return (
    <p className="notranslate font-poppins font-bold text-white leading-none text-xl" translate="no">
      {count}{suffix}
    </p>
  );
};

/* ─── Statistics Section ────────────────────────────────── */
const StatsSection = () => {
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pathD = `M ${desktopPoints.map((p) => `${p.x} ${p.y}`).join(" L ")}`;

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 sm:py-20 relative overflow-hidden">
      <style>{`
        @keyframes popIn { from { opacity: 0; transform: scale(0.6) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[popIn_0\\.55s_cubic-bezier\\(0\\.34\\,1\\.56\\,0\\.64\\,1\\)_forwards\\] { animation: none !important; opacity: 1 !important; transform: none !important; }
          .bond-path { stroke-dashoffset: 0 !important; }
        }
      `}</style>

      {/* faint hex-dot texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#EAF4FF_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

        {/* heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            By The Numbers
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem] md:text-[2.7rem]">
            Every Number Is A<br className="hidden sm:block" /> Batch We Stand Behind.
          </h2>
        </div>

        {/* ── Desktop: molecular zigzag chain ── */}
        <div className="hidden md:block relative h-[240px] max-w-5xl mx-auto">
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={pathD}
              fill="none"
              stroke="#EAF4FF"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="bond-path"
              d={pathD}
              fill="none"
              stroke="#00A86B"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="200"
              strokeDashoffset={active ? 0 : 200}
              style={{ transition: "stroke-dashoffset 1.8s ease-out" }}
            />
          </svg>

          {desktopPoints.map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <AtomNode {...metrics[i]} active={active} delay={i * 180} />
            </div>
          ))}
        </div>

        {/* ── Mobile: vertical bond chain ── */}
        <div className="md:hidden relative max-w-xs mx-auto">
          <div className="absolute left-[43px] top-3 bottom-3 w-[2px] bg-[#EAF4FF] overflow-hidden" aria-hidden="true">
            <div
              className="w-full bg-[#00A86B] transition-all duration-[1600ms] ease-out"
              style={{ height: active ? "100%" : "0%" }}
            />
          </div>
          <div className="flex flex-col gap-8">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="relative flex items-center gap-5 opacity-0 animate-[popIn_0.55s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                style={{ animationDelay: active ? `${i * 150}ms` : "9999s" }}
              >
                <div
                  className="relative z-10 w-[86px] h-[76px] shrink-0 flex items-center justify-center
                    bg-gradient-to-b from-[#0B3B91] to-[#071B47] shadow-[0_10px_24px_rgba(11,59,145,0.28)]"
                  style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
                >
                  <MobileCount value={m.value} suffix={m.suffix} active={active} />
                </div>
                <p className="font-inter text-gray-500 text-[13px] leading-snug whitespace-pre-line">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;