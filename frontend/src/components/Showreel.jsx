import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const FALLBACK =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop";

function FilmCard({ film, index, onPlay }) {
  const [src, setSrc] = useState(film.thumbnail);
  return (
    <motion.button
      data-testid={`film-card-${film.video_id}`}
      onClick={() => onPlay(film)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.08,
      }}
      className="group block text-left"
    >
      <div className="relative overflow-hidden rounded-sm bg-[#e6e2da]">
        <div className="aspect-video w-full">
          <img
            src={src}
            alt={film.title}
            loading="lazy"
            onError={() => src !== FALLBACK && setSrc(FALLBACK)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-[#1c1b1a]/0 transition-colors duration-500 group-hover:bg-[#1c1b1a]/30" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c75d3b] text-white">
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-serif-display text-xl leading-snug text-[#1c1b1a] transition-colors duration-300 group-hover:text-[#c75d3b]">
          {film.title}
        </h3>
        <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.2em] text-[#5c5a56]">
          {film.year}
        </span>
      </div>
    </motion.button>
  );
}

export default function Showreel({ films, onPlay }) {
  return (
    <section
      id="films"
      data-testid="showreel-section"
      className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mb-12 border-t border-[#e6e2da] pt-10">
        <h2 className="font-serif-display text-4xl font-light leading-tight tracking-tight text-[#1c1b1a] md:text-5xl">
          Films we made <span className="italic">happen.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((film, i) => (
          <FilmCard key={film.id} film={film} index={i} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
}
