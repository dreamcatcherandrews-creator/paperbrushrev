import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function FeaturedFilm({ film, onPlay }) {
  if (!film) return null;

  return (
    <section
      id="reel"
      data-testid="featured-section"
      className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-[#c75d3b]">
              The Reel
            </p>
            <h2 className="font-serif-display text-4xl font-light leading-tight tracking-tight text-[#1c1b1a] md:text-5xl">
              A single frame, held to the light.
            </h2>
          </div>
        </div>

        <button
          data-testid="featured-play"
          onClick={() => onPlay(film)}
          className="group relative block w-full overflow-hidden rounded-sm bg-black"
        >
          <div className="aspect-video w-full">
            <img
              src={film.thumbnail}
              alt={film.title}
              className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c75d3b]">
              <Play size={26} className="ml-1 text-white" fill="currentColor" />
            </span>
          </div>
          <div className="absolute bottom-0 left-0 flex flex-col items-start p-6 text-left md:p-8">
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-[#f7f5f0]/70">
              {film.category}
            </span>
            <span className="mt-1 font-serif-display text-2xl text-[#f7f5f0] md:text-3xl">
              {film.title}
            </span>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
