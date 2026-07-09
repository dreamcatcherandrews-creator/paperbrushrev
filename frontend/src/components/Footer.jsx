import React from "react";
import { SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#f7f5f0] text-[#1c1b1a]"
    >
      <div className="border-t border-[#e6e2da]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-12 md:px-12 md:py-16">
          <img
            src={SITE.logoHorizontal}
            alt={SITE.name}
            className="h-24 w-auto object-contain mix-blend-multiply md:h-32"
            draggable={false}
          />
        </div>
      </div>
      <div className="border-t border-[#e6e2da]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.2em] text-[#5c5a56] md:flex-row md:px-12">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span className="italic tracking-wide text-[#c75d3b]">
            Stories drawn in light.
          </span>
          <span>{SITE.city}</span>
        </div>
      </div>
    </footer>
  );
}
