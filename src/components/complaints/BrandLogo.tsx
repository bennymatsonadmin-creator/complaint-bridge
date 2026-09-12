interface BrandLogoProps {
  light?: boolean;
}

export function BrandLogo({ light = false }: BrandLogoProps) {
  return (
    <a href="#home" className="flex items-center gap-2 group" aria-label="ComplaintBridge Home">
      <img
        src="/assets/logo.jpg"
        alt="ComplaintBridge logo"
        className="h-9 w-9 rounded-lg object-cover shadow-sm"
      />
      <span
        className={`text-xl font-bold tracking-tight font-Poppins ${
          light ? "text-white" : "text-primary"
        }`}
      >
        ComplaintBridge
      </span>
    </a>
  );
}

export default BrandLogo;
