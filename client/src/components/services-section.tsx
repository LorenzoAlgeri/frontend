import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Zap, Monitor, Check, Bot, Cpu, Globe } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Bot,
      title: "Chatbot personalizzati",
      description: "Automatizza il servizio clienti, aumenta l'efficienza delle interazioni e libera risorse per concentrarti sulle attività cruciali del tuo business.",
      features: ["Integrazione multicanale", "Personalizzazione completa"],
      color: "bg-blue-ncs/10 text-blue-ncs",
      gradient: "from-blue-ncs/20 to-blue-ncs/5"
    },
    {
      icon: Cpu,
      title: "Automazioni e AI solutions",
      description: "Riduci drasticamente i tempi operativi attraverso automazioni basate su AI, dal content marketing alla gestione di dati e processi interni.",
      features: ["Analisi dei processi aziendali", "Soluzioni AI su misura"],
      color: "bg-lapis-lazuli/10 text-lapis-lazuli",
      gradient: "from-lapis-lazuli/20 to-lapis-lazuli/5"
    },
    {
      icon: Globe,
      title: "Sviluppo Web & App",
      description: "Realizzazione di siti web reattivi e applicazioni base su misura, per un'esperienza utente intuitiva e un'efficienza operativa immediata.",
      features: ["Design responsivo", "Ottimizzazione performance"],
      color: "bg-penn-blue/10 text-penn-blue",
      gradient: "from-penn-blue/20 to-penn-blue/5"
    }
  ];

  return (
    <section id="servizi" className="py-24 bg-penn-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20 animate-scroll-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Servizi</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Porta la tua azienda al livello successivo. Scopri come l'AI può rendere
            il tuo lavoro più semplice ed efficace.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-6 lg:p-8 h-full group animate-fade-in-up will-change-transform" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 lg:mb-8 bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="service-icon w-8 h-8 lg:w-10 lg:h-10" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-blue-ncs transition-colors duration-300">{service.title}</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-blue-ncs/20 flex items-center justify-center mr-3">
                      <Check className="w-3 h-3 text-blue-ncs" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
