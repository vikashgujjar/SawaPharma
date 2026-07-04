"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Globe2 } from "lucide-react";
import { baseLink } from "../config/Apilink";

const states = [
  { name: "Punjab",      x: 32, y: 28 },
  { name: "Haryana",     x: 38, y: 32 },
  { name: "Delhi",       x: 42, y: 34 },
  { name: "Rajasthan",   x: 28, y: 42 },
  { name: "UP",          x: 50, y: 36 },
  { name: "Gujarat",     x: 22, y: 55 },
  { name: "MP",          x: 45, y: 52 },
  { name: "Maharashtra", x: 38, y: 65 },
  { name: "Telangana",   x: 50, y: 72 },
  { name: "Karnataka",   x: 42, y: 82 },
  { name: "Tamil Nadu",  x: 48, y: 92 },
  { name: "West Bengal", x: 68, y: 55 },
];

/* Same lookup used on the Marketing page — keep these two in sync,
   or better, move this table to a shared constants file both import. */
const COUNTRY_COORDS = {
  "afghanistan": [33.9, 67.7], "afganistan": [33.9, 67.7],
  "somalia": [5.2, 46.2], "angola": [-11.2, 17.9],
  "ghana": [7.9, -1.0], "mali": [17.6, -4.0],
  "tajikistan": [38.9, 71.3], "tazakistan": [38.9, 71.3],
  "fiji": [-17.7, 178.1], "kenya": [-0.02, 37.9], "uganda": [1.4, 32.3],
  "cambodia": [12.6, 104.9], "nigeria": [9.1, 8.7], "uae": [23.4, 53.8],
  "united arab emirates": [23.4, 53.8], "saudi arabia": [23.9, 45.1],
  "united kingdom": [55.4, -3.4], "uk": [55.4, -3.4], "russia": [61.5, 105.3],
  "philippines": [12.9, 121.8], "vietnam": [14.1, 108.3], "nepal": [28.4, 84.1],
  "sri lanka": [7.9, 80.8], "india": [20.6, 78.9], "yemen": [15.6, 48.5],
  "sudan": [12.9, 30.2], "south sudan": [7.3, 30.0], "tanzania": [-6.4, 34.9], "ethiopia": [9.1, 40.5],
  "zambia": [-13.1, 27.8], "myanmar": [21.9, 95.9], "bangladesh": [23.7, 90.4],
  "iraq": [33.2, 43.7], "syria": [34.8, 38.9],
  "democratic republic of the congo": [-4.0, 21.8], "dr congo": [-4.0, 21.8], "drc": [-4.0, 21.8],
};

const INDIA_HUB_GEO = { lat: 20.6, lon: 78.9, label: "India" };
const INDIA_HUB = { x: 40, y: 55 }; // fixed illustrative hub for the domestic states panel

/* ─── Static (illustrative) network-map panel — used for Domestic Reach ─── */
const NetworkMap = ({ hub, hubLabel, points, active }) => {
  const arcPath = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - 8;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#071B47] border border-white/10">
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 20} x2="100" y2={i * 20} stroke="#EAF4FF" strokeWidth="0.2" />)}
        {Array.from({ length: 6 }).map((_, i) => <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100" stroke="#EAF4FF" strokeWidth="0.2" />)}
      </svg>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {points.map((p, i) => (
          <path key={i} d={arcPath(hub, p)} fill="none" stroke="#00A86B" strokeWidth="0.4" strokeDasharray="2 1.5"
            className="transition-opacity duration-700" style={{ opacity: active ? 0.55 : 0, transitionDelay: `${i * 60}ms` }} />
        ))}
      </svg>

      <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
        <div className="w-4 h-4 rounded-full bg-[#00A86B] ring-4 ring-[#00A86B]/25 shadow-[0_0_20px_rgba(0,168,107,0.6)]" />
        <span className="font-poppins font-semibold text-white text-[10px] mt-1.5 whitespace-nowrap bg-[#040d20] px-1.5 rounded">{hubLabel}</span>
      </div>

      {points.map((p, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: active ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white ring-2 ring-white/20" />
          <span className="absolute top-2.5 left-1/2 -translate-x-1/2 font-inter text-white/60 text-[8.5px] whitespace-nowrap">{p.name}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Dynamic (real-coordinate) network-map panel — used for Global Export ─── */
const GlobalNetworkMap = ({ countryNames, active }) => {
  const matchedRaw = countryNames
    .map((name) => {
      const coords = COUNTRY_COORDS[name.toLowerCase().trim()];
      return coords ? { name, lat: coords[0], lon: coords[1] } : null;
    })
    .filter(Boolean);
  const unmatched = countryNames.filter((name) => !COUNTRY_COORDS[name.toLowerCase().trim()]);

  const allPoints = [{ lat: INDIA_HUB_GEO.lat, lon: INDIA_HUB_GEO.lon }, ...matchedRaw];
  const lats = allPoints.map((p) => p.lat);
  const lons = allPoints.map((p) => p.lon);
  const padding = 0.25;
  const latRange = Math.max(Math.max(...lats) - Math.min(...lats), 20);
  const lonRange = Math.max(Math.max(...lons) - Math.min(...lons), 20);
  const latMin = Math.min(...lats) - latRange * padding;
  const latMax = Math.max(...lats) + latRange * padding;
  const lonMin = Math.min(...lons) - lonRange * padding;
  const lonMax = Math.max(...lons) + lonRange * padding;

  const toXY = (lat, lon) => ({
    x: ((lon - lonMin) / (lonMax - lonMin)) * 100,
    y: (1 - (lat - latMin) / (latMax - latMin)) * 100,
  });

  const hub = toXY(INDIA_HUB_GEO.lat, INDIA_HUB_GEO.lon);
  const matched = matchedRaw.map((p) => ({ name: p.name, ...toXY(p.lat, p.lon) }));

  const arcPath = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - 12;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <>
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#071B47] border border-white/10">
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 20} x2="100" y2={i * 20} stroke="#EAF4FF" strokeWidth="0.2" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100" stroke="#EAF4FF" strokeWidth="0.2" />)}
        </svg>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {matched.map((p, i) => (
            <path key={i} d={arcPath(hub, p)} fill="none" stroke="#00A86B" strokeWidth="0.4" strokeDasharray="2 1.5"
              vectorEffect="non-scaling-stroke" className="transition-opacity duration-700"
              style={{ opacity: active ? 0.55 : 0, transitionDelay: `${i * 60}ms` }} />
          ))}
        </svg>

        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
          <div className="w-4 h-4 rounded-full bg-[#00A86B] ring-4 ring-[#00A86B]/25 shadow-[0_0_20px_rgba(0,168,107,0.6)]" />
          <span className="font-poppins font-semibold text-white text-[10px] mt-1.5 whitespace-nowrap bg-[#040d20] px-1.5 rounded">
            {INDIA_HUB_GEO.label}
          </span>
        </div>

        {matched.map((p, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: active ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white ring-2 ring-white/20" />
            <span className="absolute top-2.5 left-1/2 -translate-x-1/2 font-inter text-white/60 text-[8.5px] whitespace-nowrap">{p.name}</span>
          </div>
        ))}
      </div>

      {unmatched.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {unmatched.map((c, i) => (
            <span key={i} className="font-inter text-white/50 text-[10.5px] bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
              {c}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

/* TEMPORARY: the CMS's `countries` field doesn't include these yet.
   Appending them here so they show up on the map immediately — once
   the backend/admin panel adds them to the real countries list, this
   can be removed (they'll already be covered by COUNTRY_COORDS above). */
const EXTRA_COUNTRIES = ["South Sudan", "DRC"];

const ExportMarkets = () => {
  const [active, setActive] = useState(false);
  const [countries, setCountries] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${baseLink}/layout`);
        const result = await res.json();
        const list =
          result?.countries?.[0]
            ?.split(",")
            .map((c) => c.trim())
            .filter(Boolean) || [];
        const known = new Set(list.map((c) => c.toLowerCase()));
        const merged = [...list, ...EXTRA_COUNTRIES.filter((c) => !known.has(c.toLowerCase()))];
        if (!cancelled) setCountries(merged);
      } catch (e) {
        console.error("Error fetching countries:", e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#EAF4FF]/40 py-16 sm:py-24">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
            Export Markets
          </p>
          <h2 className="font-poppins font-bold text-[#0B3B91] leading-tight text-[1.9rem] sm:text-[2.4rem] md:text-[2.7rem]">
            Reach That Spans States And Borders.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Domestic — illustrative static states */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#00A86B]" />
                <h3 className="font-poppins font-semibold text-[#0B3B91] text-[16px]">Domestic Reach</h3>
              </div>
              <span className="font-poppins font-bold text-[#0B3B91] text-[15px]">25+ States</span>
            </div>
            <NetworkMap hub={INDIA_HUB} hubLabel="HQ" points={states} active={active} />
          </div>

          {/* Export — real countries from the API */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-[#00A86B]" />
                <h3 className="font-poppins font-semibold text-[#0B3B91] text-[16px]">Global Export</h3>
              </div>
              <span className="font-poppins font-bold text-[#0B3B91] text-[15px]">
                {countries.length > 0 ? `${countries.length}+ Countries` : "10+ Countries"}
              </span>
            </div>
            {countries.length > 0 ? (
              <GlobalNetworkMap countryNames={countries} active={active} />
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#071B47]/10 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportMarkets;