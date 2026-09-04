import { useState } from "react";
import { FEATURED, FILMS } from "@/lib/films";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFilm from "@/components/FeaturedFilm";
import Showreel from "@/components/Showreel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FilmDialog from "@/components/FilmDialog";

function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="App pb-grain">
      <Navbar />
      <main>
        <Hero />
        <FeaturedFilm film={FEATURED} onPlay={setActive} />
        <Showreel films={FILMS} onPlay={setActive} />
        <About />
        <Contact />
      </main>
      <Footer />
      <FilmDialog film={active} onClose={() => setActive(null)} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
