import React from "react";
import { SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1c1b1a] text-[#f7f5f0]"
    >
      <div className="border-t border-[#f7f5f0]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-12 md:px-12 md:py-16">
          <img
            src={SITE.logoHorizontal}
            alt={SITE.name}
            className="h-24 w-auto object-contain opacity-90 [filter:brightness(0)_invert(1)] md:h-32"
            draggable={false}
          />
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
