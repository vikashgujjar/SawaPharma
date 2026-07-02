"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

const BG_IMAGE = "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1920&auto=format&fit=crop";

const Breadcrumb = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );

  const pageTitle = segments.length > 0 ? segments[segments.length - 1] : "Home";
  const stops = ["Home", ...segments];

  return (
    <div className="w-full relative overflow-hidden">
      {/* background photo */}
      <div className="absolute inset-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:brightness(0.55)_saturate(0.7)]"
        />
        {/* fixed-strength overlay — legible regardless of image brightness */}
        <div className="absolute inset-0 bg-[#040d20]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d20]/70 via-[#040d20]/40 to-[#0B3B91]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040d20]/60 via-transparent to-transparent" />
      </div>

      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-10 sm:py-12">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <h1 className="font-poppins font-bold text-white text-[1.6rem] sm:text-[2rem]">
            {pageTitle}
          </h1>
          <span className="font-mono text-white/25 text-[10px] tracking-[0.15em] mt-1.5">
            ROUTE / {stops.length.toString().padStart(2, "0")} STOPS
          </span>
        </div>

        {/* route strip */}
        <nav aria-label="Breadcrumb" className="relative">
          <div className="flex items-center">
            {stops.map((stop, i) => {
              const isLast = i === stops.length - 1;
              const isHome = i === 0;
              const href = isHome
                ? "/"
                : "/" + pathname.split("/").filter(Boolean).slice(0, i).join("/");

              return (
                <div
                  key={i}
                  className="flex items-center transition-all duration-500 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateX(0)" : "translateX(-8px)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div
                      className={`flex items-center justify-center rounded-full transition-all duration-300
                        ${isLast
                          ? "w-3 h-3 bg-[#00A86B] ring-4 ring-[#00A86B]/25"
                          : "w-2.5 h-2.5 bg-white/20"}`}
                    />
                    {isHome ? (
                      <Link
                        href={href}
                        className="flex items-center gap-1 font-inter text-white/50 hover:text-[#00A86B] text-[11.5px] whitespace-nowrap transition-colors"
                      >
                        <Home size={11} /> Home
                      </Link>
                    ) : isLast ? (
                      <span className="font-poppins font-medium text-[#00A86B] text-[11.5px] whitespace-nowrap">
                        {stop}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className="font-inter text-white/50 hover:text-[#00A86B] text-[11.5px] whitespace-nowrap transition-colors"
                      >
                        {stop}
                      </Link>
                    )}
                  </div>

                  {!isLast && (
                    <div className="w-8 sm:w-14 h-px border-t border-dashed border-white/15 mx-2 mb-6 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;