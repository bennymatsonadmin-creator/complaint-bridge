import { useState, useEffect } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export function FloatingContactBar() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 z-40 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
      }`}
    >
      {/* Mobile: full-width bottom bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between bg-white border-t border-gray-200 shadow-lg px-4 py-3">
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/447853169761"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-700 font-medium"
            >
              <MessageCircle className="h-5 w-5 animate-pulse" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+447853169761"
              className="flex items-center gap-2 text-primary font-medium"
            >
              <Phone className="h-5 w-5" />
              Call Us
            </a>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop: bottom-right corner */}
      <div className="hidden md:block fixed bottom-6 right-6">
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/447853169761"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-white font-medium shadow-lg hover:bg-green-700 transition-all duration-200"
          >
            <MessageCircle className="h-5 w-5 animate-pulse" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href="tel:+447853169761"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white font-medium shadow-lg hover:bg-primary/90 transition-all duration-200"
          >
            <Phone className="h-5 w-5" />
            <span>Call Us</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingContactBar;
