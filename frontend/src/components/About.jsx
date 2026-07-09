import React from "react";
import { motion } from "framer-motion";
import { SITE, DISCIPLINES } from "../lib/site";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <div className="grid gap-16 border-t border-[#e6e2da] pt-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#c75d3b]">
            The Studio
          </p>
          <h2 className="font-serif-display text-4xl font-light leading-[1.05] tracking-tight text-[#1c1b1a] md:text-5xl lg:text-6xl">
            We are{" "}
            <span className="italic text-[#c75d3b]">Paper &amp; Brush.</span>
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[#5c5a56] md:text-lg">
            <p>
              Paper &amp; Brush Pictures was born from a quiet obsession with
              the space between a sketch and a scene — the moment an idea, still
              wet with ink, learns to move.
            </p>
            <p>
              We tell stories that refuse the beaten path. From commercials and
              brand films to documentaries and the new frontier of AI
              filmmaking, we believe every frame should carry purpose,
              patience, and a little poetry.
            </p>
            <p>
              Rooted in {SITE.city}, working everywhere the light travels.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#5c5a56]">
            What we do
          </p>
          <ul className="divide-y divide-[#e6e2da] border-y border-[#e6e2da]">
            {DISCIPLINES.map((d) => (
              <li
                key={d.title}
                data-testid={`discipline-${d.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex items-baseline justify-between gap-4 py-4"
              >
                <span className="font-serif-display text-2xl text-[#1c1b1a] transition-colors duration-300 group-hover:text-[#c75d3b]">
                  {d.title}
                </span>
                <span className="text-right text-xs italic tracking-wide text-[#5c5a56]">
                  {d.note}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
