import { useState } from "react";
import { Check, ExternalLink, X, ChevronLeft, ChevronRight, Zap, Clock, Target, Mail, Bot, BarChart3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  challenge: string;
  solution: string;
  results: string[];
  behindTheScenes: string;
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
    images: [
      "/projects/Screenshot 2025-12-01 190837.png",
      "/projects/Screenshot 2025-12-01 190856.png"
    ],
    challenge: `Gestire manualmente centinaia di email di outreach B2B era diventato insostenibile. Ogni giorno ore perse a personalizzare messaggi, tracciare risposte, gestire disiscrizioni e aggiornare fogli di calcolo. 
    
Le email generiche venivano ignorate, mentre quelle personalizzate richiedevano troppo tempo. Serviva un sistema che combinasse efficienza e personalizzazione, rispettando al contempo le normative GDPR.`,
    solution: `Ho progettato un ecosistema di 3 workflow n8n interconnessi:

**Workflow 1 - Invio Intelligente:** Schedule Trigger per esecuzione programmata, lettura lead da Google Sheets con filtri qualificati, Split in Batches per rispettare rate limits, generazione email iper-personalizzate con OpenAI basate sul profilo del lead, invio tramite Gmail con delay randomizzato per evitare spam detection.

**Workflow 2 - Gestione Disiscrizioni:** Webhook che riceve richieste di unsubscribe, validazione automatica, ricerca lead su più fogli, aggiornamento stato immediato, notifica Telegram per tracciamento in tempo reale.

**Workflow 3 - Monitoraggio:** Check condizionali multipli per statistiche, integrazione con Google Sheets per reportistica live e dashboard.`,
    results: [
      "Riduzione del 95% del tempo manuale dedicato all'outreach",
      "Tasso di risposta aumentato del 40% grazie alla personalizzazione AI",
      "100% conformità GDPR con gestione automatica disiscrizioni",
      "Tracciamento completo di ogni interazione in tempo reale",
      "ROI positivo già dal primo mese di utilizzo"
    ],
    behindTheScenes: `L'architettura si basa su un pattern event-driven con comunicazione asincrona tra i workflow. Ho implementato un sistema di retry con backoff esponenziale per gestire i rate limit delle API Gmail. 

La generazione AI utilizza prompt engineering avanzato con context injection dinamico basato sui dati del lead. Il sistema di batching è stato calibrato per inviare massimo 50 email/ora, distribuendo i carichi in modo naturale.

La sfida maggiore è stata sincronizzare lo stato tra i tre workflow mantenendo la consistenza dei dati su Google Sheets, risolta con un sistema di lock ottimistico e timestamp di versione.`,
    icon: Mail,
    gradient: "from-blue-ncs/20 to-lapis-lazuli/20"
  },
  {
    id: "email-classifier",
    title: "Sistema Intelligente di Smistamento Email",
    shortDescription: "Classificazione automatica delle email in entrata con AI per prioritizzare lead, gestire follow-up e automatizzare risposte con Google Gemini.",
    category: "AI Classification",
    technologies: ["n8n", "Google Gemini AI", "Gmail API", "Google Sheets", "Text Classifier", "Telegram"],
    thumbnail: "/projects/Screenshot 2025-12-01 190913.png",
    images: [
      "/projects/Screenshot 2025-12-01 190913.png",
      "/projects/Screenshot 2025-12-01 190939.png"
    ],
    challenge: `La casella email era diventata un collo di bottiglia critico. Con decine di email al giorno tra richieste clienti, lead potenziali e spam, era impossibile mantenere risposte tempestive. 

I lead caldi si perdevano tra le email non lette, le opportunità sfumavano per ritardi nelle risposte, e ore venivano spese ogni giorno solo per smistare e categorizzare i messaggi. Serviva un "assistente intelligente" che capisse il contenuto e agisse di conseguenza.`,
    solution: `Ho creato un sistema a doppia modalità che lavora 24/7:

**Elaborazione Real-Time:** Gmail Trigger che cattura ogni nuova email istantaneamente, parsing del contenuto con estrazione dati strutturati.

**Classificazione AI con Google Gemini:** Ogni email viene analizzata e categorizzata in:
- "Interessati" → Notifica prioritaria immediata su Telegram
- "Non Interessati" → Archiviazione automatica con tag
- "Potenziali" → Scheduling follow-up programmato
- "Richiesta Informazioni" → Draft risposta automatica

**Elaborazione Storica:** Batch processing per recuperare e classificare email esistenti, con loop intelligente e controllo completamento.

Per ogni categoria: aggiornamento automatico Google Sheets con stato, storico interazioni e next action suggerita.`,
    results: [
      "Risparmio di 2+ ore al giorno nella gestione email",
      "Accuratezza della classificazione AI superiore al 90%",
      "Zero email perse o dimenticate",
      "Tempo di risposta ai lead caldi ridotto a minuti invece che ore",
      "Dashboard in tempo reale con visibilità completa su Google Sheets"
    ],
    behindTheScenes: `Il classificatore utilizza un approccio multi-stage: prima un pre-filtro rule-based per escludere spam ovvio, poi l'analisi semantica con Gemini per la classificazione fine.

Ho implementato un sistema di confidence scoring: se l'AI non è sicura (score < 0.7), l'email viene flaggata per review manuale. Questo approccio human-in-the-loop garantisce qualità senza perdere automazione.

La sfida più interessante è stata gestire il threading delle email: dovevo capire se un messaggio era una nuova conversazione o una risposta, e aggiornare lo stato del lead di conseguenza. Risolto con analisi degli header In-Reply-To e References.`,
    icon: Bot,
    gradient: "from-lapis-lazuli/20 to-penn-blue/20"
  }
];

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const scrollToContact = () => {
    const element = document.getElementById("contatti");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeProjectDetail();
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
            <div
              key={project.id}
              className="glass-card overflow-hidden group cursor-pointer animate-fade-in-up will-change-transform"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => openProjectDetail(project)}
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
            </div>
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

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => closeProjectDetail()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-oxford-blue border-blue-ncs/30 text-white p-0">
          {selectedProject && (
            <>
              {/* Image Gallery */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-penn-blue to-oxford-blue">
                {!imageError[selectedProject.images[currentImageIndex]] ? (
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Immagine ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                    onError={() => handleImageError(selectedProject.images[currentImageIndex])}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br ${selectedProject.gradient}`}>
                      <selectedProject.icon className="w-12 h-12 text-blue-ncs" />
                    </div>
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Image Dots */}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentImageIndex ? "bg-blue-ncs" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-blue-ncs text-white rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 space-y-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/80 text-base mt-2">
                    {selectedProject.shortDescription}
                  </DialogDescription>
                </DialogHeader>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-ncs uppercase tracking-wider mb-3">
                    Tecnologie Utilizzate
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm font-medium bg-blue-ncs/10 text-blue-ncs border border-blue-ncs/20 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* La Sfida */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-orange-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">La Sfida</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">
                    {selectedProject.challenge}
                  </p>
                </div>

                {/* La Soluzione */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-ncs/20 to-lapis-lazuli/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-ncs" />
                    </div>
                    <h4 className="text-xl font-bold text-white">La Soluzione</h4>
                  </div>
                  <div className="text-white/80 leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
                    {selectedProject.solution.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 last:mb-0">
                        {paragraph.split('**').map((part, partIdx) => 
                          partIdx % 2 === 1 ? <strong key={partIdx} className="text-white font-semibold">{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                {/* I Risultati */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">I Risultati</h4>
                  </div>
                  <ul className="space-y-3">
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-white/80">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dietro le Quinte */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Dietro le Quinte</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">
                    {selectedProject.behindTheScenes}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-blue-ncs/20">
                  <button
                    onClick={scrollToContact}
                    className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Vuoi un sistema simile? Contattami
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
