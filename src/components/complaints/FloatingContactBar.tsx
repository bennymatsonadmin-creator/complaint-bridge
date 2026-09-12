import { useState, useEffect } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/447727185736?text=Hello%20Pissed%20Consumer%20Support%2C%20I%20would%20like%20assistance%20with%20a%20complaint.";
const PHONE_URL = "tel:+447727185736";

export function FloatingContactBar() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Greet visitors shortly after the page loads
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 md:inset-x-auto md:right-6 md:bottom-6 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-full pointer-events-none"
      }`}
    >
      {/* Welcome message bubble */}
      {showWelcome && (
        <div className="absolute bottom-full right-4 mb-3 md:right-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative w-72 rounded-2xl rounded-br-sm border border-gray-100 bg-white p-4 shadow-xl">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Dismiss welcome message"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-sm font-semibold text-gray-900 font-Poppins">
              Pissed Consumer Support
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              👋 Hi there! This is Pissed Consumer Support — how can we assist
              you today?
            </p>
            {/* Bubble tail */}
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-gray-100 bg-white" />
          </div>
        </div>
      )}

      {/* Mobile: full-width bottom bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between bg-white border-t border-gray-200 shadow-lg px-4 py-3">
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-700 font-medium"
            >
              <MessageCircle className="h-5 w-5 animate-pulse" />
              Chat on WhatsApp
            </a>
            <a
              href={PHONE_URL}
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
      <div className="hidden md:flex md:flex-col md:items-end md:gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-white font-medium shadow-lg hover:bg-green-700 transition-all duration-200"
        >
          <MessageCircle className="h-5 w-5 animate-pulse" />
          <span>Chat on WhatsApp</span>
        </a>
        <a
          href={PHONE_URL}
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
  );
}

export default FloatingContactBar;
