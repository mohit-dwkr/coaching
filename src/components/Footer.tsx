import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-6 w-6" />
            Academic
          </div>
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Academic Coaching Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
