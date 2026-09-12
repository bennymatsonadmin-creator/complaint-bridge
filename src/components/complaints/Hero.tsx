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
          <div className="relative aspect-square max-w-lg mx-auto">
            <img
              src="https://images.unsplash.com/photo-1581092921465-6a5f1f1c0e3a?auto=format&fit=crop&w=800&q=80"
              alt="Professional customer service representative helping a customer with paperwork"
              className="rounded-2xl shadow-2xl object-cover w-full h-full"
              loading="eager"
            />
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-lg">
              <p className="text-sm font-semibold text-gray-900">Case Reference</p>
              <p className="text-lg font-bold text-teal">CB-2609-48213</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
