"use client";

import { useState, useEffect, useCallback } from "react";
import { siteContent } from "@/config/siteContent";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten images for lightbox navigation
  const allImages = siteContent.gallery.map((study) => ({
    ...study.after,
    title: study.title,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev! + 1));
  }, [lightboxIndex, allImages.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev! - 1));
  }, [lightboxIndex, allImages.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <>
      <div className="space-y-16">
        {siteContent.gallery.map((study, studyIndex) => (
          <div key={study.id} className="flex flex-col items-center">
            <h2 className="text-2xl font-serif font-medium mb-6">{study.title}</h2>
            {study.description && <p className="text-gray-500 mb-6 text-center max-w-2xl">{study.description}</p>}
            
            <div className="w-full max-w-xl">
              <div className="group cursor-pointer" onClick={() => openLightbox(studyIndex)}>
                <div className="aspect-[4/5] bg-gray-100 rounded-[var(--radius-card)] overflow-hidden relative">
                  <Image
                    src={study.after.src}
                    alt={study.after.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={40} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden relative">
                     <Image
                        src={allImages[lightboxIndex].src}
                        alt={allImages[lightboxIndex].alt}
                        fill
                        className="object-contain"
                        priority
                     />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 px-4">
                    <p className="text-lg font-medium">{allImages[lightboxIndex].title}</p>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
