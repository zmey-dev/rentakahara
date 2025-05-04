import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "backdrop-blur-xl bg-background/80 shadow-md shadow-black/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-medium">
          <span className="font-display text-white text-xl">
            Ren Takahara
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Projects", "Solutions", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-foreground p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="glass-card md:hidden fixed top-16 left-4 right-4 p-6 rounded-xl animate-fade-in">
          <nav className="flex flex-col space-y-6">
            {["Home", "About", "Projects", "Solutions", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-foreground/90 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
