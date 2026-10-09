// src/components/Work.jsx
import { useEffect, useRef, useState } from "react";
import { GITHUB } from "../config";

// ============================================================
// PROJECT DATA
// ============================================================
//
// Each project gets a cover, in this order:
//   1. image: a real screenshot or map (put it in /public/work/, e.g. "/work/btg.jpg")
//   2. art:   an illustrated cover from the ART list below
//   3. neither: a plain cover with the project number
// The illustrated covers are drawings, not screenshots. Replace them with a real image
// as soon as you have one.
//
// Optional per project, when you use an image:
//   fit:   "cover" (default) fills the whole frame and crops the edges.
//          "contain" shows the whole image with no cropping.
//   focus: which part to keep when cropping, e.g. "top" for website screenshots.

const TRACKS = {
  development: {
    label: "Development",
    projects: [
      {
        name: "Before They Graduate",
        stack: "JavaScript",
        kind: "Live platform",
        role: "I currently manage and maintain it",
        text: "A platform where students find resources and opportunities before they graduate.",
        tags: ["JavaScript", "Vercel", "next.js"],
        image: "/work/btg.png",
        focus: "left",
        art: "steps",
        imageAlt: "Before They Graduate home page",
        links: [
          {
            label: "Live site",
            href: "https://beforetheygraduate.vercel.app",
          },
          {
            label: "Source",
            href: `${GITHUB}/btg`,
          },
        ],
      },
      {
        name: "Planetary Data Explorer",
        stack: "React, Vite",
        kind: "TS Academy training project",
        role: "Image Gallery component, in a six-person TS Academy capstone team",
        text: "A single-page app for exploring planetary metrics and solar system data, migrated from static HTML and CSS into React components. My gallery fetches each planet's name, distance from the Sun and image from the provided API and renders them in a responsive grid.",
        tags: ["React", "Vite", "Fetch API", "Git"],
        image: "/work/capstone.png",
        fit: "contain",
        art: "planets",
        imageAlt: "Group 18 Planetary Data Explorer home page",
        links: [
          {
            label: "Live site",
            href: "https://group-18-capstone-project.vercel.app/",
          },
          {
            label: "Source",
            href: "https://github.com/zinoefezino/Capstone-project",
          },
        ],
      },
    ],
  },

  geospatial: {
    label: "Geospatial",
    projects: [
      {
        name: "Land cover change and afforestation suitability, Ose (Ifon)",
        stack: "GIS, remote sensing, Fuzzy AHP",
        kind: "FUTA academic project",
        role: "",
        text: "Analysed land-use and land-cover change from satellite imagery, then used a Fuzzy AHP approach to combine environmental and spatial criteria into an afforestation suitability map. Documented the method and results in a technical research report.",
        tags: ["GIS", "Remote sensing", "Satellite imagery", "Fuzzy AHP"],
        image: "/work/ifon.png",
        fit:"contain",
        art: "landcover",
        imageAlt: "Afforestation suitability map of Ose (Ifon)",
        links: [],
      },

      {
        name: "Road network, terrain and drainage analysis, FUTA",
        stack: "ArcGIS Desktop, DEM",
        kind: "FUTA academic project",
        role: "",
        text: "Built a GIS workflow analysing roads, terrain and drainage across the FUTA campus: slope and hillshade, Fill and Flow Accumulation, and buffer-based proximity analysis.",
        tags: ["ArcGIS Desktop", "DEM", "Terrain analysis", "Hydrology"],
        image: "/work/pj2.png",
        fit:"contain",
        art: "terrain",
        imageAlt: "Terrain and drainage map of the FUTA campus",
        links: [],
      },

      {
        name: "Rainfall and vegetation, Katsina and Sokoto",
        stack: "CHIRPS, TAMSAT, MODIS NDVI",
        kind: "Analysis project",
        role: "",
        text: "Measures rainfall variability with coefficient of variation, SPI and Mann-Kendall trends, then correlates it with NDVI. Caught incomplete 2026 rainfall values that were producing a false declining trend.",
        tags: ["QGIS", "Python", "Remote sensing"],
        image: "/work/pj3.png",
        art: "rainfall",
        imageAlt: "Rainfall variability map of Katsina and Sokoto",
        links: [],
      },
    ],
  },
};

// ============================================================
// ILLUSTRATED COVERS
// ============================================================
// Drawn with the theme colours, so they switch with light and dark mode.

const stroke = (o = 1, w = 2) => ({
  fill: "none",
  stroke: "var(--paper)",
  strokeOpacity: o,
  strokeWidth: w,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});
const fillPaper = (o) => ({ fill: "var(--paper)", fillOpacity: o });
const FLAG_FILL = { fill: "var(--flag)" };
const flagStroke = (w = 2.5, o = 0.95) => ({
  fill: "none",
  stroke: "var(--flag)",
  strokeOpacity: o,
  strokeWidth: w,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

function Art({ children }) {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// Before They Graduate: steps toward a goal, with opportunities floating above them
function StepsArt() {
  const steps = [0, 1, 2, 3, 4];
  return (
    <Art>
      {steps.map((i) => {
        const x = 50 + i * 62;
        const top = 200 - i * 30;
        return (
          <rect key={`s${i}`} x={x} y={top} width="62" height={215 - top} style={fillPaper(0.1 + i * 0.07)} />
        );
      })}
      {[0, 1, 2, 3].map((i) => {
        const x = 58 + i * 62;
        const y = 200 - i * 30 - 50;
        return (
          <g key={`c${i}`}>
            <rect x={x} y={y} width="46" height="30" rx="6" style={i === 3 ? FLAG_FILL : stroke(0.6, 1.8)} />
            <line x1={x + 9} y1={y + 12} x2={x + 37} y2={y + 12} style={i === 3 ? { stroke: "var(--ink)", strokeWidth: 2, strokeLinecap: "round" } : stroke(0.45, 1.8)} />
            <line x1={x + 9} y1={y + 21} x2={x + 26} y2={y + 21} style={i === 3 ? { stroke: "var(--ink)", strokeWidth: 2, strokeLinecap: "round" } : stroke(0.45, 1.8)} />
          </g>
        );
      })}
      <line x1="330" y1="80" x2="330" y2="38" style={stroke(0.9, 2.5)} />
      <path d="M330 38 L364 51 L330 64 Z" style={FLAG_FILL} />
    </Art>
  );
}

// Planetary Data Explorer: a sun and orbiting planets
function PlanetsArt() {
  const cx = 70;
  const cy = 125;
  const bodies = [
    { r: 60, a: -30, s: 5 },
    { r: 100, a: 40, s: 8 },
    { r: 150, a: -15, s: 11, ring: true },
    { r: 205, a: 25, s: 9 },
    { r: 265, a: -5, s: 6 },
  ];
  return (
    <Art>
      {bodies.map((b) => (
        <circle key={`o${b.r}`} cx={cx} cy={cy} r={b.r} style={stroke(0.25, 1.5)} />
      ))}
      <circle cx={cx} cy={cy} r="26" style={FLAG_FILL} />
      {bodies.map((b) => {
        const rad = (b.a * Math.PI) / 180;
        const x = cx + b.r * Math.cos(rad);
        const y = cy + b.r * Math.sin(rad);
        return (
          <g key={`p${b.r}`}>
            <circle cx={x} cy={y} r={b.s} style={fillPaper(0.9)} />
            {b.ring && (
              <ellipse cx={x} cy={y} rx={b.s * 2.2} ry={b.s * 0.55} transform={`rotate(-20 ${x} ${y})`} style={stroke(0.8, 1.8)} />
            )}
          </g>
        );
      })}
    </Art>
  );
}

// Ose (Ifon): a classified land-cover map, with suitable areas picked out
const CELLS = [];
for (let r = 0; r < 10; r++) {
  for (let c = 0; c < 16; c++) {
    const v =
      Math.sin(c * 0.62) + Math.cos(r * 0.85) + Math.sin((c + r) * 0.37) + Math.cos((c - r) * 0.29);
    CELLS.push({ x: c * 25, y: r * 25, v });
  }
}

function LandcoverArt() {
  return (
    <Art>
      {CELLS.map((cell, i) => {
        const suitable = cell.v > 2.1;
        const op = cell.v < -1.2 ? 0.1 : cell.v < 0 ? 0.22 : cell.v < 1.2 ? 0.38 : 0.58;
        return (
          <rect
            key={i}
            x={cell.x + 0.5}
            y={cell.y + 0.5}
            width="24"
            height="24"
            style={suitable ? { ...FLAG_FILL, fillOpacity: 0.9 } : fillPaper(op)}
          />
        );
      })}
    </Art>
  );
}

// FUTA campus: contour lines of a hill, with drainage flowing off it
const contour = (k) => {
  const base = 18 + k * 15;
  let d = "";
  for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * Math.PI * 2;
    const r = base * (1 + 0.1 * Math.sin(3 * t + k * 0.35) + 0.06 * Math.sin(5 * t - k * 0.2));
    const x = 210 + r * 1.4 * Math.cos(t);
    const y = 125 + r * 0.95 * Math.sin(t);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return `${d}Z`;
};
const CONTOURS = Array.from({ length: 9 }, (_, k) => contour(k + 1));

function TerrainArt() {
  return (
    <Art>
      {CONTOURS.map((d, i) => (
        <path key={i} d={d} style={stroke(0.22 + i * 0.05, 1.6)} />
      ))}
      <path d="M215 112 C 232 152 198 192 230 250" style={flagStroke()} />
      <path d="M190 100 C 160 150 176 200 150 250" style={flagStroke()} />
      <path d="M250 106 C 286 140 270 190 302 250" style={flagStroke()} />
    </Art>
  );
}

// Katsina and Sokoto: incomplete data drags a trend line down; the real trend is flat
const RAIN = [118, 98, 132, 110, 126, 104, 138, 112, 122, 100, 130, 116];

function RainfallArt() {
  return (
    <Art>
      <line x1="40" y1="215" x2="385" y2="215" style={stroke(0.4, 1.5)} />
      <line x1="40" y1="40" x2="40" y2="215" style={stroke(0.4, 1.5)} />
      <line x1="60" y1="118" x2="372" y2="118" style={stroke(0.6, 2)} />
      <line x1="60" y1="112" x2="372" y2="198" strokeDasharray="7 7" style={flagStroke(2.5, 0.95)} />
      {RAIN.map((y, i) => (
        <circle key={i} cx={60 + i * 24} cy={y} r="4" style={fillPaper(0.85)} />
      ))}
      {[348, 372].map((x, i) => (
        <circle key={x} cx={x} cy={i ? 198 : 192} r="5" style={{ ...flagStroke(2.5), fill: "none" }} />
      ))}
    </Art>
  );
}


const ART = {
  steps: StepsArt,
  planets: PlanetsArt,
  landcover: LandcoverArt,
  terrain: TerrainArt,
  rainfall: RainfallArt,
};

// ============================================================
// SCROLL REVEAL
// ============================================================
//
// Instead of changing React state inside the IntersectionObserver,
// this version directly toggles a CSS class.
//
// That avoids the react-hooks/set-state-in-effect warning.
// ============================================================

function useInView() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Respect reduced-motion preferences.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}

// ============================================================
// ARROW ICON
// ============================================================

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

// ============================================================
// PROJECT COVER
// ============================================================

function Cover({ p, index, wide }) {
  const [broken, setBroken] = useState(false);
  const showImage = p.image && !broken;
  const Drawing = p.art ? ART[p.art] : null;
  // fit: "cover" fills the whole frame (crops the edges); "contain" shows the whole image.
  const fit = p.fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden bg-ink ${
        wide ? "md:aspect-auto md:min-h-[19rem] md:w-1/2 md:shrink-0" : ""
      }`}
    >
      {showImage ? (
        <img
          src={p.image}
          alt={p.imageAlt || p.name}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          style={{ objectPosition: p.focus || "center" }}
          className={`absolute inset-0 h-full w-full ${fit} transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none`}
        />
      ) : Drawing ? (
        <>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none">
            <Drawing />
          </div>
          <span className="absolute left-5 top-4 font-[family-name:var(--font-display)] text-sm font-bold text-paper/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-6 text-paper md:p-8">
          <span className="font-[family-name:var(--font-display)] text-[clamp(4rem,9vw,7rem)] font-extrabold leading-none tracking-[-0.05em]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex items-end justify-between gap-4">
            <span className="font-[family-name:var(--font-body)] text-sm opacity-80">
              {p.stack}
            </span>

            <span
              aria-hidden="true"
              className="h-1 w-12 rounded-full bg-flag"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROJECT CARD
// ============================================================

function Card({ p, index, wide }) {
  const ref = useInView();

  return (
    <article
      ref={ref}
      className={`work-card group flex flex-col overflow-hidden rounded-3xl border border-ink/15 bg-ink/[0.03] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/40 hover:shadow-xl motion-reduce:transition-none ${
        wide ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <Cover p={p} index={index} wide={wide} />

      <div className="flex flex-1 flex-col p-6 md:p-8">
        {p.kind && (
          <p className="mb-3 self-start rounded-full bg-ink/10 px-3 py-1 font-[family-name:var(--font-body)] text-xs font-semibold">
            {p.kind}
          </p>
        )}

        <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
          {p.name}
        </h3>

        <p className="mt-1 font-[family-name:var(--font-body)] text-sm text-ink/70">
          {p.stack}
        </p>

        {p.role && (
          <p className="mt-3 font-[family-name:var(--font-body)] text-sm italic text-ink/80">
            {p.role}
          </p>
        )}

        <p className="mt-4 max-w-[60ch] font-[family-name:var(--font-body)] text-base leading-relaxed md:text-lg">
          {p.text}
        </p>

        {p.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/30 px-3 py-1 font-[family-name:var(--font-body)] text-sm transition-colors hover:bg-ink hover:text-paper"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {p.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {p.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold outline-offset-4 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-flag ${
                  i === 0
                    ? "bg-ink text-paper hover:bg-ink-deep"
                    : "border-2 border-ink hover:bg-ink hover:text-paper"
                }`}
              >
                {l.label}
                <ArrowIcon />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// ============================================================
// WORK SECTION
// ============================================================

export default function Work() {
  const [track, setTrack] = useState("development");

  const keys = Object.keys(TRACKS);
  const shown = TRACKS[track].projects;

  // First card is featured.
  // If the last card would sit alone, widen it too.
  const lastIsAlone =
    shown.length > 1 && (shown.length - 1) % 2 === 1;

  return (
    <section id="work" className="text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">

        {/* HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-6">
          <div>
            <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">
              Selected work
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight md:text-5xl">
              Things I&apos;ve built and worked on
            </h2>

            <p className="mt-3 max-w-[55ch] font-[family-name:var(--font-body)] text-lg text-ink/75">
              A mix of software development and geospatial work from training,
              academic projects, personal builds and real-world experience.
            </p>
          </div>

          {/* TRACK SWITCHER */}
          <div
            role="group"
            aria-label="Type of work"
            className="relative inline-flex rounded-full border-2 border-ink p-1"
          >
            {keys.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={track === key}
                onClick={() => setTrack(key)}
                className={`relative z-10 rounded-full px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold outline-offset-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-flag md:text-base ${
                  track === key
                    ? "bg-ink text-paper shadow-md"
                    : "text-ink hover:bg-ink/10"
                }`}
              >
                {TRACKS[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECT GRID */}
        <div
          key={track}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {shown.map((p, i) => (
            <Card
              key={`${track}-${p.name}`}
              p={p}
              index={i}
              wide={
                i === 0 ||
                (lastIsAlone && i === shown.length - 1)
              }
            />
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        .work-card {
          opacity: 0;
          transform: translateY(28px) scale(0.985);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 300ms ease,
            box-shadow 300ms ease;
        }

        .work-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .work-card:nth-child(1) {
          transition-delay: 80ms;
        }

        .work-card:nth-child(2) {
          transition-delay: 160ms;
        }

        .work-card:nth-child(3) {
          transition-delay: 240ms;
        }

        .work-card:nth-child(4) {
          transition-delay: 320ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .work-card {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}