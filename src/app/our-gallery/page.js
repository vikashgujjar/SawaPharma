"use client";
import React, { useState } from "react";
import Image from "next/image";
import Breadcrumb from "../Components/Breadcrumb";
import Lightbox from "../Components/Lightbox";
import { Plus } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   OUR GALLERY (static page)
   Same treatment as the homepage Gallery section: rounded cards
   with a hover overlay, and a real working lightbox on click —
   reuses the shared Lightbox component instead of duplicating
   modal logic here.

   Bugs fixed from the original:
   - Plain <img> tags → next/image (lazy loading, sizing,
     optimization — the original had no loading strategy at all).
   - No click behavior whatsoever — images were just static,
     nothing happened on click. Now opens the shared lightbox
     with prev/next navigation.
   - Generic alt text kept per-index since there's no CMS title
     data for these static files; still descriptive enough for
     screen readers.

   TOKENS: White (base) · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

const imageUrls = [
  "/images/gallery/1.webp", "/images/gallery/2.webp", "/images/gallery/3.webp",
  "/images/gallery/5.webp", "/images/gallery/6.webp", "/images/gallery/8.webp",
  "/images/gallery/9.webp", "/images/gallery/10.webp", "/images/gallery/11.webp",
  "/images/gallery/12.webp", "/images/gallery/13.webp", "/images/gallery/14.webp",
  "/images/gallery/15.webp", "/images/gallery/16.webp", "/images/gallery/17.webp",
  "/images/gallery/19.webp", "/images/gallery/7.webp", "/images/gallery/18.webp",
  "/images/gallery/20.webp", "/images/gallery/4.webp",
];

/* Grid uses the real local path (needs the leading slash to resolve).
   Lightbox builds src as `${storageLink}/${item.image}` — with an empty
   storageLink, that pattern needs `image` WITHOUT a leading slash, or the
   concatenation produces "//images/..." (an invalid, protocol-relative
   URL that silently fails to load). So Lightbox gets its own stripped copy. */
const galleryItems = imageUrls.map((src, i) => ({
  id: i,
  image: src,
  title: `Sawa Pharma gallery photo ${i + 1}`,
}));

const lightboxItems = galleryItems.map((item) => ({
  ...item,
  image: item.image.replace(/^\//, ""),
}));

const Page = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <Breadcrumb image="https://images.unsplash.com/photo-1748000970909-845f4aa144d2?q=85&w=2400&auto=format&fit=crop" />

      <section className="w-full bg-white py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
              Gallery
            </p>
            <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
              A Look Inside Sawa Pharma.
            </h2>
          </div>

          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 sm:gap-5 [column-fill:_balance]">
            {galleryItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setLightboxIndex(i)}
                className="relative block w-full mb-4 sm:mb-5 rounded-xl overflow-hidden group cursor-pointer break-inside-avoid"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={i % 3 === 0 ? 680 : i % 3 === 1 ? 500 : 400}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#040d20]/0 group-hover:bg-[#040d20]/40 transition-colors duration-300" />
                <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/0 group-hover:bg-[#00A86B]
                  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Plus size={14} className="text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          storageLink=""
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % lightboxItems.length)}
          onJump={setLightboxIndex}
        />
      )}
    </>
  );
};

export default Page;