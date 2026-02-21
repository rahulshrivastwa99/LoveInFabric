import { useState } from "react";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-4 block">
            The Difference
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 leading-tight">
            Life With & Without Us
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative w-full max-w-6xl mx-auto aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-sm bg-stone-200 shadow-2xl group select-none">
          {/* AFTER IMAGE (Happy/Color/With Blanket) - Sits in the background */}
          <img
            src={afterImage}
            alt="Happy with blanket"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* BEFORE IMAGE (Sad/B&W/No Blanket) - Sits on top and gets clipped */}
          <img
            src={beforeImage}
            alt="Sad without blanket"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          />

          {/* Hidden Range Input for Accessibility & Smooth Dragging */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            aria-label="Image comparison slider"
          />

          {/* Custom Slider Handle/Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none transition-transform duration-75"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-stone-800">
              <GripVertical size={20} />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-md text-white px-4 py-2 text-[10px] md:text-xs tracking-widest uppercase font-bold rounded-sm pointer-events-none transition-opacity duration-300">
            Before
          </div>
          <div className="absolute top-6 right-6 z-10 bg-black/40 backdrop-blur-md text-white px-4 py-2 text-[10px] md:text-xs tracking-widest uppercase font-bold rounded-sm pointer-events-none transition-opacity duration-300">
            After
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
