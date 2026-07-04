"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseLink } from "../config/Apilink";
import {
  MapPin, Mail, Phone, MessageCircle, ArrowUpRight,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const socialIcons = { facebook: FaFacebook, tweeter: FaTwitter, instagram: FaInstagram, youtube: FaYoutube };

const productLinks = [
  { label: "Tablets", href: "/tablets" },
  { label: "Liquid Injections", href: "/liquid-injection" },
  { label: "Dry Injections", href: "/dry-injection" },
  { label: "Capsules", href: "/capsules" },
  { label: "Syrup", href: "/syrup" },
];

const aboutLinks = [
  { label: "Company Profile", href: "/company-profile" },
  { label: "Our Presence", href: "/our-presence" },
  { label: "Marketing", href: "/marketing" },
  { label: "Contact Us", href: "/contact-us" },
];

const tickerItems = [
  "WHO-GMP CERTIFIED", "MADE IN INDIA", "EXPORT READY",
  "500+ PRODUCTS", "10+ COUNTRIES SERVED", "24×7 SUPPORT",
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${baseLink}/layout`);
        const result = await response.json();
        if (!cancelled) setData(result);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Link
        href="https://wa.me/919875939879"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-[999] w-14 h-14 rounded-full bg-[#00A86B] shadow-[0_10px_30px_rgba(0,168,107,0.4)]
          flex items-center justify-center hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle size={26} className="text-white" fill="currentColor" />
      </Link>

      <footer className="w-full bg-[#040d20] text-white overflow-hidden">

        {/* ── Ticker ribbon ── */}
        <div className="bg-[#00A86B] py-2.5 overflow-hidden">
          <div className="flex gap-8 animate-[ticker_22s_linear_infinite] w-max">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} className="font-poppins font-semibold text-white text-[11.5px] tracking-[0.15em] whitespace-nowrap">
                {t} <span className="mx-2 opacity-50">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Link block ── */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 pt-16 pb-10">
          <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10 pb-14 border-b border-white/10">

            <div>
              <Image
                src="/images/logo/logo.webp"
                alt="Sawa Pharma"
                width={800}
                height={800}
                loading="lazy"
                className="h-14 w-auto bg-white rounded-lg p-2 mb-5"
              />
              <p className="font-inter text-white/45 text-[13px] leading-relaxed max-w-xs mb-6">
                A comprehensive manufacturing solution for sterile and non-sterile pharmaceutical products.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-[#00A86B] hover:border-[#00A86B]
                  text-white font-poppins font-medium text-[12.5px] px-4 py-2.5 rounded-lg transition-all duration-300"
              >
                Request Catalogue <ArrowUpRight size={13} />
              </Link>
            </div>

            <div>
              <h5 className="font-poppins font-semibold text-white/40 text-[11px] tracking-[0.2em] uppercase mb-4">Products</h5>
              <ul className="space-y-2.5">
                {productLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="font-inter text-white/70 text-[13.5px] hover:text-[#00A86B] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-poppins font-semibold text-white/40 text-[11px] tracking-[0.2em] uppercase mb-4">About</h5>
              <ul className="space-y-2.5">
                {aboutLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="font-inter text-white/70 text-[13.5px] hover:text-[#00A86B] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-poppins font-semibold text-white/40 text-[11px] tracking-[0.2em] uppercase mb-4">Get In Touch</h5>
              <div className="flex items-start gap-2.5 mb-3">
                <MapPin size={14} className="text-[#00A86B] shrink-0 mt-0.5" />
                <p className="font-inter text-white/60 text-[12.5px] leading-relaxed">
                  SCO 21, 1st Floor, Swastik Vihar, MDC, Sector 5, Panchkula, Haryana - 134109
                </p>
              </div>
              <Link href="mailto:ceo@sawapharma.in" className="flex items-center gap-2.5 mb-2.5 font-inter text-white/60 text-[12.5px] hover:text-[#00A86B] transition-colors">
                <Mail size={13} className="text-[#00A86B] shrink-0" /> ceo@sawapharma.in
              </Link>
              <Link href="tel:+919875939878" className="flex items-center gap-2.5 font-inter text-white/60 text-[12.5px] hover:text-[#00A86B] transition-colors">
                <Phone size={12} className="text-[#00A86B] shrink-0" /> +91 98759-39878
              </Link>

              <div className="flex items-center gap-2 mt-5">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-7 h-7 rounded-full bg-white/10 animate-pulse" />)
                ) : (
                  data?.links?.map((item, i) => {
                    const SocialIcon = socialIcons[item.platform];
                    if (!SocialIcon) return null;
                    return (
                      <Link key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                        aria-label={`Visit our ${item.platform} page`}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#00A86B] flex items-center justify-center text-white/70 hover:text-white transition-colors">
                        <SocialIcon size={12} />
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ── Oversized wordmark sign-off — image clipped into the text ── */}
          <div className="relative py-10 sm:py-14 text-center select-none pointer-events-none overflow-hidden">
            <span
              className="wordmark-clip font-poppins font-bold leading-none whitespace-nowrap block
                text-[15vw] sm:text-[11vw] lg:text-[9rem]"
            >
              SAWA PHARMA
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
            <p className="font-inter text-white/35 text-[12px]">
              © {currentYear} <span className="font-semibold text-white/50">Sawa Pharma</span>. All Rights Reserved.
            </p>
            <p className="font-inter text-white/35 text-[12px]">
              Developed by Future Touch
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes wordmarkPan { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
        .wordmark-clip {
          background-image: url('https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?q=80&w=1600&auto=format&fit=crop');
          background-size: 180% auto;
          background-position: 0% 50%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wordmarkPan 18s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[ticker_22s_linear_infinite\\] { animation: none !important; }
          .wordmark-clip { animation: none !important; background-position: 30% 50%; }
        }
      `}</style>
    </>
  );
};

export default Footer;