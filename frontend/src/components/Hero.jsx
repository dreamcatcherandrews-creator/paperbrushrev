import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { SITE, CLIENTS } from "../lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-16 pt-32 md:px-12 md:pt-40"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#5c5a56]"
          >
            <span className="h-px w-10 bg-[#c75d3b]" />
            {SITE.since} · {SITE.city}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-serif-display text-5xl font-light leading-[0.98] tracking-tight text-[#1c1b1a] sm:text-6xl lg:text-7xl"
          >
            Every Brushstroke
            <span className="mt-2 block italic text-[#c75d3b]">
              Begins a Story.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-md text-base leading-relaxed text-[#5c5a56] md:text-lg"
          >
            Born from the spirit of a curious child with paper, a brush, and an
            endless sense of wonder, we create films that are imagined by hand
            and crafted with intention. Every frame is drawn from curiosity,
            painted with emotion, and made to endure.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              data-testid="hero-view-reel"
              onClick={() => scrollTo("#films")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#1c1b1a] px-7 py-3 text-xs uppercase tracking-[0.25em] text-[#f7f5f0] transition-colors duration-300 hover:bg-[#c75d3b]"
            >
              View the Reel
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </button>
            <button
              data-testid="hero-contact"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center rounded-full border border-[#1c1b1a]/25 px-7 py-3 text-xs uppercase tracking-[0.25em] text-[#1c1b1a] transition-colors duration-300 hover:border-[#c75d3b] hover:text-[#c75d3b]"
            >
              Get in touch
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <img
            src={SITE.logo}
            alt="Paper & Brush Pictures"
            className="w-full select-none mix-blend-multiply"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Client marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-[#e6e2da] py-5">
        <div className="flex w-max pb-marquee items-center gap-12 whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-[0.3em] text-[#5c5a56]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
