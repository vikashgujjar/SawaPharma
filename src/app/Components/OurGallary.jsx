"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { baseLink, storageLink } from "../config/Apilink";
import { Plus } from "lucide-react";
import Lightbox from "./Lightbox";

/* ─────────────────────────────────────────────────────────
   GALLERY — DARK THEME
   Same categorized filter + working lightbox as the light
   version, rebuilt on the deep navy palette.

   TOKENS: Deep Navy #040d20 (base) · Navy #0B3B91 · Green #00A86B · Ice Blue #EAF4FF
   Display: Poppins · Body: Inter

   NOTE: assumes each gallery item from the API includes a
   `category` field matching one of the keys below. If the
   backend doesn't send that yet, everything just falls under
   "All" until it does — nothing breaks.
───────────────────────────────────────────────────────── */

const categories = [
  { key: "all",        label: "All" },
  { key: "factory",    label: "Factory" },
  { key: "laboratory", label: "Laboratory" },
  { key: "packaging",  label: "Packaging" },
  { key: "warehouse",  label: "Warehouse" },
  { key: "team",       label: "Team" },
  { key: "events",     label: "Events" },
  { key: "export",     label: "Export" },
];

const GalleryDark = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/gallery`);
        if (!response.ok) throw new Error("Failed to fetch gallery items");
        const data = await response.json();
        if (!cancelled) setGalleryItems(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = filter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const showNext = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  return (
    <section className="w-full bg-[#040d20] py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-[#0B3B91]/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-[6%] w-1/3 h-1/2 bg-[#00A86B]/8 blur-[100px] pointer-events-none" />

      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            Gallery
          </p>
          <h2 className="font-poppins font-bold text-white leading-tight text-[1.9rem] sm:text-[2.4rem]">
            A Look Inside Sawa Pharma.
          </h2>
        </div>

        {/* filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-poppins font-medium transition-all duration-200 border
                ${filter === key
                  ? "bg-[#00A86B] text-white border-[#00A86B]"
                  : "bg-white/5 text-white/50 border-white/10 hover:border-[#00A86B]/40 hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-center font-inter text-red-400 text-sm py-8">
            Couldn't load the gallery right now — please try again shortly.
          </p>
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[280px] rounded-xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center font-inter text-white/40 text-sm py-12">
            No photos in this category yet.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <button
                key={item.id ?? i}
                onClick={() => openLightbox(i)}
                className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer text-left border border-white/10"
              >
                <Image
                  src={`${storageLink}/${item.image}`}
                  alt={item.title || `Sawa Pharma gallery photo ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#040d20]/20 group-hover:bg-[#040d20]/55 transition-colors duration-300" />
                <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/0 group-hover:bg-[#00A86B]
                  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Plus size={16} className="text-white" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          items={filtered}
          storageLink={storageLink}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
          onJump={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default GalleryDark;