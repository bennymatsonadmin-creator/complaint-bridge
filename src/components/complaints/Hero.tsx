import { CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 md:pt-32 md:pb-24"
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-amber/10 blur-3xl" />
        <div className="absolute right-1/3 top-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl font-Poppins">
            File a Complaint Against Any Company — We Handle the Rest
          </h1>
          <p className="text-lg text-gray-600 md:text-xl leading-relaxed">
            Airlines, retailers, clothing brands, voucher providers, travel companies and more. Submit your complaint, get a case reference, and we'll route it to the right place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-teal hover:bg-teal/90 text-white"
            >
              <a href="#submit-complaint">Submit a Complaint</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Affiliated complaint resolution with a case reference and tracked progress.
          </p>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative mx-auto max-w-lg">
            {/* Brand illustration */}
            <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/assets/hero-customer-service.png"
                alt="Illustration of a customer service specialist resolving a complaint"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            {/* Status chip — top right of the visual */}
            <div className="absolute -top-4 right-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
              <CheckCircle2 className="h-4 w-4 text-teal" />
              <span className="text-sm font-medium text-gray-900">
                Routed to the right company
              </span>
            </div>

            {/* Case reference card — attached to the bottom-left of the visual */}
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Case Reference
                </p>
                <p className="text-lg font-bold text-teal font-Poppins">
                  CB-2609-48213
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
