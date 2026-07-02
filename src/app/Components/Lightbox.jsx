"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ items, storageLink, activeIndex, onClose, onPrev, onNext, onJump }) => {
  const item = items[activeIndex];
  const touchStartX = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  const src = `${storageLink}/${item.image}`;

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) onPrev();
    if (delta < -50) onNext();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-3 sm:px-6"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* blurred backdrop built from the current image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src={src} alt="" fill className="object-cover scale-110 blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-[#040d20]/90" />
      </div>

      {/* top bar */}
      <div
        className="relative z-10 w-full max-w-5xl flex items-center justify-between px-1 pb-4 sm:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          {item.category && (
            <span className="font-poppins text-[#00A86B] text-[10px] font-semibold tracking-[0.14em] uppercase
              bg-[#00A86B]/12 border border-[#00A86B]/30 rounded-full px-3 py-1">
              {item.category}
            </span>
          )}
          <span className="font-inter text-white/40 text-[12px]">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* main image */}
      <div className="relative z-10 w-full max-w-5xl flex items-center gap-3 sm:gap-5">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
            items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          key={activeIndex}
          className="relative flex-1 aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]
            animate-[fadeIn_0.35s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src={src} alt={item.title || "Sawa Pharma gallery photo"} fill sizes="80vw" className="object-cover bg-[#040d20]" />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
            items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {item.title && (
        <p className="relative z-10 font-inter text-white/70 text-[13px] mt-4 text-center max-w-lg">
          {item.title}
        </p>
      )}

      {/* filmstrip */}
      <div
        className="relative z-10 w-full max-w-5xl mt-6 overflow-x-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2.5 justify-start sm:justify-center px-1 pb-1 w-max mx-auto">
          {items.map((it, i) => (
            <button
              key={it.id ?? i}
              onClick={() => onJump(i)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 transition-all duration-200
                ${i === activeIndex ? "ring-2 ring-[#00A86B] opacity-100" : "opacity-40 hover:opacity-70"}`}
            >
              <Image src={`${storageLink}/${it.image}`} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* mobile nav — swipe hint + tap zones */}
      <div className="sm:hidden absolute inset-y-0 left-0 w-1/4" onClick={(e) => { e.stopPropagation(); onPrev(); }} />
      <div className="sm:hidden absolute inset-y-0 right-0 w-1/4" onClick={(e) => { e.stopPropagation(); onNext(); }} />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Lightbox;