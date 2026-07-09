import React from "react";
import { SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1c1b1a] text-[#f7f5f0]"
    >
      <div className="border-t border-[#f7f5f0]/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p
            aria-hidden
            className="select-none whitespace-nowrap py-8 text-center font-serif-display text-[15vw] leading-none tracking-tight text-[#f7f5f0]/10 md:py-12 md:text-[12vw]"
          >
            Paper &amp; Brush
          </p>
        </div>
      </div>
      <div className="border-t border-[#f7f5f0]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.2em] text-[#8a8781] md:flex-row md:px-12">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span className="italic tracking-wide">Stories drawn in light.</span>
          <span>{SITE.city}</span>
        </div>
      </div>
    </footer>
  );
}
