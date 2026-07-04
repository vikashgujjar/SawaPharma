"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { baseLink, storageLink } from "../config/Apilink";
import { FileDown, Search, AlertCircle } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   SHARED PRODUCT TABLE — used by tablets, liquid-injection,
   dry-injection, capsules, and syrup pages.

   TOKENS: White · Ice Blue #EAF4FF · Navy #0B3B91 · Green #00A86B
   Display: Poppins · Body: Inter
───────────────────────────────────────────────────────── */

/* Category-specific medicine photography for each product page's
   breadcrumb banner, keyed by endpoint. Verified working Unsplash URLs. */
const CATEGORY_IMAGE = {
  tabletp: "https://images.unsplash.com/photo-1573883430697-4c3479aae6b9?q=85&w=2400&auto=format&fit=crop", // round white pills
  capsule: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=85&w=2400&auto=format&fit=crop", // assorted tablets & capsules
  liquidinjection: "https://images.unsplash.com/photo-1616117452218-ea3a864716c7?q=85&w=2400&auto=format&fit=crop", // clear glass bottle, plain product shot
  dryinjectable: "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?q=85&w=2400&auto=format&fit=crop", // glass vials, wide product shot
  syrup: "https://images.unsplash.com/photo-1635166304271-04931640a450?q=85&w=2400&auto=format&fit=crop", // syrup bottle
};

const ProductTable = ({
  endpoint = "tabletp",
  title = "SAWA PHARMA INDIA PRIVATE LIMITED — TABLETS",
  categoryId = 2,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [endpoint]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/prcate`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        if (!cancelled) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        if (!cancelled) setCatLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const activeCategory = categories.find((c) => c.id === categoryId);

  const openPdf = (pdfUrl) => {
    if (pdfUrl) {
      window.open(`${storageLink}/${pdfUrl}`, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF available for this product.");
    }
  };

  const filtered = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.composition?.toLowerCase().includes(q) ||
      item.strength?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Breadcrumb image={CATEGORY_IMAGE[endpoint]} />

      <div className="w-full bg-white py-16 sm:py-20">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">

          {/* unified toolbar — title, search, and PDF button in one row */}
          <div className="bg-[#0B3B91] rounded-2xl px-5 sm:px-7 py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <h1 className="font-poppins font-bold text-white text-[14px] sm:text-[18px] leading-snug shrink-0">
              {title}
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, composition..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/15 bg-white/10
                    font-inter text-[13px] text-white placeholder-white/40 focus:outline-none
                    focus:border-[#00A86B] focus:bg-white/15 transition-all"
                />
              </div>

              {!catLoading && activeCategory?.pdf_for_model && (
                <button
                  onClick={() => openPdf(activeCategory.pdf_for_model)}
                  className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#00A86B] hover:bg-[#008f5a] text-white
                    font-poppins font-semibold text-[13px] px-4 py-2.5 rounded-lg transition-colors duration-200"
                >
                  <FileDown size={15} />
                  Open PDF
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 font-inter text-sm py-5">
              <AlertCircle size={16} />
              Couldn't load products right now — please try again shortly.
            </div>
          )}

          {!error && (
            <>
              {/* ── Desktop table ── */}
              <div className="hidden max-h-[70vh] overflow-auto md:block overflow-x-auto rounded-2xl border border-[#0B3B91]/10 shadow-[0_10px_30px_rgba(11,59,145,0.06)]">
                <table className="w-full border-collapse">
                  <thead className="bg-[#0B3B91] text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-3.5 text-left font-poppins font-semibold text-[12px] tracking-wide text-nowrap w-16">SR. NO.</th>
                      <th className="px-4 py-3.5 text-left font-poppins font-semibold text-[12px] tracking-wide">GENERIC NAME</th>
                      <th className="px-4 py-3.5 text-left font-poppins font-semibold text-[12px] tracking-wide">COMPOSITION</th>
                      <th className="px-4 py-3.5 text-left font-poppins font-semibold text-[12px] tracking-wide">STRENGTH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#EAF4FF]/30"}>
                            {Array.from({ length: 4 }).map((_, j) => (
                              <td key={j} className="px-4 py-3.5 border-t border-gray-100">
                                <div className="h-4 w-3/4 bg-[#EAF4FF] rounded animate-pulse" />
                              </td>
                            ))}
                          </tr>
                        ))
                      : filtered.length === 0
                      ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center font-inter text-gray-400 text-sm">
                            {query ? `No results for "${query}"` : "No products available."}
                          </td>
                        </tr>
                      )
                      : filtered.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-[#EAF4FF]/30"} hover:bg-[#EAF4FF]/60 transition-colors`}
                          >
                            <td className="px-4 py-3.5 border-t border-gray-100 font-inter text-gray-500 text-[13px]">{index + 1}</td>
                            <td className="px-4 py-3.5 border-t border-gray-100 font-poppins font-medium text-[#0B3B91] text-[13.5px]">{item.name}</td>
                            <td className="px-4 py-3.5 border-t border-gray-100 font-inter text-gray-600 text-[13px]">{item.composition}</td>
                            <td className="px-4 py-3.5 border-t border-gray-100 font-inter text-gray-600 text-[13px]">{item.strength}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile cards ── */}
              <div className="md:hidden flex flex-col gap-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-24 rounded-xl bg-[#EAF4FF] animate-pulse" />
                    ))
                  : filtered.length === 0
                  ? (
                    <p className="text-center font-inter text-gray-400 text-sm py-10">
                      {query ? `No results for "${query}"` : "No products available."}
                    </p>
                  )
                  : filtered.map((item, index) => (
                      <div key={item.id} className="rounded-xl border border-[#0B3B91]/8 bg-white p-4 shadow-[0_6px_18px_rgba(11,59,145,0.05)]">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="font-poppins font-semibold text-[#0B3B91] text-[14px]">{item.name}</p>
                          <span className="font-mono text-gray-300 text-[11px] shrink-0">#{index + 1}</span>
                        </div>
                        <p className="font-inter text-gray-500 text-[12.5px] mb-1">
                          <span className="text-gray-400">Composition: </span>{item.composition}
                        </p>
                        <p className="font-inter text-gray-500 text-[12.5px]">
                          <span className="text-gray-400">Strength: </span>{item.strength}
                        </p>
                      </div>
                    ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductTable;
