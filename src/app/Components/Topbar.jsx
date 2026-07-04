"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseLink } from "../config/Apilink";
import LanguageSwitcher from "./LanguageSwitcher";

const allBadges = [
  { icon: "fas fa-certificate",  label: "WHO-GMP Certified"      },
  { icon: "fas fa-flag",         label: "Made in India"           },
  { icon: "fas fa-globe",        label: "Export Ready"            },
  // { icon: "fas fa-shield-alt",   label: "ISO Quality Systems"     },
  // { icon: "fas fa-check-double", label: "Regulatory Compliance"   },
];

const Topbar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res  = await fetch(`${baseLink}/layout`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Topbar fetch error:", e);
      }
    };
    fetchData();
  }, []);

  const ContactLinks = () => (
    <div className="flex items-center flex-wrap gap-y-1.5 gap-3 xl:gap-5 shrink-0">
      {data?.number1 && (
        <Link
          href={`tel:${data.number1}`}
          className="flex items-center gap-1.5 text-[11px] text-white/90 font-inter font-medium hover:text-[#00A86B] transition-colors group"
        >
          <span className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00A86B]/20 transition-colors shrink-0">
            <i className="fas fa-phone-alt text-[#00A86B] text-[8px] xl:text-[9px]"></i>
          </span>
          <span className="hidden md:inline i18n-shrink">{data.number1}</span>
        </Link>
      )}
      {data?.email && (
        <Link
          href={`mailto:${data.email}`}
          className="flex items-center gap-1.5 text-[11px] text-white/90 font-inter font-medium hover:text-[#00A86B] transition-colors group"
        >
          <span className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00A86B]/20 transition-colors shrink-0">
            <i className="far fa-envelope text-[#00A86B] text-[8px] xl:text-[9px]"></i>
          </span>
          <span className="hidden md:inline i18n-shrink">{data.email}</span>
        </Link>
      )}
      {data?.links?.length > 0 && (
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/20">
          {data.links.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              target="_blank"
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#00A86B] hover:text-white transition-all text-[10px]"
            >
              {item.platform === "facebook"  && <i className="fab fa-facebook-f"></i>}
              {item.platform === "tweeter"   && <i className="fab fa-twitter"></i>}
              {item.platform === "instagram" && <i className="fab fa-instagram"></i>}
              {item.platform === "youtube"   && <i className="fab fa-youtube"></i>}
            </Link>
          ))}
        </div>
      )}
      <div className="flex items-center pl-3 xl:pl-4 border-l border-white/20">
        <LanguageSwitcher />
      </div>
    </div>
  );

  return (
    <div className="bg-[#0B3B91] w-full">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-28 mx-auto py-2 xl:py-2.5">
        <div className="flex items-center justify-between flex-wrap gap-y-2 gap-3">

          {/* ── Mobile ( < md ): 2 key badges + phone icon ── */}
          <div className="flex md:hidden items-center flex-wrap gap-y-1 gap-2 min-w-0">
            {allBadges.slice(0, 2).map((badge, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-1 shrink-0">
                  <i className={`${badge.icon} text-[#00A86B] text-[9px]`}></i>
                  <span className="font-poppins text-white text-[10px] font-medium i18n-shrink">
                    {badge.label}
                  </span>
                </span>
                {i === 0 && <span className="text-white/25 text-[10px]">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* ── Tablet ( md → lg ): 3 pill badges ───────── */}
          <div className="hidden md:flex lg:hidden items-center flex-wrap gap-y-1.5 gap-1.5 min-w-0">
            {allBadges.slice(0, 3).map((badge, i) => (
              <React.Fragment key={i}>
                <div className="badge-pill flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 shrink-0">
                  <i className={`${badge.icon} text-[#00A86B] text-[10px]`}></i>
                  <span className="font-poppins text-white text-[10px] font-medium i18n-shrink">
                    {badge.label}
                  </span>
                </div>
                {i < 2 && <span className="text-white/20 text-xs">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* ── Small Desktop ( lg → xl ): 3 pill badges ── */}
          <div className="hidden lg:flex xl:hidden items-center flex-wrap gap-y-1.5 gap-1.5 min-w-0">
            {allBadges.slice(0, 3).map((badge, i) => (
              <React.Fragment key={i}>
                <div className="badge-pill flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 shrink-0">
                  <i className={`${badge.icon} text-[#00A86B] text-[10px]`}></i>
                  <span className="font-poppins text-white text-[11px] font-medium i18n-shrink">
                    {badge.label}
                  </span>
                </div>
                {i < 2 && <span className="text-white/20 text-xs">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* ── Large Desktop ( xl+ ): all 5 badges ─────── */}
          <div className="hidden xl:flex items-center flex-wrap gap-y-1.5 gap-1 min-w-0">
            {allBadges.map((badge, i) => (
              <React.Fragment key={i}>
                <div className="badge-pill flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-colors cursor-default shrink-0">
                  <i className={`${badge.icon} text-[#00A86B] text-[10px]`}></i>
                  <span className="font-poppins text-white text-[11px] font-medium i18n-shrink tracking-wide">
                    {badge.label}
                  </span>
                </div>
                {i < allBadges.length - 1 && (
                  <span className="text-white/20 text-xs px-0.5">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ── Contact (all screens) ─────────────────────── */}
          <ContactLinks />

        </div>
      </div>

      {/* Green accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00A86B] to-transparent opacity-60" />
    </div>
  );
};

export default Topbar;
