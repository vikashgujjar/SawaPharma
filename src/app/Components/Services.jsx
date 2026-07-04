"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { baseLink, storageLink } from "../config/Apilink";

/* TEMPORARY: the CMS-uploaded images for this section are heavily
   compressed (5-6KB source files) and render blurry regardless of
   display size. Overriding with high-resolution stock photos, keyed
   by each service's real `link` field, until proper photography is
   uploaded through the admin panel. Remove this override (and go back
   to `${storageLink}/${s.image}`) once that's done. */
const STOCK_IMAGE_BY_LINK = {
  injectables: "https://images.unsplash.com/photo-1670098073774-440ea94549d0?q=85&w=1400&auto=format&fit=crop",
  tablets: "https://images.unsplash.com/photo-1573883430697-4c3479aae6b9?q=85&w=1400&auto=format&fit=crop",
  "liquid-injection": "https://images.unsplash.com/photo-1611690828749-66c846dbd1b4?q=85&w=1400&auto=format&fit=crop",
  "dry-injection": "https://images.unsplash.com/photo-1618015359994-a67bd07e48b5?q=85&w=1400&auto=format&fit=crop",
  capsules: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=85&w=1400&auto=format&fit=crop",
  syrup: "https://images.unsplash.com/photo-1635166304271-04931640a450?q=85&w=1400&auto=format&fit=crop",
};
const FALLBACK_SERVICE_IMAGE = "https://images.unsplash.com/photo-1748000970909-845f4aa144d2?q=85&w=1400&auto=format&fit=crop";

const ServicesGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/service`);
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        if (!cancelled) setServices(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
            What Facilities We Provide.
          </h2>
        </div>

        {error && (
          <p className="text-center font-inter text-red-500 text-sm py-8">
            Couldn't load services right now — please try again shortly.
          </p>
        )}

        {loading && !error && (
          <div className="flex gap-2 max-w-6xl mx-auto h-[420px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 rounded-2xl bg-[#EAF4FF] animate-pulse" />
            ))}
          </div>
        )}

        {/* ── Desktop: fanned panel row ── */}
        {!loading && !error && services.length > 0 && (
          <div className="hidden lg:flex gap-2.5 max-w-6xl mx-auto h-[440px]">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="relative rounded-2xl overflow-hidden text-left transition-[flex-grow] duration-500 ease-in-out"
                  style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, minWidth: isActive ? 0 : 64 }}
                >
                  <Image
                    src={STOCK_IMAGE_BY_LINK[s.link] || FALLBACK_SERVICE_IMAGE}
                    alt={s.title || "Sawa Pharma service"}
                    fill
                    sizes="(max-width: 1280px) 50vw, 20vw"
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500
                      ${isActive
                        ? "bg-gradient-to-t from-[#040d20]/90 via-[#040d20]/25 to-[#040d20]/10"
                        : "bg-[#040d20]/55 hover:bg-[#040d20]/35"}`}
                  />

                  {/* number badge, always visible */}
                  <span className="absolute top-4 left-4 font-mono text-[#00A86B] text-[11px] tracking-wider z-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* expanded content */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-300
                      ${isActive ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-3 pointer-events-none"}`}
                  >
                    <h3 className="font-poppins font-bold text-white text-[1.5rem] xl:text-[1.7rem] leading-tight mb-2 max-w-md">
                      {s.title}
                    </h3>
                    <p className="font-inter text-white/65 text-[13px] leading-relaxed max-w-sm mb-4 line-clamp-2">
                      {s.text}
                    </p>
                    <Link
                      href={`/${s.link}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-poppins font-semibold text-white text-[12.5px]
                        bg-[#00A86B] rounded-lg px-4 py-2 hover:bg-[#008f5a] hover:gap-2.5 transition-all duration-200"
                    >
                      Read More <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  {/* collapsed label — vertical text */}
                  <div
                    className={`absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-300
                      ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                  >
                    <span
                      className="font-poppins font-semibold text-white text-[12.5px] whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Mobile / tablet: simple stacked cards (fanning doesn't translate to touch) ── */}
        {!loading && !error && services.length > 0 && (
          <div className="lg:hidden flex flex-col gap-4 max-w-xl mx-auto">
            {services.map((s, i) => (
              <div key={s.id} className="relative h-56 rounded-2xl overflow-hidden">
                <Image
                  src={STOCK_IMAGE_BY_LINK[s.link] || FALLBACK_SERVICE_IMAGE}
                  alt={s.title || "Sawa Pharma service"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040d20]/90 via-[#040d20]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[#00A86B] text-[10.5px] tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-poppins font-bold text-white text-[1.2rem] leading-tight mt-1 mb-1.5">
                    {s.title}
                  </h3>
                  <p className="font-inter text-white/65 text-[12.5px] leading-relaxed mb-3 line-clamp-2">
                    {s.text}
                  </p>
                  <Link
                    href={`/${s.link}`}
                    className="inline-flex items-center gap-1.5 font-poppins font-semibold text-white text-[12px]
                      bg-[#00A86B] rounded-lg px-3.5 py-1.5"
                  >
                    Read More <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;