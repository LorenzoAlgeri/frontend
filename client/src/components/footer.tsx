import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-bg text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 tracking-tight text-gradient">Lorenzo Algeri</h3>
            <p className="text-white/80 mb-6 font-medium leading-relaxed">
              Sviluppatore informatico specializzato in soluzioni AI e automazione per aziende.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-blue-ncs transition-all duration-300 hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-blue-ncs transition-all duration-300 hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-blue-ncs transition-all duration-300 hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Servizi</h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <button 
                  onClick={() => scrollToSection("servizi")}
                  className="hover:text-blue-ncs transition-all duration-300 font-medium"
                >
                  Chatbot AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("servizi")}
                  className="hover:text-blue-ncs transition-all duration-300 font-medium"
                >
                  Automazioni
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("servizi")}
                  className="hover:text-blue-ncs transition-all duration-300 font-medium"
                >
                  Sviluppo Web
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("servizi")}
                  className="hover:text-blue-ncs transition-all duration-300 font-medium"
                >
                  Consulenza AI
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contatti</h4>
            <div className="space-y-3 text-white/80">
              <p className="font-medium hover:text-blue-ncs transition-colors duration-300">Milano, Italia</p>
              <p className="font-medium hover:text-blue-ncs transition-colors duration-300">lorenzo.algeri03@gmail.com</p>
              <p className="font-medium hover:text-blue-ncs transition-colors duration-300">(+39) 3892869621</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-ncs/20 mt-12 pt-8 text-center text-white/80">
          <p className="font-medium">&copy; 2024 Lorenzo Algeri. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
