import { Handshake } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export function BrandLogo({ className = '', showText = true }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Handshake className="h-8 w-8 text-[#0D9488]" aria-hidden="true" />
      {showText && (
        <span className="text-xl font-bold text-[#1E3A5F]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ComplaintBridge
        </span>
      )}
    </div>
  );
}

export default BrandLogo;