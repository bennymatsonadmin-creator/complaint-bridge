import { Handshake } from "lucide-react";

export function BrandLogo() {
  return (
    <a href="#home" className="flex items-center gap-2 group" aria-label="ComplaintBridge Home">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-secondary">
        <Handshake className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-primary font-Poppins">
        ComplaintBridge
      </span>
    </a>
  );
}
