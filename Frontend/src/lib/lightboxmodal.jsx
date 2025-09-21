import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import useScreenResize from "@/hooks/useScreenResize";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { X } from "lucide-react";

const LightboxModal = ({ images, initialIndex, onClose }) => {
  const { width } = useScreenResize();
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [closing, setClosing] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleNavigation = (direction) => {
    setCurrentIndex((prev) =>
      direction === "prev"
        ? prev === 0
          ? images.length - 1
          : prev - 1
        : prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  // Add swipe functionality
  const handleTouchStart = (e) => {
    if (width > 1024) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (width > 1024) return;
    setTouchEnd(e.targetTouches[0].clientX);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (width > 1024 || !touchStart || !touchEnd) return;

    const diff = touchStart - touchEnd;

    if (diff > 50) handleNavigation("next");
    else if (diff < -50) handleNavigation("prev");

    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handleNavigation("prev");
      else if (e.key === "ArrowRight") handleNavigation("next");
      else if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = (e, force = false) => {
    if (
      force ||
      e?.target === e?.currentTarget ||
      e?.target?.classList?.contains("dialog-overlay")
    ) {
      setClosing(true);
      setTimeout(onClose, 200);
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          setClosing(true);
          setTimeout(onClose, 200);
        }
      }}
      className="bg-transparent"
    >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <DialogContent
          className={`fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-lg border-0 bg-transparent p-6 shadow-lg flex items-center justify-center ${
            closing ? "opacity-0 transition-opacity duration-200" : ""
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose(e);
          }}
        >
          <div
            className="flex items-center justify-between mx-auto gap-4 sm:gap-5 md:gap-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleClose(e);
              }
            }}
          >
            {/* Previous Arrow */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("prev");
                }}
                className="outline-none text-white flex justify-right"
              >
                <MdOutlineKeyboardArrowLeft className="h-5 sm:h-8 lg:h-10 w-5 sm:w-8 lg:w-10" />
              </button>
            )}

            {/* Image */}
            <div className={`relative ${width <= 1024 ? "touch-none" : ""}`}>
              <img
                src={images[currentIndex]}
                alt="large view"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`max-w-[70vw] max-h-[70vh] sm:!max-w-[80vw] sm:!max-h-[80vh] xl:max-w-[1000px] xl:max-h-[1000px] object-contain ${
                  width <= 1024 ? "touch-none" : ""
                }`}
              />
              <button
                className="absolute -top-6 -right-10 z-50 rounded-full p-1 hover:opacity-100 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose(e, true);
                }}
              >
                <X className="h-5 w-5 text-white/50 hover:text-white" />
              </button>
            </div>
            {/* Next Arrow */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("next");
                }}
                className="outline-none text-white flex justify-left"
              >
                <MdOutlineKeyboardArrowRight className="h-5 sm:h-8 lg:h-10 w-5 sm:w-8 lg:w-10" />
              </button>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default LightboxModal;
