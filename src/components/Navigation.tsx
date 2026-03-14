import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The Hero section is now 1200vh long. 
      // We show the black background only after we scroll past the hero video.
      setIsScrolled(window.scrollY > window.innerHeight * 7.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Skills", href: "/skills" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-2" : "bg-transparent py-4 xl:py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif font-bold text-foreground tracking-widest whitespace-nowrap flex items-end gap-1">
              AJ <span className="text-sm font-sans tracking-normal opacity-70 pb-1 hidden sm:inline-block border-l border-foreground/30 pl-2 ml-1">Atharva9167j</span><span className="text-primary">.</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-foreground/80 hover:text-foreground text-[10px] uppercase font-sans tracking-[0.2em] transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <a
                href="/Atharva_Dharmendra_Jagtap_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-foreground border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary px-6 py-2.5 text-[10px] uppercase font-sans tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
              >
                Resume ↗
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground/80 hover:text-foreground focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col items-center px-4 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground/80 hover:text-primary text-xs uppercase font-sans tracking-[0.2em] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/30 w-full flex justify-center">
              <a
                href="/Atharva_Dharmendra_Jagtap_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary px-8 py-3 text-xs uppercase font-sans tracking-[0.2em] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download Resume ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
