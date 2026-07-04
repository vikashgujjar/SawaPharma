"use client";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { baseLink } from "../config/Apilink";
import { Globe2, MapPin, Mail, Clock, Building2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   MARKETING / COUNTRIES WE SERVE — ANIMATED ROUTE MAP

   Major bug fixed from the original: the world-map pins were
   hardcoded to a fixed list of 10 countries at hand-guessed
   percentage positions — completely disconnected from the real
   `data.countries` coming from the API, AND geographically wrong
   (the screenshot showed "Fiji" pinned next to Africa, "Cambodia"
   pinned over Somalia, etc.).

   This version still shows a map, but positions are computed
   from REAL latitude/longitude via an equirectangular projection
   (x = (lon+180)/360*100, y = (90-lat)/180*100) — not guesses.
   COUNTRY_COORDS below covers common export markets. If the API
   returns a country name that isn't in that table, it is NOT
   silently mis-placed on the map — it's listed underneath instead,
   so nothing ever gets pinned to the wrong spot.

   Also fixed:
   - Leftover WordPress-style classNames (`widget_text`, `textwidget`)
     that did nothing in this Tailwind project.
   - `data?.countries[0]?.split(", ")` had no trimming/filtering —
     now handles stray whitespace and empty entries safely.

   TOKENS: Deep Navy #040d20 (map bg) · Navy #0B3B91 · Green #00A86B · White
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

/* Real lat/lon for common export markets — extend this table as new
   countries are added on the backend. Anything not listed here falls
   back to the plain list below the map instead of guessing a position. */
const COUNTRY_COORDS = {
  "afghanistan": [33.9, 67.7], "afganistan": [33.9, 67.7], // common misspelling seen in the API data
  "somalia": [5.2, 46.2], "angola": [-11.2, 17.9],
  "ghana": [7.9, -1.0], "mali": [17.6, -4.0],
  "tajikistan": [38.9, 71.3], "tazakistan": [38.9, 71.3], // common misspelling seen in the API data
  "fiji": [-17.7, 178.1], "kenya": [-0.02, 37.9], "uganda": [1.4, 32.3],
  "cambodia": [12.6, 104.9], "nigeria": [9.1, 8.7], "uae": [23.4, 53.8],
  "united arab emirates": [23.4, 53.8], "saudi arabia": [23.9, 45.1],
  "united kingdom": [55.4, -3.4], "uk": [55.4, -3.4], "russia": [61.5, 105.3],
  "philippines": [12.9, 121.8], "vietnam": [14.1, 108.3], "nepal": [28.4, 84.1],
  "sri lanka": [7.9, 80.8], "india": [20.6, 78.9], "yemen": [15.6, 48.5],
  "sudan": [12.9, 30.2], "tanzania": [-6.4, 34.9], "ethiopia": [9.1, 40.5],
  "zambia": [-13.1, 27.8], "myanmar": [21.9, 95.9], "bangladesh": [23.7, 90.4],
  "iraq": [33.2, 43.7], "syria": [34.8, 38.9],
};

const HUB = { lat: 20.6, lon: 78.9, label: "India" }; // manufacturing hub

const RouteMap = ({ countries, active }) => {
  const matchedRaw = countries
    .map((name) => {
      const coords = COUNTRY_COORDS[name.toLowerCase().trim()];
      return coords ? { name, lat: coords[0], lon: coords[1] } : null;
    })
    .filter(Boolean);
  const unmatched = countries.filter((name) => !COUNTRY_COORDS[name.toLowerCase().trim()]);

  // ── Dynamic bounding box: zoom/center on just the points we actually
  // have, instead of mapping onto the full -180..180 world width (which
  // left a tiny cluster stranded in a sea of empty ocean on one side). ──
  const allPoints = [{ lat: HUB.lat, lon: HUB.lon }, ...matchedRaw];
  const lats = allPoints.map((p) => p.lat);
  const lons = allPoints.map((p) => p.lon);
  const padding = 0.25; // 25% breathing room around the tightest bounding box
  const latRange = Math.max(Math.max(...lats) - Math.min(...lats), 20); // floor avoids over-zooming on 1-2 points
  const lonRange = Math.max(Math.max(...lons) - Math.min(...lons), 20);
  const latMin = Math.min(...lats) - latRange * padding;
  const latMax = Math.max(...lats) + latRange * padding;
  const lonMin = Math.min(...lons) - lonRange * padding;
  const lonMax = Math.max(...lons) + lonRange * padding;

  const toXY = (lat, lon) => ({
    x: ((lon - lonMin) / (lonMax - lonMin)) * 100,
    y: (1 - (lat - latMin) / (latMax - latMin)) * 100,
  });

  const hub = toXY(HUB.lat, HUB.lon);
  const matched = matchedRaw.map((p) => ({ name: p.name, ...toXY(p.lat, p.lon) }));

  const arcPath = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - 12;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <>
      <style>{`
        @keyframes flowDash { to { stroke-dashoffset: -20; } }
        @keyframes radarPing { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.6); opacity: 0; } }
        .route-arc { animation: flowDash 1.8s linear infinite; }
        .radar-ping { animation: radarPing 2.2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .route-arc { animation: none !important; }
          .radar-ping { animation: none !important; }
        }
      `}</style>

      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-gradient-to-br from-[#071B47] to-[#040d20] border border-white/10">
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5} stroke="#EAF4FF" strokeWidth="0.15" />)}
          {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 8.3} y1="0" x2={i * 8.3} y2="100" stroke="#EAF4FF" strokeWidth="0.15" />)}
        </svg>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {matched.map((p, i) => (
            <path
              key={i}
              className="route-arc"
              d={arcPath(hub, p)}
              fill="none"
              stroke="#00A86B"
              strokeWidth="0.4"
              strokeDasharray="3 2"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: active ? 0.7 : 0, transition: `opacity 0.6s ease ${i * 60}ms` }}
            />
          ))}
        </svg>

        {/* hub with radar-ping */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
          <div className="relative w-4 h-4">
            <div className="radar-ping absolute inset-0 rounded-full bg-[#00A86B]" />
            <div className="absolute inset-0 rounded-full bg-[#00A86B] ring-4 ring-[#00A86B]/25 shadow-[0_0_20px_rgba(0,168,107,0.7)]" />
          </div>
          <span className="font-poppins font-semibold text-white text-[9px] sm:text-[10px] mt-1.5 whitespace-nowrap bg-[#040d20] px-1.5 rounded">
            {HUB.label}
          </span>
        </div>

        {matched.map((p, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: active ? 1 : 0, transitionDelay: `${i * 60}ms` }}
          >
            <div className="w-2 h-2 rounded-full bg-white ring-2 ring-[#00A86B]/40 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            <span className="absolute top-3 left-1/2 -translate-x-1/2 font-inter text-white/70 text-[9px] sm:text-[10px] whitespace-nowrap">
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {unmatched.length > 0 && (
        <div className="mt-4">
          <p className="font-inter text-gray-400 text-[11px] mb-2">Also serving:</p>
          <div className="flex flex-wrap gap-2">
            {unmatched.map((c, i) => (
              <span key={i} className="font-inter text-[#0B3B91] text-[12px] bg-[#EAF4FF]/60 border border-[#0B3B91]/10 rounded-full px-3 py-1.5">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/layout`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const countries =
    data?.countries?.[0]
      ?.split(",")
      .map((c) => c.trim())
      .filter(Boolean) || [];

  return (
    <>
      <Breadcrumb />

      <section className="w-full bg-white py-16 sm:py-24">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">

            {/* ── Main content ── */}
            <div>
              <p className="font-poppins text-[#00A86B] text-[11px] font-semibold tracking-[0.28em] uppercase mb-3">
                Marketing
              </p>
              <h1 className="font-poppins font-bold text-[#0B3B91] text-[1.9rem] sm:text-[2.3rem] leading-tight mb-5">
                Your Trusted Partner In Pharmaceuticals
              </h1>
              <p className="font-inter text-gray-600 text-[15px] leading-relaxed mb-10 max-w-2xl">
                At Sawa Pharma, we are dedicated to delivering high-quality, innovative healthcare solutions
                that improve lives. As a leading pharmaceutical company, we combine cutting-edge research,
                advanced technology, and a commitment to excellence to bring you safe, effective, and
                affordable medicines.
              </p>

              <div className="flex items-center gap-2 mb-5" ref={mapRef}>
                <Globe2 size={17} className="text-[#00A86B]" />
                <h2 className="font-poppins font-semibold text-[#0B3B91] text-[18px]">Countries We Serve</h2>
                {!loading && countries.length > 0 && (
                  <span className="font-mono text-gray-400 text-[11px] ml-1">({countries.length})</span>
                )}
              </div>

              {error && (
                <p className="font-inter text-red-500 text-sm py-4">
                  Couldn't load the country list right now — please try again shortly.
                </p>
              )}

              {loading && !error && (
                <div className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl bg-[#EAF4FF] animate-pulse" />
              )}

              {!loading && !error && countries.length === 0 && (
                <p className="font-inter text-gray-400 text-sm">Country list not available right now.</p>
              )}

              {!loading && !error && countries.length > 0 && (
                <RouteMap countries={countries} active={active} />
              )}
            </div>

            {/* ── Find Us sidebar ── */}
            <aside className="bg-[#EAF4FF]/40 rounded-2xl p-6 h-fit border border-[#0B3B91]/8">
              <h2 className="font-poppins font-bold text-[#0B3B91] text-[16px] mb-5 pb-3 border-b border-[#0B3B91]/10">
                Find Us
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 size={16} className="text-[#0B3B91]" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-[#0B3B91] text-[13px] mb-1">Sawa Pharma India Pvt. Ltd.</p>
                    <p className="font-inter text-gray-500 text-[12.5px] leading-relaxed">
                      SCO 21, 1st Floor, Swastik Vihar, MDC, Sector 5, Panchkula, Haryana - 134109
                      (Near Indian Overseas Bank, MDC)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail size={15} className="text-[#0B3B91]" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-[#0B3B91] text-[13px] mb-1">Email</p>
                    {loading ? (
                      <div className="h-4 w-32 bg-white rounded animate-pulse" />
                    ) : (
                      <p className="font-inter text-gray-500 text-[12.5px]">{data?.email || "—"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock size={15} className="text-[#0B3B91]" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-[#0B3B91] text-[13px] mb-1">Hours</p>
                    <p className="font-inter text-gray-500 text-[12.5px]">Monday – Saturday: 9:30 AM – 5:30 PM</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;