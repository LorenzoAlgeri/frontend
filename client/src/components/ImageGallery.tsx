import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Wrench } from "lucide-react";

interface ImageGalleryProps {
  images: {
    url: string;
    alt: string;
  }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Image placeholder component
  const ImagePlaceholder = ({
    alt,
    className,
    onClick,
  }: {
    alt: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <div
      className={`bg-gradient-to-br from-penn-blue to-oxford-blue flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <div className="text-center px-4">
        <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-blue-ncs/20 flex items-center justify-center">
          <Wrench className="w-6 h-6 text-blue-ncs" />
        </div>
        <p className="text-white/60 text-xs">{alt}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden cursor-pointer group aspect-video"
            onClick={() => openLightbox(index)}
          >
            <ImagePlaceholder
              alt={image.alt}
              className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-blue-ncs/0 group-hover:bg-blue-ncs/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                Clicca per ingrandire
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            onClick={closeLightbox}
            aria-label="Chiudi"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Immagine successiva"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Main image area */}
          <div
            className="max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ImagePlaceholder
              alt={images[currentIndex].alt}
              className="w-full h-auto max-h-[70vh] rounded-lg"
            />
            {/* Caption */}
            <p className="text-center text-white/80 mt-4 text-sm">
              {images[currentIndex].alt}
            </p>
            {/* Indicators */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? "bg-blue-ncs" : "bg-white/30"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    aria-label={`Vai all'immagine ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
