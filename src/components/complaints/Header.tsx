import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Submit a Complaint', href: '#submit' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <BrandLogo />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-[#1F2937] transition-colors hover:text-[#0D9488]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="https://wa.me/447853169761" target="_blank" rel="noreferrer" className="rounded-lg bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0A7A70]">
            Chat on WhatsApp
          </a>
          <a href="tel:+447853169761" className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#152A44]">
            Call Now
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-[#1E3A5F] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#E5E7EB] bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#1F2937] transition-colors hover:bg-[#FAFAFA] hover:text-[#0D9488]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <a href="https://wa.me/447853169761" target="_blank" rel="noreferrer" className="rounded-lg bg-[#0D9488] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#0A7A70]">
                Chat on WhatsApp
              </a>
              <a href="tel:+447853169761" className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#152A44]">
                Call Now
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;