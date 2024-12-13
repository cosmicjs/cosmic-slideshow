/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
type Slide = {
  title: string;
  metadata: {
    slide_image?: { imgix_url: string };
    slide_title?: string;
    slide_content: string;
  };
};

const fadeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function Slideshow({
  slides,
  initialSlide = 0,
}: {
  slides: Slide[];
  initialSlide?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  useEffect(() => {
    setCurrentIndex(initialSlide);
  }, [initialSlide]);

  const updateURL = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("slide", (index + 1).toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        updateURL(nextIndex);
      } else if (e.key === "ArrowLeft") {
        const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(nextIndex);
        updateURL(nextIndex);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, slides.length, updateURL]);

  const handleNavigation = useCallback(
    (direction: "next" | "prev") => {
      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % slides.length
          : (currentIndex - 1 + slides.length) % slides.length;
      setCurrentIndex(nextIndex);
      updateURL(nextIndex);
    },
    [currentIndex, slides.length, updateURL]
  );

  const currentSlide = slides[currentIndex];

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNavigation("next"),
    onSwipedRight: () => handleNavigation("prev"),
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative transition-colors">
      <div {...swipeHandlers} className="h-full w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="h-[calc(100%-2rem)] flex flex-col items-center max-w-6xl mx-auto overflow-y-auto"
          >
            <div className="w-full px-2 sm:px-8 py-4 mb-12">
              {currentSlide.metadata.slide_title && (
                <h1 className="text-3xl mt-12 md:mt-6 sm:text-4xl font-bold mb-6 sm:mb-8 text-center px-4">
                  {currentSlide.metadata.slide_title}
                </h1>
              )}
              {currentSlide.metadata.slide_image && (
                <div className="h-[35vh] sm:h-[50vh] min-h-[35vh] sm:min-h-[50vh] flex items-center justify-center mb-6 sm:mb-8">
                  <Image
                    src={currentSlide.metadata.slide_image.imgix_url}
                    alt={currentSlide.title}
                    className="h-full w-auto object-contain rounded-lg"
                    width={1000}
                    height={1000}
                  />
                </div>
              )}
              <div
                className={`prose ${
                  theme === "dark" ? "prose-invert" : ""
                } prose-base sm:prose-lg max-w-3xl mx-auto px-4 sm:px-2`}
              >
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => (
                      <a target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    img: ({ src, alt, ...props }) => {
                      if (src?.endsWith(".mp4")) {
                        return (
                          <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            src={src}
                            className="w-full mx-auto"
                            {...props}
                          />
                        );
                      }
                      return <img src={src} alt={alt} {...props} />;
                    },
                  }}
                >
                  {currentSlide.metadata.slide_content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 sm:right-8 sm:left-auto sm:translate-x-0 flex items-center gap-4 sm:gap-6 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm">
        <button
          onClick={() => handleNavigation("prev")}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-2xl sm:text-3xl p-2"
          aria-label="Previous slide"
        >
          ←
        </button>
        <span className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium min-w-[3rem] text-center">
          {currentIndex + 1} / {slides.length}
        </span>
        <button
          onClick={() => handleNavigation("next")}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-2xl sm:text-3xl p-2"
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
}
