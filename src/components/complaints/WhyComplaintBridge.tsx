import { CheckCircle, Globe, MessageSquare, DollarSign } from 'lucide-react';

export default function WhyComplaintBridge() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E3A5F] sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why ComplaintBridge?
          </h2>
          <p className="mt-4 text-lg text-[#4B5563]">
            Your trusted partner in complaint resolution.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Globe,
              title: 'One Form, Every Industry',
              description: 'A single, unified form to file complaints across all industries. No need to search for different company portals.',
            },
            {
              icon: CheckCircle,
              title: 'Tracked Case References',
              description: 'Get a unique case reference for every complaint. Use it to track progress and stay organized.',
            },
            {
              icon: MessageSquare,
              title: 'Clear Communication',
              description: 'We maintain transparent communication throughout the process. Know exactly where your complaint stands.',
            },
            {
              icon: DollarSign,
              title: 'No Cost to Submit',
              description: 'ComplaintBridge is completely free. No hidden fees, no charges for filing complaints.',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="card p-6 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F]">
                <feature.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A5F]">{feature.title}</h3>
              <p className="mt-2 text-sm text-[#4B5563]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}