import { Circle, Line } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E3A5F] sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            How It Works
          </h2>
          <p className="mt-4 text-lg text-[#4B5563]">
            Simple, transparent process to get your complaint heard and resolved.
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="absolute inset-0 w-0.5 bg-[#0D9488]/20" />
          <div className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: 1,
                title: 'Tell us which company and what happened',
                description: 'Fill out our simple form with your details, the company name, and what happened.',
              },
              {
                number: 2,
                title: 'Receive your unique case reference',
                description: 'Get an instant case reference (e.g., CB-2609-48213) to track your complaint.',
              },
              {
                number: 3,
                title: 'We route your complaint to the correct company',
                description: 'We forward your complaint to the right department at the company.',
              },
              {
                number: 4,
                title: 'Track progress until resolution',
                description: 'Use your case reference to check status and get updates until resolved.',
              },
            ].map((step, index) => (
              <div
                key={step.number}
                className="relative flex items-start gap-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#0D9488] text-white flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A5F]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#4B5563]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}