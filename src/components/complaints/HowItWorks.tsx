import { Send, ClipboardCheck, Route, ChartNoAxesColumnIncreasing } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Tell us which company and what happened",
    description: "Share the details of your complaint and the company involved.",
    icon: Send,
  },
  {
    number: 2,
    title: "Receive your unique case reference",
    description: "Get a case reference you can use to track your complaint.",
    icon: ClipboardCheck,
  },
  {
    number: 3,
    title: "We route your complaint to the correct company",
    description: "We help direct your complaint to the right place for review.",
    icon: Route,
  },
  {
    number: 4,
    title: "Track progress until resolution",
    description: "Follow your case progress until a resolution is reached.",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-Poppins">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A simple, transparent process to help your complaint reach the right company.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-10 z-0 hidden h-0.5 w-full bg-teal/30 md:block" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md border-2 border-teal/20">
                    <span className="text-2xl font-bold text-teal">{step.number}</span>
                  </div>
                  <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 font-Poppins">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
