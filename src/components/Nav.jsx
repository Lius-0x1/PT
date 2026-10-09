// src/components/Navbar.jsx
import { useState } from "react";

const GITHUB = "https://github.com/Lius-0x1";

const links = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

const linkClass =
  "py-2 font-[family-name:var(--font-body)] text-lg underline-offset-4 decoration-flag decoration-2 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-flag md:text-base";

function ThemeToggle() {
  // index.html sets data-theme before first paint; read it here.
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light"
  );
  const dark = theme === "dark";

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: theme still changes for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-10 w-10 items-center justify-center rounded-full outline-offset-4 transition-colors hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-flag"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 text-ink backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          onClick={close}
          className="font-[family-name:var(--font-display)] text-lg font-extrabold outline-offset-4 focus-visible:outline-2 focus-visible:outline-flag"
        >
          Julius Adeniyi
        </a>

        <div className="flex items-center gap-2 md:gap-6">
          <nav
            id="site-nav"
            className={`${
              open ? "flex" : "hidden"
            } absolute left-0 right-0 top-16 flex-col gap-1 border-b border-ink/15 bg-paper px-6 py-4 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={close} className={linkClass}>
                {label}
              </a>
            ))}
            <a href={GITHUB} target="_blank" rel="noreferrer" className={linkClass}>
              GitHub
            </a>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="rounded-full bg-ink px-4 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-paper outline-offset-4 focus-visible:outline-2 focus-visible:outline-flag md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}