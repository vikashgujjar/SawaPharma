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

/* Google's own Translate script sets its own `googtrans` cookie (in
   addition to whatever we set below) when the hidden combo dropdown
   fires its change event — and it commonly scopes that cookie to a
   leading-dot domain (e.g. ".sawapharma.in") rather than the exact
   hostname. If we only ever clear the exact-hostname variant, that
   cookie survives a "reset to English" and gets re-read on reload,
   which is why switching back to English didn't stick. Compute every
   plausible domain variant so set/clear always stays in sync. */
const getCookieDomains = () => {
  const hostname = window.location.hostname;
  const domains = [undefined, hostname, `.${hostname}`];
  const parts = hostname.split(".");
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);
  return domains;
};

const writeGoogTransCookie = (value) => {
  getCookieDomains().forEach((domain) => {
    document.cookie = `googtrans=${value};path=/${domain ? `;domain=${domain}` : ""}`;
  });
};

const clearGoogTransCookie = () => {
  getCookieDomains().forEach((domain) => {
    document.cookie = `googtrans=;path=/${domain ? `;domain=${domain}` : ""};expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  });
};

const applyLanguage = (code) => {
  if (code === "en") {
    clearGoogTransCookie();
    // Belt-and-suspenders: some browsers don't fully honor expiry-based
    // deletion for every domain variant, so also overwrite with an
    // explicit en->en (no-op) value across the same variants, guaranteeing
    // no leftover cookie can still point at a translated language.
    writeGoogTransCookie("/en/en");
    window.location.reload();
    return;
  }

  writeGoogTransCookie(`/en/${code}`);

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
        <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 top-full mt-2 w-48 max-w-[calc(100vw-1.5rem)] max-h-72 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-[60]">
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
