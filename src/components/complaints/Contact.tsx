import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-Poppins">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have your case reference ready for faster service.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 font-Poppins mb-4">Contact Details</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal" />
                <a href="tel:+447727185736" className="hover:text-primary transition-colors">
                  +44 7727 185736
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-teal" />
                <a
                  href="https://wa.me/447727185736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  WhatsApp +44 7727 185736
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal" />
                <a
                  href="mailto:info@complaintbridge.website"
                  className="hover:text-primary transition-colors"
                >
                  info@complaintbridge.website
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 font-Poppins mb-4">Hours & Info</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                <strong>Available:</strong> 24/7
              </p>
              <p>
                <strong>Have your case reference ready</strong> for faster service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
