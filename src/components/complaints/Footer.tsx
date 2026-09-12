import { Facebook, Linkedin, Instagram, Twitter, Mail, Phone, MessageCircle } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Industries", href: "#industries" },
  { label: "FAQ", href: "#faq" },
  { label: "Submit a Complaint", href: "#submit-complaint" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo light />
            <p className="mt-4 text-sm text-gray-300">
              One place to raise any complaint.
            </p>
          </div>

          <div>
            <h3 className="font-Poppins font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-Poppins font-semibold mb-4">Contact Details</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:info@complaintbridge.website"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-teal" />
                  info@complaintbridge.website
                </a>
              </li>
              <li>
                <a
                  href="tel:+447727185736"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-teal" />
                  +44 7727 185736
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447727185736?text=Hello%20Pissed%20Consumer%20Support%2C%20I%20would%20like%20assistance%20with%20a%20complaint."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-teal" />
                  WhatsApp +44 7727 185736
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-Poppins font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/complaintsbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/complaintsbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/complaintsbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/complaintsbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-300">
          <p>
            ComplaintBridge is a complaint platform affiliated with the
            companies listed on this site.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} ComplaintBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
