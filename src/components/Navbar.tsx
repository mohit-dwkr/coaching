import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Batches", href: "#batches" },
  { label: "Faculty", href: "#faculty" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Study Material", href: "/study-material" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const location = useLocation();

  // 🔥 Route change handler
  useEffect(() => {
    if (location.pathname === "/") {
      setActive("#home");
    } else {
      setActive(""); // reset scroll active on other pages
    }
  }, [location.pathname]);

  // 🔥 Scroll spy (ONLY on home page)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = [
        "home",
        "batches",
        "faculty",
        "results",
        "gallery",
        "contact",
      ];

      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(`#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("#home");
          }}
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <GraduationCap className="h-7 w-7" />
          Academic
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => {
                  if (l.href === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  l.href === "/study-material"
                    ? location.pathname === l.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                    : active === "#home" && l.href === "/"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  active === l.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </a>
            )
          )}

          <Button size="sm" className="ml-3" asChild>
            <a href="#contact">Join Now</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => {
                  setOpen(false);
                  if (l.href === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`block py-2.5 text-sm font-medium transition-colors ${
                  l.href === "/study-material"
                    ? location.pathname === l.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                    : active === "#home" && l.href === "/"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm font-medium transition-colors ${
                  active === l.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </a>
            )
          )}

          <Button size="sm" className="mt-2 w-full" asChild>
            <a href="#contact" onClick={() => setOpen(false)}>
              Join Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
