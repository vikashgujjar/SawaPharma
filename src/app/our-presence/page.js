"use client";
import React, { useState } from "react";
import Image from "next/image";
import Breadcrumb from "../Components/Breadcrumb";
import { MapPin, Navigation, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   OUR PRESENCE — STICKY MAP + LOCATION LIST
   The map-and-list pattern real-estate and directory sites use:
   a large map stays pinned on one side while a scrollable list
   of locations sits on the other — clicking a location updates
   the pinned map.

   TEMPORARY: the CMS (`${baseLink}/layout` -> `location`) only has
   a single entry (the corporate office) with lat/lng coordinates.
   The company actually has 4 confirmed sites — corporate office,
   warehouse, and two manufacturing units — so this list is
   hardcoded here for now. Once the backend/admin panel is updated
   to list all 4 locations, switch this back to fetching from
   `${baseLink}/layout`.

   Map pins use lat/lng (geocoded from each address's PIN code via
   OpenStreetMap Nominatim), not raw address text — Google's free
   embed (`q=<text>`) often centers on the area WITHOUT dropping a
   marker for specific unit/shop-style addresses it can't resolve
   to one exact place. `q=<lat>,<lng>` always drops a pin. These are
   PIN-code-level coordinates (accurate to the local area, not the
   exact building) since street-level geocoding isn't available for
   these addresses — replace with exact coordinates whenever you have
   them (e.g. from Google Maps "drop a pin" on the real building).

   TOKENS: White (base) · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

const LOCATIONS = [
  {
    header: "Corporate Office",
    address: "SCO 21, 1st Floor, Swastik Vihar, MDC, Sector 5, Panchkula, Haryana 134109, India",
    lat: 30.6985119,
    lng: 76.8553314,
  },
  {
    header: "Warehouse",
    address: "Khasra No. 823/824, Village Gularwala, Near Saraswati Vidya Mandir School, Teh. Baddi, Distt. Solan, Himachal Pradesh 173205",
    lat: 30.9446590,
    lng: 76.8071853,
  },
  {
    header: "Unit 1",
    address: "SIDCO Industrial Complex, Kathua, Jammu and Kashmir 184101",
    lat: 32.3765524,
    lng: 75.5243044,
  },
  {
    header: "Unit II",
    address: "Village Kishanpura, P.O. Manpura, Nalagarh Road, Tehsil Baddi, Distt. Solan, Himachal Pradesh 174101",
    lat: 31.0627930,
    lng: 76.6960073,
  },
];

const locationPhotos = [
  "https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9?q=85&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626420925443-c6421f87daa9?q=85&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=85&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562243061-204550d8a2c9?q=85&w=600&auto=format&fit=crop",
];

const Page = () => {
  const [active, setActive] = useState(0);
  const activeLocation = LOCATIONS[active];
  const coords = `${activeLocation.lat},${activeLocation.lng}`;

  return (
    <>
      <Breadcrumb image="https://images.unsplash.com/photo-1573207535342-8c0f9506112e?q=85&w=2400&auto=format&fit=crop" />

      <section className="w-full bg-white py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
              Where To Find Us
            </p>
            <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem]">
              Our Locations
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-6xl mx-auto">

            {/* ── Sticky map ── */}
            <div className="lg:sticky lg:top-28 lg:self-start rounded-2xl overflow-hidden border border-[#0B3B91]/8 shadow-[0_15px_40px_rgba(11,59,145,0.08)]">
              <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#0B3B91]" />
                  </div>
                  <h3 className="font-poppins font-semibold text-[#0B3B91] text-[14.5px] truncate">
                    {activeLocation.header}
                  </h3>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${coords}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-poppins font-medium text-[#00A86B] text-[12px] hover:gap-2 transition-all shrink-0"
                >
                  <Navigation size={13} /> Directions
                </a>
              </div>

              <iframe
                key={active}
                src={`https://www.google.com/maps?q=${coords}&z=15&output=embed`}
                className="border-0 w-full h-[420px] lg:h-[480px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={activeLocation.header}
              />
            </div>

            {/* ── Scrolling location list ── */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-none">
              {LOCATIONS.map((loc, i) => {
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
                        {loc.header}
                      </p>
                      <p className={`font-inter text-[11px] mt-0.5 truncate ${isActive ? "text-white/50" : "text-gray-400"}`}>
                        {loc.address}
                      </p>
                    </div>
                    <ChevronRight size={14} className={`shrink-0 transition-transform duration-300 ${isActive ? "text-[#00A86B] translate-x-0.5" : "text-gray-300"}`} />
                  </button>
                );
              })}
            </div>
          </div>
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
