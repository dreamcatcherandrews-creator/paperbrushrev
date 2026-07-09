import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

export default function FilmDialog({ film, onClose }) {
  const open = Boolean(film);
  const src = film
    ? film.provider === "youtube"
      ? `https://www.youtube.com/embed/${film.video_id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${film.video_id}?autoplay=1&title=0&byline=0&portrait=0`
    : "";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-testid="film-player-dialog"
        className="max-w-5xl w-[95vw] border-none bg-[#0d0c0b] p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">{film?.title || "Film"}</DialogTitle>
        <DialogDescription className="sr-only">
          {film ? `${film.category} · ${film.year}` : "Film player"}
        </DialogDescription>
        {film && (
          <div>
            <div className="aspect-video w-full bg-black">
              <iframe
                key={film.id}
                title={film.title}
                src={src}
                className="h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4">
              <h3 className="font-serif-display text-2xl text-[#f7f5f0]">
                {film.title}
              </h3>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c75d3b]">
                {film.category} · {film.year}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
