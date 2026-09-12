import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#1E3A5F] via-[#1E3A5F]/90 to-[#0D9488]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            File a Complaint Against Any Company — We Handle the Rest
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90">
            Airlines, retailers, clothing brands, voucher providers, travel companies and more. Submit your complaint, get a case reference, and we'll route it to the right place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#submit" className="inline-flex items-center gap-2 rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#D97706]">
              Submit a Complaint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              How It Works
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1581092921465-6a5f1f1c0e3a?auto=format&fit=crop&w=800&q=80"
            alt="Professional customer service representative assisting with complaint resolution"
            className="rounded-2xl shadow-2xl"
            loading="eager"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAFA] to-transparent" aria-hidden="true" />
    </section>
  );
}

export default Hero;