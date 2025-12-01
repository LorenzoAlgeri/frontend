import { useState } from "react";
import { Link } from "wouter";
import { ExternalLink, Zap, Mail, Bot } from "lucide-react";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  icon: React.ElementType;
  gradient: string;
}

const projects: Project[] = [
  {
    id: "email-outreach",
    title: "Sistema di Email Outreach Automatizzato",
    shortDescription: "Sistema completo di cold email outreach B2B con 3 workflow collegati per gestione lead, invio personalizzato con AI e gestione disiscrizioni automatica.",
    category: "Email Automation",
    technologies: ["n8n", "OpenAI API", "Gmail API", "Google Sheets", "Telegram Bot", "Webhooks"],
    thumbnail: "/projects/Screenshot 2025-12-01 190837.png",
    icon: Mail,
    gradient: "from-blue-ncs/20 to-lapis-lazuli/20"
  },
  {
    id: "email-classifier",
    title: "Sistema Intelligente di Smistamento Email",
    shortDescription: "Classificazione automatica delle email in entrata con AI per prioritizzare lead, gestire follow-up e automatizzare risposte con Google Gemini.",
    category: "AI Classification",
    technologies: ["n8n", "Google Gemini AI", "Gmail API", "Google Sheets", "Text Classifier", "Telegram"],
    thumbnail: "/projects/Screenshot 2025-12-01 190939.png",
    icon: Bot,
    gradient: "from-lapis-lazuli/20 to-penn-blue/20"
  }
];

export default function PortfolioSection() {
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const scrollToContact = () => {
    const element = document.getElementById("contatti");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-oxford-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 animate-scroll-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Automazioni Realizzate
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Progetti reali che hanno trasformato processi manuali in sistemi automatizzati intelligenti.
            Ogni automazione è stata progettata per risolvere problemi concreti e generare risultati misurabili.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/progetto/${project.id}`}
              className="glass-card overflow-hidden group cursor-pointer animate-fade-in-up will-change-transform block"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Thumbnail */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-penn-blue to-oxford-blue">
                {!imageError[project.thumbnail] ? (
                  <img
                    src={project.thumbnail}
                    alt={`Screenshot ${project.title}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => handleImageError(project.thumbnail)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                      <project.icon className="w-10 h-10 text-blue-ncs" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-blue-ncs/90 text-white rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-blue-ncs transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/80 mb-5 leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-blue-ncs/10 text-blue-ncs border border-blue-ncs/20 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs font-medium text-white/60">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center text-blue-ncs font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Scopri di più</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-scroll-fade-in">
          <div className="glass-card max-w-3xl mx-auto p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vuoi automatizzare anche tu i tuoi processi?
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Ogni business ha esigenze uniche. Parliamo del tuo progetto e scopriamo insieme
              come l'automazione può trasformare il tuo lavoro quotidiano.
            </p>
            <button
              onClick={scrollToContact}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Parliamo del tuo progetto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
