"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";
import { MapPin, Navigation, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   OUR PRESENCE — STICKY MAP + LOCATION LIST
   The map-and-list pattern real-estate and directory sites use:
   a large map stays pinned on one side while a scrollable list
   of locations sits on the other — clicking a location updates
   the pinned map. Different from a flat grid of maps, and it
   scales cleanly whether there are 2 locations or 20.

   Same bug fixes carried over from the previous pass:
   - `text-steelblue` isn't a real Tailwind color → brand navy
   - grid was hardcoded to a single column → now responsive
   - only one loading skeleton regardless of location count

   ⚠️ `location.lang` looks like it should be `lng` (longitude) —
   kept as-is in case that's really how the API names it, but
   worth confirming with the backend.

   TOKENS: White (base) · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

const locationPhotos = [
  "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1748349221526-33b51820b21e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=400&auto=format&fit=crop",
];

const Page = () => {
  const [locations, setLocations] = useState([]);
  const [header, setHeader] = useState("Our Locations");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/layout`);
        if (!response.ok) throw new Error("Failed to fetch locations");
        const result = await response.json();
        if (!cancelled && result?.location?.length > 0) {
          setLocations(result.location);
          setHeader(result.location[0].header || "Our Locations");
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const activeLocation = locations[active];
  const hasCoords = activeLocation?.lat && activeLocation?.lang;

  return (
    <>
      <Breadcrumb />

      <section className="w-full bg-white py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
              Where To Find Us
            </p>
            <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
              {header}
            </h2>
          </div>

          {error && (
            <p className="text-center font-inter text-red-500 text-sm py-8">
              Couldn't load location data right now — please try again shortly.
            </p>
          )}

          {loading && !error && (
            <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-6xl mx-auto">
              <div className="h-[480px] rounded-2xl bg-[#EAF4FF] animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-xl bg-[#EAF4FF] animate-pulse" />
                ))}
              </div>
            </div>
          )}

          {!loading && !error && locations.length === 0 && (
            <p className="text-center font-inter text-gray-400 text-sm py-12">
              No locations available right now.
            </p>
          )}

          {!loading && !error && locations.length > 0 && (
            <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-6xl mx-auto">

              {/* ── Sticky map ── */}
              <div className="lg:sticky lg:top-28 lg:self-start rounded-2xl overflow-hidden border border-[#0B3B91]/8 shadow-[0_15px_40px_rgba(11,59,145,0.08)]">
                <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-[#0B3B91]" />
                    </div>
                    <h3 className="font-poppins font-semibold text-[#0B3B91] text-[14.5px] truncate">
                      {activeLocation.header || `Location ${active + 1}`}
                    </h3>
                  </div>
                  {hasCoords && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.lat},${activeLocation.lang}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-poppins font-medium text-[#00A86B] text-[12px] hover:gap-2 transition-all shrink-0"
                    >
                      <Navigation size={13} /> Directions
                    </a>
                  )}
                </div>

                {hasCoords ? (
                  <iframe
                    key={active}
                    src={`https://maps.google.com/maps?q=${activeLocation.lat},${activeLocation.lang}&z=15&output=embed`}
                    className="border-0 w-full h-[420px] lg:h-[480px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={activeLocation.header || `Location ${active + 1}`}
                  />
                ) : (
                  <div className="h-[420px] lg:h-[480px] flex items-center justify-center bg-[#EAF4FF]/40">
                    <p className="font-inter text-gray-400 text-[13px]">Map coordinates not available</p>
                  </div>
                )}
              </div>

              {/* ── Scrolling location list ── */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-none">
                {locations.map((loc, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`group flex items-center gap-3 text-left rounded-xl p-3.5 shrink-0 w-[240px] lg:w-full
                        border transition-all duration-300
                        ${isActive ? "bg-[#0B3B91] border-[#0B3B91]" : "bg-[#EAF4FF]/40 border-transparent hover:border-[#0B3B91]/15"}`}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={locationPhotos[i % locationPhotos.length]} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-poppins font-semibold text-[12.5px] leading-snug truncate ${isActive ? "text-white" : "text-[#0B3B91]"}`}>
                          {loc.header || `Location ${i + 1}`}
                        </p>
                        <p className={`font-inter text-[11px] mt-0.5 ${isActive ? "text-white/50" : "text-gray-400"}`}>
                          {loc.lat && loc.lang ? "View on map" : "Coordinates unavailable"}
                        </p>
                      </div>
                      <ChevronRight size={14} className={`shrink-0 transition-transform duration-300 ${isActive ? "text-[#00A86B] translate-x-0.5" : "text-gray-300"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Page;