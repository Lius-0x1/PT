// src/components/Hero.jsx
import { useEffect, useState } from "react";

// Edit your copy here
const NAME = ["Julius", "Adeniyi"];
const TAGLINE = "Software Developer & Geospatial Technologist.";
const BIO =
  "I build web applications and explore how software, AI, and geospatial technology can solve real-world problems.";
const PHOTO = "/lius.jpeg"; // put your image in the /public folder
const PHOTO_CAPTION = "Software Engineer";

// Line above the name
const META_LEFT = "Surveying and Geoinformatics student, software developer, AI enthusiast";
const STATUS = "Available for jobs, internships and collaborations";
const LOCATION = "Nigeria"; // swap for your city if you like

// Rotating focus below the name: list only what your projects can back up
const FOCUS = [
  "Software Engineer",
  "Geospatial Analyst",
  "GIS analysis",
  "Frontend Developer",
  "Backend Developer",
  "AI Engineer",
  "Surveying by discipline",
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
  return (
    <span className="tabular-nums">
      {LOCATION} {time} WAT
    </span>
  );
}

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Step by 1 so every item shows in the order you wrote it.
    const id = setInterval(() => setI((n) => (n + 1) % FOCUS.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <span className="sr-only">{FOCUS.join(", ")}</span>
      <span key={FOCUS[i]} aria-hidden="true" className="hero-swap block">
        {FOCUS[i]}
      </span>
    </>
  );
}

export default function Hero() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="top" className="bg-paper text-ink">
      {/* Mobile order: meta, name, photo, intro. Desktop: meta on top, name left, photo right, intro under the name. */}
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl content-center gap-8 px-6 py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-x-10 md:px-10 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-[family-name:var(--font-display)] text-sm text-ink/75 md:col-span-2 md:row-start-1">
          <span>{META_LEFT}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Clock />
            <span className="flex items-center gap-2 font-semibold text-ink">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-flag motion-safe:animate-pulse"
              />
              {STATUS}
            </span>
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,22vw,6.5rem)] font-extrabold leading-[0.88] tracking-[-0.05em] md:col-start-1 md:row-start-2 md:self-end">
          {NAME[0]}
          <br />
          {NAME[1]}
        </h1>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ink md:col-start-2 md:row-span-2 md:row-start-2 md:aspect-[4/5] md:max-w-sm md:self-center md:justify-self-center">
          {photoOk ? (
            <img
              src={PHOTO}
              alt="Julius Adeniyi"
              className="h-full w-full object-cover"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center font-[family-name:var(--font-display)] text-7xl font-extrabold text-paper"
            >
              JA
            </span>
          )}
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-4 py-1.5 font-[family-name:var(--font-body)] text-sm text-paper backdrop-blur">
            {PHOTO_CAPTION}
          </span>
        </div>

        {/* Intro sits slightly under the name, offset to the right of a small focus label */}
        <div className="grid gap-6 md:col-start-1 md:row-start-3 md:grid-cols-[0.6fr_1fr] md:self-start">
          <div>
            <p className="font-[family-name:var(--font-body)] text-sm text-ink/70">
              Focus
            </p>
            {/* Room for two lines, so long titles wrap instead of being cut off */}
            <p className="mt-1 min-h-[3.25rem] font-[family-name:var(--font-display)] text-lg font-semibold leading-tight md:text-xl">
              <Rotator />
            </p>
          </div>

          <div>
            <p className="max-w-[26ch] font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
              {TAGLINE}
            </p>

            <p className="mt-4 max-w-[48ch] font-[family-name:var(--font-body)] text-base leading-relaxed text-ink/75">
              {BIO}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <a
                href="#work"
                className="rounded-full bg-ink px-7 py-3.5 font-[family-name:var(--font-display)] font-semibold text-paper outline-offset-4 transition-colors hover:bg-ink-deep focus-visible:outline-2 focus-visible:outline-flag"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="rounded-full border-2 border-ink px-7 py-3.5 font-[family-name:var(--font-display)] font-semibold outline-offset-4 transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-flag"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-swap { animation: hero-swap-in 0.5s ease-out; }
        @keyframes hero-swap-in {
          from { opacity: 0; transform: translateY(0.6em); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-swap { animation: none; }
        }
      `}</style>
    </section>
  );
}