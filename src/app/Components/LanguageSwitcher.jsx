"use client";
import { useEffect, useRef, useState } from "react";

// Matches the languages spoken across our export markets. Where a language
// is shared by several markets, the flag shown is the first-listed market:
// Tajikistan (ru, tg) · Angola (pt) · DRC (fr, ln, sw) · Ghana/Nigeria (en)
// Afghanistan (ps, fa≈Dari) · Cambodia (km) · Somalia (so, ar) · Uganda/Kenya (en, sw) · Mali (fr)
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇭" },
  { code: "ru", label: "Русский", flag: "🇹🇯" },
  { code: "tg", label: "Тоҷикӣ", flag: "🇹🇯" },
  { code: "pt", label: "Português", flag: "🇦🇴" },
  { code: "fr", label: "Français", flag: "🇨🇩" },
  { code: "ln", label: "Lingála", flag: "🇨🇩" },
  { code: "sw", label: "Kiswahili", flag: "🇨🇩" },
  { code: "ps", label: "پښتو", flag: "🇦🇫" },
  { code: "fa", label: "دری", flag: "🇦🇫" },
  { code: "km", label: "ខ្មែរ", flag: "🇰🇭" },
  { code: "so", label: "Soomaali", flag: "🇸🇴" },
  { code: "ar", label: "العربية", flag: "🇸🇴" },
];

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const applyLanguage = (code) => {
  if (code === "en") {
    document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    window.location.reload();
    return;
  }

  const value = `/en/${code}`;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;

  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    combo.value = code;
    combo.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
};

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const ref = useRef(null);

  useEffect(() => {
    const stored = getCookie("googtrans");
    const code = stored?.split("/").filter(Boolean)[1];
    if (code) setCurrent(code);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSelect = (code) => {
    setOpen(false);
    setCurrent(code);
    applyLanguage(code);
  };

  const currentLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    <div className="relative notranslate shrink-0" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[11px] text-white/90 font-inter font-medium hover:text-[#00A86B] transition-colors group"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00A86B]/20 transition-colors shrink-0 overflow-hidden text-[11px] leading-none">
          {currentLang.flag}
        </span>
        <span className="hidden md:inline">{currentLang.label}</span>
        <i className={`fas fa-chevron-down text-[7px] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 max-h-72 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-[60]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-2.5 text-left px-3.5 py-2 text-[12px] font-inter transition-colors ${
                current === lang.code
                  ? "bg-[#EAF4FF] text-[#0B3B91] font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-[15px] leading-none">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
