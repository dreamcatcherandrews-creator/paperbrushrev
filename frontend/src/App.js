import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFilm from "@/components/FeaturedFilm";
import Showreel from "@/components/Showreel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FilmDialog from "@/components/FilmDialog";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function App() {
  const [featured, setFeatured] = useState(null);
  const [films, setFilms] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/films`)
      .then((res) => {
        setFeatured(res.data.featured);
        setFilms(res.data.films || []);
      })
      .catch((e) => console.error("Failed to load films", e));
  }, []);

  return (
    <div className="App pb-grain">
      <Navbar />
      <main>
        <Hero />
        <FeaturedFilm film={featured} onPlay={setActive} />
        <Showreel films={films} onPlay={setActive} />
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
