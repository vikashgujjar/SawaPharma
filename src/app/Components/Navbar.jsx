"use client"
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '',
    subMenu: [
      { label: 'Company Profile', href: '/company-profile', icon: 'fas fa-building'       },
      { label: 'Our Presence',    href: '/our-presence',    icon: 'fas fa-map-marker-alt'  },
      { label: 'Our Gallery',     href: '/our-gallery',     icon: 'fas fa-images'          },
    ],
  },
  { label: 'Marketing', href: '/marketing' },
  {
    label: 'Products',
    href: '',
    subMenu: [
      { label: 'Tablets',           href: '/tablets',          icon: 'fas fa-tablets'  },
      { label: 'Liquid Injections', href: '/liquid-injection', icon: 'fas fa-syringe'  },
      { label: 'Dry Injections',    href: '/dry-injection',    icon: 'fas fa-vial'     },
      { label: 'Capsules',          href: '/capsules',         icon: 'fas fa-capsules' },
      { label: 'Syrup',             href: '/syrup',            icon: 'fas fa-flask'    },
    ],
  },
  { label: 'Contact Us', href: '/contact-us' },
];

const NavBar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const menuRef = useRef(null);

  /* normalize: strip trailing slash except for root "/" */
  const path = pathname.replace(/\/$/, '') || '/';

  /* true if this top-level item or any of its children matches current path */
  const isItemActive = (item) => {
    if (item.href && item.href !== '' && path === item.href) return true;
    if (item.subMenu) return item.subMenu.some((sub) => path === sub.href);
    return false;
  };

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* close mobile menu on outside click */
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobileMenuOpen]);

  const toggleDropdown = (index) =>
    setDropdownOpen(dropdownOpen === index ? null : index);

  return (
    <header
      ref={menuRef}
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled
          ? 'shadow-[0_2px_24px_rgba(11,59,145,0.10)] border-b border-gray-100'
          : 'border-b border-gray-100'
      }`}
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-28 mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[72px]">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden ring-2 ring-[#0B3B91]/10 group-hover:ring-[#00A86B]/40 transition-all duration-300 shrink-0">
              <Image
                src="/images/logo/logo.webp"
                alt="Sawa Pharma"
                fill
                className="object-contain p-0.5"
                sizes="(max-width:640px) 36px,(max-width:1024px) 40px,48px"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-poppins font-bold text-[#0B3B91] text-[18px] sm:text-[20px] lg:text-[22px] tracking-tight leading-none">
                Sawa Pharma
              </span>
              <span className="hidden sm:block font-poppins text-[9px] lg:text-[10px] text-[#00A86B] tracking-[0.15em] uppercase font-semibold mt-0.5">
                India Pvt. Ltd.
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────── */}
          <nav className="hidden lg:block">
            <ul className="flex items-center">
              {menuItems.map((item, index) => {
                const active = isItemActive(item);
                return (
                <li key={index} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 xl:px-4 h-[72px] font-poppins text-[12px] xl:text-[13px] font-semibold uppercase tracking-wider transition-colors duration-200 relative
                      ${active ? 'text-[#0B3B91]' : 'text-gray-700 hover:text-[#0B3B91]'}`}
                  >
                    {item.label}
                    {item.subMenu && (
                      <i className={`fa fa-angle-down text-[10px] transition-transform duration-300 group-hover:rotate-180 ${active ? 'text-[#0B3B91]' : 'text-[#0B3B91]/60'}`} />
                    )}
                    {/* underline: always visible when active, animates in on hover */}
                    <span className={`absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[3px] bg-[#0B3B91] rounded-t-full transition-transform duration-300 origin-center
                      ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </Link>

                  {/* Dropdown */}
                  {item.subMenu && (
                    <div className="absolute left-0 top-full w-52 xl:w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white rounded-b-xl shadow-[0_8px_30px_rgba(11,59,145,0.12)] border border-gray-100 border-t-2 border-t-[#0B3B91] overflow-hidden">
                        <div className="py-2">
                          {item.subMenu.map((sub, si) => {
                            const subActive = path === sub.href;
                            return (
                            <Link
                              key={si}
                              href={sub.href}
                              className={`flex items-center gap-3 px-4 xl:px-5 py-3 font-inter text-[12px] xl:text-[13px] font-medium transition-colors duration-150 group/item
                                ${subActive ? 'bg-[#EAF4FF] text-[#0B3B91]' : 'text-gray-600 hover:bg-[#EAF4FF] hover:text-[#0B3B91]'}`}
                            >
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150
                                ${subActive ? 'bg-[#0B3B91]' : 'bg-[#EAF4FF] group-hover/item:bg-[#0B3B91]'}`}>
                                <i className={`${sub.icon} text-[10px] transition-colors duration-150
                                  ${subActive ? 'text-white' : 'text-[#0B3B91] group-hover/item:text-white'}`} />
                              </span>
                              {sub.label}
                            </Link>
                          )})}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )})}
            </ul>
          </nav>

          {/* ── Desktop CTA ──────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <Link
              href="tel:+91"
              className="hidden xl:flex items-center gap-2 text-[12px] xl:text-[13px] font-poppins font-semibold text-[#0B3B91] hover:text-[#00A86B] transition-colors duration-200"
            >
              <i className="fas fa-phone-alt text-[#00A86B] text-xs" />
              Quick Call
            </Link>
            <div className="hidden xl:block w-px h-5 bg-gray-200" />
            <Link
              href="/contact-us"
              className="flex items-center gap-1.5 xl:gap-2 font-poppins font-semibold text-[11px] xl:text-[13px] bg-[#00A86B] text-white px-3 xl:px-5 py-2 xl:py-2.5 rounded-lg hover:bg-[#008f5a] transition-all duration-200 uppercase tracking-wide shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Get a Quote
              <i className="fas fa-arrow-right text-[9px] xl:text-[10px]" />
            </Link>
          </div>

          {/* ── Mobile / Tablet Toggle ───────────────────── */}
          <button
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-gray-200 text-[#0B3B91] hover:bg-[#EAF4FF] transition-colors duration-200 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-sm sm:text-base`} />
          </button>
        </div>
      </div>

      {/* ── Mobile / Tablet Slide-down Menu ─────────────── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ overflowY: mobileMenuOpen ? 'auto' : 'hidden' }}
      >
        <div className="bg-white border-t border-gray-100 px-4 sm:px-6 pt-3 pb-6">

          {/* Nav items */}
          <ul className="flex flex-col gap-0.5">
            {menuItems.map((item, index) => {
              const active = isItemActive(item);
              return (
              <li key={index}>
                <div
                  className="flex items-center justify-between py-3 sm:py-3.5 border-b border-gray-50 cursor-pointer"
                  onClick={() => item.subMenu && toggleDropdown(index)}
                >
                  <Link
                    href={item.href}
                    className={`font-poppins text-[13px] sm:text-[14px] font-semibold uppercase tracking-wide transition-colors
                      ${active ? 'text-[#0B3B91]' : 'text-gray-800 hover:text-[#0B3B91]'}`}
                    onClick={() => !item.subMenu && setMobileMenuOpen(false)}
                  >
                    {item.label}
                    {active && !item.subMenu && (
                      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#00A86B] align-middle" />
                    )}
                  </Link>
                  {item.subMenu && (
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        dropdownOpen === index ? 'bg-[#0B3B91] rotate-180' : active ? 'bg-[#0B3B91]/10' : 'bg-[#EAF4FF]'
                      }`}
                    >
                      <i className={`fa fa-angle-down text-[10px] ${dropdownOpen === index ? 'text-white' : 'text-[#0B3B91]'}`} />
                    </span>
                  )}
                </div>

                {item.subMenu && dropdownOpen === index && (
                  <ul className="mt-1 mb-2 ml-2 pl-3 border-l-2 border-[#0B3B91]/20 flex flex-col gap-0.5">
                    {item.subMenu.map((sub, si) => {
                      const subActive = path === sub.href;
                      return (
                      <li key={si}>
                        <Link
                          href={sub.href}
                          className={`flex items-center gap-3 py-2.5 sm:py-3 px-2 font-inter text-[13px] sm:text-[14px] font-medium transition-colors
                            ${subActive ? 'text-[#0B3B91]' : 'text-gray-600 hover:text-[#0B3B91]'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center shrink-0
                            ${subActive ? 'bg-[#0B3B91]' : 'bg-[#EAF4FF]'}`}>
                            <i className={`${sub.icon} text-[9px] ${subActive ? 'text-white' : 'text-[#0B3B91]'}`} />
                          </span>
                          {sub.label}
                          {subActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00A86B]" />}
                        </Link>
                      </li>
                    )})}
                  </ul>
                )}
              </li>
            )})}
          </ul>

          {/* Mobile CTAs */}
          <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link
              href="/contact-us"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0B3B91] text-white font-poppins font-semibold text-[13px] sm:text-[14px] py-3 sm:py-3.5 rounded-lg uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
              <i className="fas fa-arrow-right text-[10px]" />
            </Link>
            <Link
              href="tel:+91"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-[#00A86B] text-[#00A86B] font-poppins font-semibold text-[13px] sm:text-[14px] py-3 sm:py-3.5 rounded-lg uppercase tracking-wide hover:bg-[#00A86B] hover:text-white transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fas fa-phone-alt text-xs" />
              Quick Call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
