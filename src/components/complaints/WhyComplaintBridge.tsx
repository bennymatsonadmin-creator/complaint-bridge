import { FileText, ClipboardCheck, MessageSquare, Tag } from "lucide-react";

const features = [
  {
    title: "One Form, Every Industry",
    description: "Submit complaints across airlines, retail, fashion, travel, electronics, and more from a single form.",
    icon: FileText,
  },
  {
    title: "Tracked Case References",
    description: "Every complaint gets a unique case reference so you can follow its progress.",
    icon: ClipboardCheck,
  },
  {
    title: "Clear Communication",
    description: "We help route your complaint clearly to the right company with all the details they need.",
    icon: MessageSquare,
  },
  {
    title: "No Cost to Submit",
    description: "Filing a complaint through ComplaintBridge is completely free.",
    icon: Tag,
  },
];

export function WhyComplaintBridge() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-Poppins">
            Why ComplaintBridge?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            An independent platform built to make complaining simpler and more effective.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal mx-auto">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 font-Poppins">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}