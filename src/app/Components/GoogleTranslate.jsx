"use client";
import Script from "next/script";

// Codes for our export markets. Google Translate doesn't have a distinct
// "Dari" code — "fa" (Persian) is the closest supported language and is
// mutually intelligible with Dari.
const INCLUDED_LANGUAGES = "en,ru,tg,pt,fr,ln,sw,ps,fa,km,so,ar";

const GoogleTranslate = () => {
  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "${INCLUDED_LANGUAGES}",
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              "google_translate_element"
            );
          }
        `}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleTranslate;
