import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// --- STRICTLY USING ONLY AVAILABLE ASSETS ---
import video1 from "@/assets/VN20260221_191416.mp4";
import image1 from "@/assets/Gemini_Generated_Image_pde47vpde47vpde4.jpg";
import image2 from "@/assets/blanket 1.jpg";

const slides = [
  {
    id: 1,
    type: "video",
    src: video1,
    // These text props remain in the array but won't be rendered for slide 0
    title: "ELEVATE YOUR STYLE",
    subtitle: "Redefining modern luxury, piece by piece",
    cta: "Explore Collection",
    link: "/shop",
    position: "object-center",
  },
  {
    id: 2,
    type: "image",
    src: image1,
    title: "WEAR YOUR STORY",
    subtitle: "Premium custom fits designed for you.",
    cta: "Shop Custom Tees",
    link: "/shop?category=Custom Tees",
    position: "object-center",
  },
  {
    id: 3,
    type: "image",
    src: image2,
    title: "THE COMFORT EDIT",
    subtitle: "Wrap yourself in pure luxury.",
    cta: "Shop Blankets",
    link: "/shop?category=Blankets",
    position: "object-center",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    // FIX: Using h-[75vh] lg:h-[85vh] prevents the squished letterbox effect!
    <section className="relative w-full h-[75vh] lg:h-[85vh] overflow-hidden bg-black text-white border-t border-border/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {slides[current].type === "video" ? (
            <video
              src={slides[current].src}
              autoPlay
              loop
              muted
              playsInline
              key={slides[current].src}
              className={`w-full h-full object-cover opacity-90 ${slides[current].position}`}
            />
          ) : (
            <img
              src={slides[current].src}
              alt={slides[current].title}
              crossOrigin="anonymous"
              className={`w-full h-full object-cover opacity-80 ${slides[current].position}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* --- TEXT CONTENT OVERLAY --- */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4">
        {/* FIX: Added conditional rendering. 
            The text block only renders if 'current' is NOT 0 (the first slide).
        */}
        {current !== 0 && (
          <div className="max-w-5xl">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 uppercase drop-shadow-lg"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/90 mb-10 font-light tracking-wide drop-shadow-md"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              key={`cta-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to={slides[current].link}
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all duration-300 rounded-sm"
              >
                {slides[current].cta} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all z-20 hidden md:block backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all z-20 hidden md:block backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              current === index
                ? "bg-white w-12"
                : "bg-white/30 w-6 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
