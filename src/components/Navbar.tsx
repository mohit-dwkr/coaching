import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Batches", href: "/#batches" },
  { label: "Faculty", href: "/#faculty" },
  { label: "Results", href: "/#results" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Study Material", href: "/study-material" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Condition to check if we should show solid background
  const isSolid = isScrolled || location.pathname !== "/";

  useEffect(() => {
    const handleScrollBg = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollBg);
    return () => window.removeEventListener("scroll", handleScrollBg);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setActive("#home");
    } else {
      setActive(""); 
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["home", "batches", "faculty", "results", "gallery", "contact"];
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid 
          ? "bg-white/90 backdrop-blur-lg border-b border-border py-3 shadow-sm" 
          : "bg-black/15 backdrop-blur-sm py-1"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("#home");
          }}
          className={`flex items-center gap-2 font-bold text-2xl transition-colors ${
            isSolid ? "text-primary" : "text-white"
          }`}
        >
          < GraduationCap className="h-8 w-8" />
          Toppers Academy
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((l) => {
            const isActive = l.href.startsWith("/#") 
              ? active === l.href.replace("/", "")
              : location.pathname === l.href;

            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => {
                  if (l.href === "/") window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${
                  isActive
                    ? isSolid 
                      ? "text-primary bg-primary/10" 
                      : "text-white bg-white/20 backdrop-blur-md"
                    : isSolid 
                      ? "text-muted-foreground hover:text-primary" 
                      : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          <Button size="lg" className={`ml-4 rounded-full px-8 shadow-lg transition-transform hover:scale-105 ${
            !isSolid && "bg-white text-primary hover:bg-gray-100 border-none"
          }`} asChild>
            <a href="/#contact">Join Now</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-md ${isSolid ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-6 pt-2 animate-in slide-in-from-top duration-300">
          {links.map((l) => {
            const isActive = l.href.startsWith("/#") 
              ? active === l.href.replace("/", "")
              : location.pathname === l.href;

            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => {
                  setOpen(false);
                  if (l.href === "/") window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`block py-3 text-base font-semibold border-b border-border/50 last:border-none ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          <Button size="lg" className="mt-6 w-full rounded-xl" asChild>
            <a href="/#contact" onClick={() => setOpen(false)}>
              Join Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}