import React from "react";
import { X, ArrowLeft, ArrowRight, Eye, Image as ImageIcon } from "lucide-react";
import { GalleryItem } from "../types";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({ item, onClose, onPrev, onNext }: GalleryLightboxProps) {
  if (!item) return null;

  // Listen to keyboard clicks for a premium user experience
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in" id="gallery-lightbox">
      
      {/* Absolute Close Header button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-brand-black hover:bg-white text-white hover:text-brand-black transition duration-300 shadow-xl border border-gray-800 focus:outline-none"
        aria-label="Close Lightbox"
        id="close-lightbox-btn"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row bg-brand-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        
        {/* Visual Graphic Area (The actual CSS Gradient representing picture) */}
        <div 
          className="relative w-full md:w-3/5 h-64 sm:h-96 flex items-center justify-center select-none"
          style={{ background: item.gradient }}
        >
          {/* Transparent grid accent decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="flex flex-col items-center gap-2 text-white/90 drop-shadow-md">
            <ImageIcon className="w-12 h-12 text-brand-yellow animate-pulse-soft" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-300">GICD Plateau Archive</span>
          </div>

          {/* Small Category Badge bottom-left */}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-black/80 backdrop-blur-sm border border-brand-yellow/30 text-brand-yellow font-sans font-extrabold text-[10px] rounded-full uppercase tracking-wider">
            <span>●</span> {item.category}
          </span>
        </div>

        {/* Text Story & Navigation Panel */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-brand-black text-white border-t md:border-t-0 md:border-l border-gray-800">
          
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-brand-yellow tracking-widest uppercase">
              GALLERY PORTFOLIO
            </span>
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
              {item.title}
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              This photograph captures Guardian Initiative for Community Development agents working in real-time alongside local women and youths in the rural communities surrounding Jos, Plateau State. 
              GICD places community trust at the core of our operations, guaranteeing project delivery and direct resource tracking.
            </p>
            
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-gray-500 font-mono">
              <div>
                <span className="block text-gray-400">Captured:</span>
                <span>Jos, Plateau State, Nigeria</span>
              </div>
              <div>
                <span className="block text-gray-400">Copyright:</span>
                <span>© GICD Media Alliance</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls bottom-right */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-950">
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 active:scale-95 transition text-gray-400 hover:text-brand-yellow border border-gray-800 flex items-center justify-center"
                aria-label="Previous image"
                id="lightbox-prev-btn"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 active:scale-95 transition text-gray-400 hover:text-brand-yellow border border-gray-800 flex items-center justify-center"
                aria-label="Next image"
                id="lightbox-next-btn"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-gray-500">
              Navigation: <span className="text-gray-300">← / → Keys</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
