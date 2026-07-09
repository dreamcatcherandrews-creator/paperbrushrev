import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "../lib/site";

const LINKS = [
  { label: "Our Palette", href: "#reel", id: "our-palette" },
  { label: "Behind the Brush", href: "#about", id: "behind-the-brush" },
  { label: "The Easel", href: "#contact", id: "the-easel" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="site-navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-[#e6e2da]/60 bg-[#f7f5f0]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <button
          data-testid="nav-logo"
          onClick={() => go("#top")}
          className="group flex items-center text-left"
        >
          <img
            src={SITE.logoHorizontal}
            alt={SITE.name}
            className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 md:h-12"
            draggable={false}
          />
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.href)}
              className="relative text-xs uppercase tracking-[0.28em] text-[#5c5a56] transition-colors duration-300 hover:text-[#1c1b1a] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#c75d3b] after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="text-[#1c1b1a] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e6e2da]/60 bg-[#f7f5f0]/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={`nav-mobile-link-${l.id}`}
                onClick={() => go(l.href)}
                className="border-b border-[#e6e2da]/60 py-4 text-left text-sm uppercase tracking-[0.28em] text-[#5c5a56]"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
