// src/components/Experience.jsx
import { useEffect, useRef, useState } from "react";
import { CV, useFileExists } from "../config";

// Two tracks. Edit the copy here.
// org / year / text / points are optional: leave them out and they simply don't show.
// Software track is oldest first. GIS track is ordered strongest first.
const TRACKS = {
  software: {
    label: "Software and web",
    switchTo: "Experience in GIS and geospatial",
    entries: [
      {
        n: "01",
        headline: "Building the Backend",
        org: "TS Academy",
        year: "2026",
        role: "Backend Developer",
        text: "My first real exposure to collaborative software development. I worked on the backend of a team project, handling API-related functionality and learning how frontend interfaces, backend logic, and data communicate as one system.",
        tags: ["APIs", "Backend", "Team Development"],
      },
      {
        n: "02",
        headline: "From Developer to Team Lead",
        org: "Locus Africa",
        year: "2026",
        role: "Web Development Team Lead",
        text: "Moved from simply writing code to helping other people ship it. I coordinated a web-development team, broke work into manageable tasks, supported teammates through technical challenges, and helped drive projects from ideas toward working implementations.",
        tags: ["Web Development", "Leadership", "Collaboration"],
      },
      {
        n: "03",
        headline: "30 Days of Building & Experimenting",
        org: "RAIN",
        year: "2024",
        role: "30-Day Challenge",
        text: "A month-long challenge exploring robotics, artificial intelligence, and innovation through hands-on problem solving. It challenged me to learn quickly, experiment with unfamiliar technologies, and turn concepts into practical work.",
        tags: ["AI", "Robotics", "Innovation", "Rapid Prototyping"],
      },
    ],
  },
  gis: {
    label: "GIS and geospatial",
    switchTo: "Experience in software and web",
    entries: [
      {
        n: "01",
        headline: "Ose (Ifon), Ondo State",
        org: "FUTA",
        year: "",
        role: "Land use and land cover change, and afforestation suitability",
        text: "Analysed land-use and land-cover patterns in Ose (Ifon) with GIS and remote-sensing data.",
        points: [
          "Classified satellite imagery and analysed land-cover change.",
          "Used a Fuzzy AHP approach to combine environmental and spatial criteria into an afforestation suitability map.",
          "Produced thematic maps and documented the method and results in a technical research report.",
        ],
        tags: ["GIS", "Remote sensing", "Satellite imagery", "Fuzzy AHP", "Spatial analysis"],
      },
      {
        n: "02",
        headline: "FUTA campus",
        org: "FUTA",
        year: "",
        role: "Road network, terrain and drainage analysis",
        text: "Built a GIS workflow for roads, terrain and drainage within FUTA, using elevation, contour, road and boundary data.",
        points: [
          "Generated slope and hillshade from the elevation data.",
          "Ran hydrological processing with Fill and Flow Accumulation.",
          "Used buffering to analyse proximity between roads, terrain, drainage and selected locations.",
        ],
        tags: ["ArcGIS Desktop", "DEM", "Terrain analysis", "Hydrological analysis"],
      },
      {
        n: "03",
        headline: "Katsina and Sokoto",
        org: "",
        year: "",
        role: "Rainfall and vegetation analysis",
        text: "Measures rainfall variability with coefficient of variation, SPI and Mann-Kendall trends, then correlates it with NDVI. Caught incomplete 2026 rainfall values that were producing a false declining trend.",
        tags: ["CHIRPS", "TAMSAT", "MODIS NDVI", "QGIS", "Python"],
      },
      {
        n: "04",
        headline: "FUTA Survey Camp",
        org: "FUTA Annex, Ibule-Soro",
        year: "",
        role: "Surveying and GNSS field data collection",
        text: "Practical fieldwork collecting, processing and applying spatial data for surveying and mapping.",
        points: [
          "Ran topographic, detail, route and perimeter surveys, plus traverse and levelling, and helped establish and use survey control.",
          "Collected coordinates with GNSS/RTK in base/rover setups, including stakeout and coordinate transformation.",
          "Applied the measurements to road alignment, cross-sectioning, contouring, construction and drainage tasks.",
          "Organised field data for survey computations and GIS mapping, including static GNSS observation.",
        ],
        tags: ["Total station", "GNSS/RTK", "Levels", "Theodolite", "EDM", "Handheld GPS"],
      },
      {
        n: "05",
        headline: "Academic projects",
        org: "FUTA",
        year: "",
        role: "Geospatial data and mapping workflow",
        text: "Worked with vector and raster data to build maps, run spatial analysis and present geographic information.",
        points: [
          "Prepared and organised datasets, working with coordinate reference systems and projections.",
          "Created thematic maps and used spatial analysis tools to derive new information.",
          "Presented findings through maps and technical documentation.",
        ],
        tags: ["ArcGIS Desktop", "AutoCAD", "Surfer", "Google Earth Pro", "ArcGIS Earth", "Excel"],
      },
     
    ],
  },
};

// ---- Orbit ring: fills as you scroll, one node per entry ----
const SIZE = 300;
const C = SIZE / 2;
const R = 118;
const pad = (n) => String(n).padStart(2, "0");
const polar = (deg, r = R) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};

function OrbitRing({ progress, active, list }) {
  const n = list.length;
  const [hx, hy] = polar(-90 + progress * 360);

  return (
    <div className="relative mx-auto aspect-square w-24 sm:w-28 md:w-[min(20rem,62svh)] lg:w-[min(26rem,66svh)]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" aria-hidden="true" focusable="false">
        {/* slow decorative orbit */}
        <circle
          className="ring-orbit"
          cx={C}
          cy={C}
          r={R + 24}
          fill="none"
          strokeWidth="2"
          strokeDasharray="2 12"
          strokeLinecap="round"
          style={{ stroke: "var(--ink)", opacity: 0.3 }}
        />

        {/* track */}
        <circle cx={C} cy={C} r={R} fill="none" strokeWidth="6" style={{ stroke: "var(--ink)", opacity: 0.14 }} />

        {/* progress arc, starts at the top */}
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1 1"
          strokeDashoffset={1 - progress}
          transform={`rotate(-90 ${C} ${C})`}
          style={{ stroke: "var(--flag)" }}
        />

        {/* travelling head */}
        <circle cx={hx} cy={hy} r="16" style={{ fill: "var(--flag)", opacity: 0.25 }} />
        <circle cx={hx} cy={hy} r="8" style={{ fill: "var(--flag)" }} />

        {/* one node per entry */}
        {list.map((e, i) => {
          const [x, y] = polar(-90 + (360 * i) / n);
          const reached = progress >= i / n - 0.0001;
          return (
            <g key={e.role}>
              {i === active && (
                <circle cx={x} cy={y} r="27" fill="none" strokeWidth="3" style={{ stroke: "var(--flag)" }} />
              )}
              <circle
                cx={x}
                cy={y}
                r="19"
                strokeWidth="2.5"
                style={{
                  fill: reached ? "var(--ink)" : "var(--paper)",
                  stroke: "var(--ink)",
                  strokeOpacity: reached ? 1 : 0.4,
                }}
              />
              <text
                className="max-md:hidden"
                x={x}
                y={y}
                dy="0.35em"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                style={{ fill: reached ? "var(--paper)" : "var(--ink)", fontFamily: "var(--font-display)" }}
              >
                {e.n}
              </text>
            </g>
          );
        })}
      </svg>

      {/* centre readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p key={active} className="ring-num font-[family-name:var(--font-display)] font-extrabold leading-none">
          <span className="text-2xl sm:text-3xl md:text-7xl lg:text-8xl">{list[active].n}</span>
          <span className="text-xs font-semibold text-ink/50 sm:text-sm md:text-2xl lg:text-3xl">/{pad(n)}</span>
        </p>
        {list[active].year && (
          <p className="mt-2 hidden font-[family-name:var(--font-body)] text-ink/70 md:block md:text-base lg:text-lg">
            {list[active].year}
          </p>
        )}
      </div>
    </div>
  );
}

// Faint watermark. textLength stretches the word to span the full width of the panel.
const WM = {
  fill: "var(--ink)",
  opacity: 0.07,
  fontFamily: "var(--font-display)",
  fontWeight: 800,
};

function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
    >
      {/* Desktop: one line, edge to edge */}
      <svg viewBox="0 0 1000 134" className="hidden w-full md:block">
        <text x="0" y="124" fontSize="170" textLength="1000" lengthAdjust="spacingAndGlyphs" style={WM}>
          EXPERIENCE
        </text>
      </svg>
      {/* Mobile: two lines so the letters stay large */}
      <svg viewBox="0 0 1000 460" className="w-full md:hidden">
        <text x="0" y="215" fontSize="300" textLength="1000" lengthAdjust="spacingAndGlyphs" style={WM}>
          EXPER
        </text>
        <text x="0" y="450" fontSize="300" textLength="1000" lengthAdjust="spacingAndGlyphs" style={WM}>
          IENCE
        </text>
      </svg>
    </div>
  );
}

export default function Experience() {
  const [track, setTrack] = useState("software");
  const [progress, setProgress] = useState(0);
  const wrapRef = useRef(null);
  const panelRef = useRef(null);

  const current = TRACKS[track];
  const list = current.entries;
  const cvOk = useFileExists(CV[track].href); // the CV that matches the view you're on
  const active = Math.min(list.length - 1, Math.floor(progress * list.length));

  // Where the panel sticks (read from CSS so it always matches the classes below).
  const pinTop = () =>
    parseFloat(getComputedStyle(panelRef.current).top) || 64;

  // The section stays pinned while you scroll; scroll position drives the ring.
  useEffect(() => {
    const el = wrapRef.current;
    const panel = panelRef.current;
    if (!el || !panel) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const top = pinTop();
      const travel = rect.height - panel.offsetHeight; // distance the panel stays stuck
      const p = travel > 0 ? Math.min(1, Math.max(0, (top - rect.top) / travel)) : 0;
      setProgress(Math.round(p * 500) / 500);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Switch tracks and return to the first entry of the new track.
  const switchTrack = () => {
    setTrack((t) => (t === "software" ? "gis" : "software"));
    setProgress(0);
    const el = wrapRef.current;
    if (el) {
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().top - pinTop(),
        behavior: "auto",
      });
    }
  };

  return (
    // No background fill: the page colour shows through.
    <section id="experience" className="text-ink">
      {/* Tall wrapper = scroll distance. The inner panel stays fixed while it passes. */}
      <div
        ref={wrapRef}
        className="relative"
        style={{ height: `calc(${list.length} * 75svh + 40svh)` }}
      >
        <div
          ref={panelRef}
          className="sticky top-[4.5rem] flex h-[calc(100svh-5.5rem)] flex-col overflow-hidden bg-transparent md:top-20 md:h-[min(40rem,calc(100svh-7rem))]"
        >
          <Watermark />

          <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-6 py-4 md:px-10 md:py-6">
            <div className="exp-grid min-h-0 flex-1">
              <div className="exp-title">
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                  Experience
                </h2>
                <p className="mt-1 font-[family-name:var(--font-body)] text-base text-ink/70">
                  {current.label}
                </p>
              </div>

              <div className="exp-btn flex flex-wrap gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={switchTrack}
                  className="rounded-full border-2 border-ink px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold outline-offset-4 transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-flag md:text-base"
                >
                  {current.switchTo}
                </button>

                {cvOk && (
                  <a
                    href={CV[track].href}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold text-paper outline-offset-4 transition-colors hover:bg-ink-deep focus-visible:outline-2 focus-visible:outline-flag md:text-base"
                  >
                    Download {CV[track].label}
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
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="exp-ring">
                <OrbitRing progress={progress} active={active} list={list} />
              </div>

              {/* All entries share one cell; only the active one is visible. */}
              <div className="exp-entries grid">
                {list.map((e, i) => {
                  const meta = [e.org, e.year].filter(Boolean).join(", ");
                  return (
                    <article
                      key={`${track}-${e.role}`}
                      className={`[grid-area:1/1] transition-all duration-500 motion-reduce:transition-none ${
                        active === i
                          ? "translate-y-0 opacity-100"
                          : `pointer-events-none opacity-0 ${
                              i < active ? "-translate-y-6" : "translate-y-6"
                            }`
                      }`}
                    >
                      <p className="flex items-baseline gap-3 font-[family-name:var(--font-display)] text-sm font-semibold text-ink/75">
                        <span>{e.n}</span>
                        <span>{e.headline}</span>
                      </p>

                      <h3
                        className={`mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold leading-tight tracking-tight md:mt-3 ${
                          e.points ? "md:text-3xl" : "md:text-4xl"
                        } ${e.points ? "" : "sm:text-2xl"}`}
                      >
                        {e.role}
                      </h3>
                      {meta && (
                        <p className="mt-1 font-[family-name:var(--font-body)] text-sm text-ink/80 md:text-lg">
                          {meta}
                        </p>
                      )}

                      {e.text && (
                        <p className="mt-2 max-w-[60ch] font-[family-name:var(--font-body)] text-sm leading-relaxed md:mt-4 md:text-lg">
                          {e.text}
                        </p>
                      )}

                      {e.points && (
                        <ul className="mt-2 max-w-[62ch] list-disc space-y-1 pl-5 font-[family-name:var(--font-body)] text-sm leading-snug marker:text-flag md:mt-3 md:space-y-1.5 md:text-base">
                          {e.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      )}

                      <ul className="mt-3 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
                        {e.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-ink/30 px-2.5 py-0.5 font-[family-name:var(--font-body)] text-xs md:px-3 md:py-1 md:text-sm"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile: title + small ring on top, button under, entries below. Desktop: title/button row, then ring beside entries. */
        .exp-grid { display: grid; grid-template-columns: 1fr auto; grid-template-areas: "title ring" "btn btn" "entries entries"; gap: 0.75rem 1rem; align-content: start; }
        .exp-title { grid-area: title; align-self: center; }
        .exp-ring { grid-area: ring; }
        .exp-btn { grid-area: btn; justify-self: start; }
        .exp-entries { grid-area: entries; align-self: start; }
        @media (min-width: 768px) {
          .exp-grid { grid-template-columns: 20rem 1fr; grid-template-rows: auto minmax(0, 1fr); grid-template-areas: "title btn" "ring entries"; gap: 1.25rem 2.5rem; align-content: normal; }
          .exp-title { align-self: end; }
          .exp-btn { justify-self: end; align-self: end; }
          .exp-ring, .exp-entries { align-self: center; }
        }
        @media (min-width: 1024px) {
          .exp-grid { grid-template-columns: 26rem 1fr; }
        }

        .ring-orbit { transform-origin: ${C}px ${C}px; animation: ring-spin 80s linear infinite; }
        .ring-num { animation: ring-num-in 0.45s ease-out; }
        @keyframes ring-spin { to { transform: rotate(360deg); } }
        @keyframes ring-num-in { from { opacity: 0; transform: translateY(0.4em); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .ring-orbit, .ring-num { animation: none; }
        }
      `}</style>
    </section>
  );
}