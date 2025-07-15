import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="hero-gradient text-white pt-20 pb-20 animate-scroll-fade-in relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[75vh]">
          <div className="space-y-6 lg:space-y-8 animate-slide-up order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
                Automatizza, innova,{" "}
                <span className="text-gradient">risparmia tempo</span>
              </h1>
              <p className="text-xl md:text-2xl text-white leading-relaxed font-medium drop-shadow-md">
                Sono Lorenzo Algeri, sviluppatore informatico specializzato in
                soluzioni di{" "}
                <strong className="text-blue-ncs">
                  Intelligenza Artificiale
                </strong>{" "}
                e automazione per aziende.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-sm">
                Realizzo chatbot personalizzati, automazioni intelligenti, siti
                web e applicazioni per trasformare attività ripetitive in
                processi efficienti e ottimizzati.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection("contatti")}
                className="btn-primary will-change-transform"
              >
                Contattami ora per iniziare
              </button>
              <button
                onClick={() => scrollToSection("servizi")}
                className="glass-card px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 will-change-transform"
              >
                Scopri i servizi
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-scale-up order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-ncs/15 to-transparent rounded-full blur-lg"></div>
              <img
                src="/public/IMG_6584_1752600938895.png"
                alt="Lorenzo Algeri - Sviluppatore AI e Automazione"
                className="profile-image relative rounded-full w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover object-top border-4 border-blue-ncs/30"
                style={{ objectPosition: 'center top' }}
                loading="eager"
                
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
