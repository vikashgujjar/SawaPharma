"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { baseLink, storageLink } from "../config/Apilink";

/* ─────────────────────────────────────────────────────────
   SERVICE DETAILS — DARK STACKED CARDS
   Each item is a sticky card that stacks on top of the previous
   one as you scroll — the classic "cards piling up" scroll
   effect, done in pure CSS (position: sticky + increasing
   top-offset + z-index), no scroll-JS needed. Distinct from the
   plain alternating light block this replaces.

   ⚠️ dangerouslySetInnerHTML: renders raw HTML from the `abouts`
   API (item.parag2), unescaped. Safe only if that field is
   CMS-admin-only. If untrusted input can reach it, sanitize with
   DOMPurify (`npm i dompurify`) before setting it.

   TOKENS: Deep Navy #040d20 (base) · Navy #0B3B91 · Green #00A86B · Ice Blue #EAF4FF
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

const formatParag2 = (html) => {
  if (!html || typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const h2 = doc.querySelector("h2");
  if (h2) h2.classList.add("font-poppins", "font-semibold", "text-white", "text-lg", "lg:text-2xl", "mt-6", "mb-3");
  const p = doc.querySelector("p");
  if (p) p.classList.add("font-inter", "text-white/55", "text-[14px]", "leading-relaxed");
  return doc.body.innerHTML;
};

const ServiceDetailsDark = () => {
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/abouts`);
        if (!response.ok) throw new Error("Failed to fetch section data");
        const data = await response.json();
        if (!cancelled) setSectionData(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading || error || sectionData.length === 0) return null;

  return (
    <section className="w-full bg-[#040d20] py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-[#0B3B91]/20 blur-[130px] pointer-events-none" />

      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            Road Ahead
          </p>
          <h2 className="font-poppins font-bold text-white leading-tight text-[1.9rem] sm:text-[2.4rem]">
            Where We're Headed Next.
          </h2>
        </div>
      </div>

      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mt-14 flex flex-col gap-6">
        {sectionData.map((item, i) => (
          <div
            key={item.id}
            className="sticky"
            style={{ top: `${96 + i * 24}px`, zIndex: i + 1 }}
          >
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B3B91] to-[#071B47]
              border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="grid lg:grid-cols-2">

                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <span className="font-mono text-[#00A86B] text-[11px] tracking-wider mb-3">
                    {String(i + 1).padStart(2, "0")} / {String(sectionData.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-poppins font-bold text-white text-[1.6rem] md:text-[1.9rem] leading-tight mb-4">
                    {item.i_heading}
                  </h3>
                  <p className="font-inter text-white/60 text-[14px] leading-relaxed">
                    {item.parag}
                  </p>
                  <div
                    className="mt-2 [&_h2]:text-white [&_p]:text-white/55"
                    dangerouslySetInnerHTML={{ __html: formatParag2(item.parag2) }}
                  />
                </div>

                <div className="relative h-[260px] lg:h-auto order-1 lg:order-2">
                  <Image
                    src={`${storageLink}/${item.img}`}
                    alt={item.i_heading}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040d20]/50 via-transparent to-transparent lg:bg-gradient-to-l" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* spacer so the last sticky card can fully settle before the section ends */}
        <div className="h-4" />
      </div>
    </section>
  );
};

export default ServiceDetailsDark;