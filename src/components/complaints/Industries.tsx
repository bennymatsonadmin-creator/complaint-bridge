import {
  Plane,
  Shirt,
  ShoppingBag,
  Gift,
  Hotel,
  Monitor,
  Truck,
  Zap,
  Globe,
} from 'lucide-react';
import { industries } from './complaintData';

const iconMap: Record<string, React.ElementType> = {
  Airlines: Plane,
  Clothing: Shirt,
  Retail: ShoppingBag,
  Vouchers: Gift,
  Travel: Hotel,
  Electronics: Monitor,
  Delivery: Truck,
  Utilities: Zap,
};

export function Industries() {
  return (
    <section id="industries" className="section-padding bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E3A5F] sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Industries We Cover
          </h2>
          <p className="mt-4 text-lg text-[#4B5563]">
            We handle complaints across a wide range of industries. Don't see yours? You can still submit under "Other".
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = iconMap[industry.value] || Globe;
            return (
              <div key={industry.value} className="card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0D9488]/10 text-[#0D9488]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F]">{industry.label}</h3>
                <p className="mt-2 text-sm text-[#4B5563]">
                  File a complaint against any company in this industry. We'll route it to the right place.
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Don't see your industry? You can still submit a complaint under "Other".
        </p>
      </div>
    </section>
  );
}