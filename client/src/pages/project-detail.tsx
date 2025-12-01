import { useRoute, Link } from "wouter";
import { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Zap, Clock, Target, Mail, Bot, BarChart3, ArrowLeft } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
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
    images: [
      "/projects/Screenshot 2025-12-01 190837.png",
      "/projects/Screenshot 2025-12-01 190856.png",
      "/projects/Screenshot 2025-12-01 190913.png"
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
    images: [
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

export default function ProjectDetail() {
  const [, params] = useRoute("/progetto/:id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projects.find(p => p.id === params?.id);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-oxford-blue text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Progetto non trovato</h1>
          <Link href="/" className="text-blue-ncs hover:underline">
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const ProjectIcon = project.icon;

  return (
    <div className="min-h-screen bg-oxford-blue text-white">
      <Navigation />
      
      {/* Hero Section with Image Gallery */}
      <section className="pt-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-blue-ncs transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Torna alla Home</span>
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="relative w-full h-[50vh] md:h-[60vh] bg-gradient-to-br from-penn-blue to-oxford-blue">
          {!imageError[project.images[currentImageIndex]] ? (
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Immagine ${currentImageIndex + 1}`}
              className="w-full h-full object-contain bg-penn-blue/50 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
              onError={() => handleImageError(project.images[currentImageIndex])}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className={`w-32 h-32 rounded-3xl flex items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                <ProjectIcon className="w-16 h-16 text-blue-ncs" />
              </div>
            </div>
          )}
          
          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Image Counter & Dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <div className="flex gap-2">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-blue-ncs w-8" 
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/70 text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-2 text-sm font-semibold bg-blue-ncs text-white rounded-full shadow-lg">
              {project.category}
            </span>
          </div>

          {/* Click to expand hint */}
          <div className="absolute bottom-6 right-6 text-white/50 text-sm hidden md:block">
            Clicca sull'immagine per ingrandire
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Title & Description */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-blue-ncs uppercase tracking-wider mb-4">
              Tecnologie Utilizzate
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium bg-blue-ncs/10 text-blue-ncs border border-blue-ncs/20 rounded-xl hover:bg-blue-ncs/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="space-y-8">
            {/* La Sfida */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-orange-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">La Sfida</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                {project.challenge}
              </p>
            </div>

            {/* La Soluzione */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-ncs/20 to-lapis-lazuli/20 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-blue-ncs" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">La Soluzione</h2>
              </div>
              <div className="text-white/80 text-lg leading-relaxed">
                {project.solution.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 last:mb-0">
                    {paragraph.split('**').map((part, partIdx) => 
                      partIdx % 2 === 1 
                        ? <strong key={partIdx} className="text-white font-semibold">{part}</strong> 
                        : part
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* I Risultati */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-green-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">I Risultati</h2>
              </div>
              <ul className="space-y-4">
                {project.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/80 text-lg">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dietro le Quinte */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-purple-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Dietro le Quinte</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                {project.behindTheScenes}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 glass-card p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vuoi un sistema simile per la tua azienda?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Ogni business ha esigenze uniche. Parliamo del tuo progetto e scopriamo insieme
              come l'automazione può trasformare il tuo lavoro quotidiano.
            </p>
            <Link
              href="/#contatti"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              <Zap className="w-6 h-6" />
              Contattami per un preventivo
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl"
          >
            ×
          </button>
          
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Immagine ${currentImageIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <div className="flex gap-2">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? "bg-blue-ncs w-8" 
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/70">
                {currentImageIndex + 1} / {project.images.length}
              </span>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
