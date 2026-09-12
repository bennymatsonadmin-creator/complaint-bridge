import {
  Plane,
  Shirt,
  ShoppingBag,
  Gift,
  Hotel,
  Laptop,
  Truck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { industries } from "./complaintData";

const iconMap = {
  plane: Plane,
  shirt: Shirt,
  "shopping-bag": ShoppingBag,
  gift: Gift,
  hotel: Hotel,
  laptop: Laptop,
  truck: Truck,
  zap: Zap,
};

export function Industries() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-Poppins">
            Industries We Cover
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            File a complaint in any industry — we'll route it to the right place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = iconMap[industry.icon as keyof typeof iconMap];
            return (
              <a
                key={industry.id}
                href="#submit-complaint"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("submit-complaint");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group card cursor-pointer hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 font-Poppins">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600">{industry.description}</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-teal transition-transform group-hover:translate-x-1">
                  File a complaint <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-6 text-center">
          <p className="text-gray-600">
            <strong>Don't see your industry?</strong> You can still submit a complaint under{" "}
            <a href="#submit-complaint" className="font-medium text-teal underline">
              "Other"
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}