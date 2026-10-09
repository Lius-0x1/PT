// src/config.js
import { useEffect, useState } from "react";

export const EMAIL = "juliusadeniy012@gmail.com";
export const GITHUB = "https://github.com/Lius-0x1";
export const LINKEDIN = ""; // e.g. "https://www.linkedin.com/in/your-handle". Empty hides the button.

// Put both PDFs in the /public folder with exactly these names.
export const CV = {
  software: { href: "/Julius-Adeniyi-CV-Software.pdf", label: "software CV" },
  gis: { href: "/Julius-Adeniyi-CV-GIS.pdf", label: "GIS CV" },
};

// Checks the file really exists and is a PDF, and reads its size.
// A button or card built on this never leads to a broken download.
export function useFileInfo(href) {
  // The result remembers which file it is for, so switching files never shows the old answer.
  const [res, setRes] = useState({ href: "", ok: false, kb: 0 });

  useEffect(() => {
    if (!href) return;
    let alive = true;
    fetch(href, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") || "";
        const bytes = Number(r.headers.get("content-length")) || 0;
        if (alive) setRes({ href, ok: r.ok && type.includes("pdf"), kb: Math.round(bytes / 1024) });
      })
      .catch(() => {
        if (alive) setRes({ href, ok: false, kb: 0 });
      });
    return () => {
      alive = false;
    };
  }, [href]);

  return res.href === href ? res : { ok: false, kb: 0 };
}

export const useFileExists = (href) => useFileInfo(href).ok;