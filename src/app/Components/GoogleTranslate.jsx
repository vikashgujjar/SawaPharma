"use client";
import Script from "next/script";

// Codes for our export markets. Google Translate doesn't have a distinct
// "Dari" code — "fa" (Persian) is the closest supported language and is
// mutually intelligible with Dari.
const INCLUDED_LANGUAGES = "en,ru,tg,pt,fr,ln,sw,ps,fa,km,so,ar";

const GoogleTranslate = () => {
  return (
    <>
      {/* Google Translate rewrites text nodes directly in the DOM. If a
          component re-renders afterward (e.g. Topbar's async data fetch),
          React can try to remove/insert a node Translate has already
          restructured and throw "removeChild on Node" — which unmounts
          whatever it was rendering. Patch the two DOM methods to no-op
          instead of throwing when that happens; this is the standard
          workaround for the React + Google Translate conflict. */}
      <Script id="google-translate-dom-patch" strategy="beforeInteractive">
        {`
          (function () {
            if (typeof Node !== "function" || !Node.prototype) return;
            var originalRemoveChild = Node.prototype.removeChild;
            Node.prototype.removeChild = function (child) {
              if (child.parentNode !== this) {
                return child;
              }
              return originalRemoveChild.apply(this, arguments);
            };
            var originalInsertBefore = Node.prototype.insertBefore;
            Node.prototype.insertBefore = function (newNode, referenceNode) {
              if (referenceNode && referenceNode.parentNode !== this) {
                return newNode;
              }
              return originalInsertBefore.apply(this, arguments);
            };
          })();
        `}
      </Script>
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
