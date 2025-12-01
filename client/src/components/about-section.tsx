import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const skills = [
    { name: "Python", description: "Sviluppo avanzato" },
    { name: "OpenAI", description: "Integrazione AI" },
    { name: "Instagram Graph API", description: "Automazione social" },
    { name: "Blockchain/Solidity", description: "Smart contracts" },
  ];

  return (
    <section id="chi-sono" className="py-24 bg-oxford-blue animate-scroll-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Chi sono</h2>
            <p className="text-lg md:text-xl text-blue-ncs font-medium max-w-2xl mx-auto leading-relaxed">
              La mia passione è trasformare idee innovative in realtà.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  <span className="font-semibold text-white">
                    Studente universitario in Informatica all'Università degli Studi di Milano
                  </span>
                  , ho maturato esperienza nello sviluppo di automazioni e sistemi intelligenti.
                </p>
                
                <div className="space-y-6">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white">Competenze Tecniche</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="glass-card p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
                        <h4 className="font-semibold text-white mb-2 group-hover:text-blue-ncs transition-colors duration-300 text-sm lg:text-base">{skill.name}</h4>
                        <p className="text-xs lg:text-sm text-white/70">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 lg:p-8 bg-gradient-to-br from-blue-ncs/20 to-lapis-lazuli/20">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-ncs/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-ncs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-base lg:text-lg text-white leading-relaxed">
                    Ho partecipato attivamente all'{' '}
                    <a
                      href="https://www.aiweek.it/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-ncs font-semibold underline underline-offset-2 hover:text-blue-400 transition-colors"
                    >
                    AI Week Milano
                    </a>, entrando in contatto diretto con esperti e innovatori nel campo dell'intelligenza artificiale.
                  </p>

                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                  alt="Ambiente di sviluppo AI"
                  className="relative rounded-2xl shadow-2xl w-full h-auto animate-fade-in-up"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Card className="bg-primary/5 border-none shadow-card">
              <CardContent className="p-10">
                  <p className="text-xl text-slate-200 leading-relaxed font-medium">
                  Metto al servizio della tua azienda le mie <strong>competenze tecniche</strong>,{" "}
                  <strong>creatività</strong> e <strong>dedizione</strong>, garantendo soluzioni
                  personalizzate e risultati concreti.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
