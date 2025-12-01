import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 bg-oxford-blue/95 backdrop-blur-md transition-all duration-300 border-b border-blue-ncs/20 ${isScrolled ? "shadow-2xl" : "shadow-lg"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Lorenzo Algeri</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="nav-link"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("chi-sono")}
              className="nav-link"
            >
              Chi sono
            </button>
            <button
              onClick={() => scrollToSection("servizi")}
              className="nav-link"
            >
              Servizi
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="nav-link"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("testimonianze")}
              className="nav-link"
            >
              Testimonianze
            </button>
            <button
              onClick={() => scrollToSection("contatti")}
              className="btn-primary"
            >
              Contatti
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl text-white hover:bg-blue-ncs/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-slide-up">
            <div className="glass-card space-y-3 p-4 mx-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-3 px-4 text-white hover:text-blue-ncs font-medium rounded-lg hover:bg-blue-ncs/10 transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("chi-sono")}
                className="block w-full text-left py-3 px-4 text-white hover:text-blue-ncs font-medium rounded-lg hover:bg-blue-ncs/10 transition-all duration-300"
              >
                Chi sono
              </button>
              <button
                onClick={() => scrollToSection("servizi")}
                className="block w-full text-left py-3 px-4 text-white hover:text-blue-ncs font-medium rounded-lg hover:bg-blue-ncs/10 transition-all duration-300"
              >
                Servizi
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block w-full text-left py-3 px-4 text-white hover:text-blue-ncs font-medium rounded-lg hover:bg-blue-ncs/10 transition-all duration-300"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("testimonianze")}
                className="block w-full text-left py-3 px-4 text-white hover:text-blue-ncs font-medium rounded-lg hover:bg-blue-ncs/10 transition-all duration-300"
              >
                Testimonianze
              </button>
              <button
                onClick={() => scrollToSection("contatti")}
                className="btn-primary w-full"
              >
                Contatti
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
