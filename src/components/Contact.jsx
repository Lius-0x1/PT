// src/components/Contact.jsx
import { useState } from "react";

const EMAIL = "juliusadeniy012@gmail.com";
const GITHUB = "https://github.com/Lius-0x1";
// Fill these in. An empty string hides that button.
const LINKEDIN = ""; // e.g. "https://www.linkedin.com/in/your-handle"
const CV = ""; // e.g. "/Julius-Adeniyi-CV.pdf" (put the PDF in the /public folder)

const icon = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const pill =
  "group inline-flex items-center gap-4 rounded-full py-2 pl-6 pr-2 font-[family-name:var(--font-display)] text-base font-semibold outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-[#FF8A47] md:text-lg";
const pillIcon =
  "flex h-10 w-10 items-center justify-center rounded-full";

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...icon}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the email is still a link */
    }
  };

  return (
    // Always dark, in both themes, so the orange accent keeps its contrast.
    <section id="contact" className="bg-[#0F1B1E] text-[#EEF1EC]">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,7.5vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          Got any Geospatial project, software idea
          <span className="block font-[family-name:var(--font-body)] font-normal italic tracking-[-0.02em] text-[#FF8A47]">
            or web app to build?
          </span>
        </h2>

        <p className="mt-12 max-w-[40ch] font-[family-name:var(--font-display)] text-xl font-semibold text-[#EEF1EC]/65 md:mt-16 md:text-3xl">
          Open to junior developer roles, internships and surveying software projects.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="break-all font-[family-name:var(--font-display)] text-[clamp(1.35rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.04em] outline-offset-4 hover:text-[#FF8A47] focus-visible:outline-2 focus-visible:outline-[#FF8A47]"
          >
            {EMAIL}
          </a>

          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-[#EEF1EC]/25 px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold outline-offset-4 transition-colors hover:bg-[#EEF1EC]/10 focus-visible:outline-2 focus-visible:outline-[#FF8A47]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...icon}>
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 md:mt-12 md:gap-4">
          {CV && (
            <a
              href={CV}
              download
              className={`${pill} bg-[#FF8A47] text-[#0F1B1E] hover:bg-[#ff9a60]`}
            >
              Download CV
              <span className={`${pillIcon} bg-[#0F1B1E]/12`}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...icon}>
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                </svg>
              </span>
            </a>
          )}

          {LINKEDIN && (
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className={`${pill} border border-[#EEF1EC]/25 hover:bg-[#EEF1EC]/10`}
            >
              LinkedIn
              <span className={`${pillIcon} bg-[#EEF1EC]/12`}>
                <Arrow />
              </span>
            </a>
          )}

          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className={`${pill} border border-[#EEF1EC]/25 hover:bg-[#EEF1EC]/10`}
          >
            GitHub
            <span className={`${pillIcon} bg-[#EEF1EC]/12`}>
              <Arrow />
            </span>
          </a>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF1EC]/15 pt-6 font-[family-name:var(--font-body)] text-sm text-[#EEF1EC]/65">
          <span>© 2026 Julius Adeniyi</span>
          <span>Built by hand with React and Tailwind</span>
        </footer>
      </div>
    </section>
  );
}