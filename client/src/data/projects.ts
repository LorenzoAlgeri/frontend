export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  thumbnailPlaceholder?: string;
  images: {
    url: string;
    alt: string;
  }[];
  challenge: string;
  solution: string;
  results: string;
  behindTheScenes: string;
  benefits: string[];
  category: "automation" | "ai" | "integration";
}

export const projects: Project[] = [
  {
    id: "email-outreach-automation",
    title: "Sistema di Email Outreach Automatizzato",
    shortDescription:
      "Sistema completo di cold email outreach B2B con 3 workflow collegati: gestione invii personalizzati con AI, disiscrizioni automatiche e monitoraggio statistiche.",
    technologies: [
      "n8n",
      "OpenAI API",
      "Gmail API",
      "Google Sheets",
      "Telegram Bot",
      "Webhooks",
    ],
    thumbnailPlaceholder: "/projects/email-outreach-thumb.png",
    images: [
      {
        url: "/projects/email-outreach-workflow-1.png",
        alt: "Workflow principale di outreach email",
      },
      {
        url: "/projects/email-outreach-workflow-2.png",
        alt: "Workflow gestione disiscrizioni",
      },
      {
        url: "/projects/email-outreach-workflow-3.png",
        alt: "Workflow monitoraggio e statistiche",
      },
    ],
    challenge: `La gestione manuale delle campagne di email outreach B2B richiedeva ore di lavoro quotidiano: 
    preparare email personalizzate, gestire le disiscrizioni in modo conforme al GDPR, tracciare le risposte 
    e monitorare le performance. Il rischio di errori umani era alto e molte opportunità venivano perse 
    a causa della lentezza del processo.`,
    solution: `Ho progettato e implementato un sistema completo a 3 workflow interconnessi:

    **Workflow 1 - Invio Email Intelligente:**
    • Schedule Trigger per esecuzione programmata nelle fasce orarie ottimali
    • Lettura automatica dei lead da Google Sheets
    • Filtro intelligente per selezionare solo lead qualificati
    • Split in Batches per rispettare i rate limits di Gmail
    • Generazione email personalizzate con OpenAI (tone of voice, contenuti adattati)
    • Invio tramite Gmail API con tracking
    • Aggiornamento stato lead in tempo reale
    • Delay randomizzato per evitare spam detection

    **Workflow 2 - Gestione Disiscrizioni:**
    • Webhook che riceve richieste di unsubscribe
    • Validazione della richiesta e ricerca lead su più fogli
    • Logica condizionale per gestire casi diversi
    • Aggiornamento automatico stato "Unsubscribed"
    • Notifica Telegram per tracciamento real-time
    • Risposta SUCCESS/ERROR al webhook

    **Workflow 3 - Monitoraggio:**
    • Check condizionali multipli per analisi performance
    • Dashboard automatica su Google Sheets`,
    results: `• **95% riduzione tempo manuale** nella gestione delle campagne
    • **Conformità GDPR** automatica con gestione disiscrizioni istantanea
    • **100% email personalizzate** con AI, aumentando i tassi di risposta
    • **Zero opportunità perse** grazie al tracciamento completo
    • **Reportistica real-time** sempre disponibile`,
    behindTheScenes: `La sfida tecnica principale è stata orchestrare tre workflow che dovessero 
    comunicare in modo affidabile. Ho utilizzato Google Sheets come database condiviso per garantire 
    consistenza dei dati. Il delay randomizzato (tra 30 e 90 secondi tra le email) è stato calibrato 
    analizzando i pattern di invio umani per massimizzare la deliverability. L'integrazione con OpenAI 
    utilizza prompt engineering avanzato per mantenere consistenza nel tone of voice pur personalizzando 
    ogni messaggio in base ai dati del lead.`,
    benefits: [
      "Automazione completa del processo di outreach",
      "Rispetto GDPR con gestione automatica disiscrizioni",
      "Personalizzazione AI di ogni email",
      "Tracciamento completo delle interazioni",
      "Riduzione tempo manuale del 95%",
    ],
    category: "automation",
  },
  {
    id: "email-sorting-ai",
    title: "Sistema Intelligente di Smistamento Email con AI",
    shortDescription:
      "Sistema di classificazione automatica delle email in entrata con AI. Supporta elaborazione batch e real-time con classificazione in 4 categorie.",
    technologies: [
      "n8n",
      "Google Gemini AI",
      "Gmail API",
      "Google Sheets",
      "Text Classifier",
      "Telegram",
    ],
    thumbnailPlaceholder: "/projects/email-sorting-thumb.png",
    images: [
      {
        url: "/projects/email-sorting-workflow-1.png",
        alt: "Workflow smistamento email completo",
      },
      {
        url: "/projects/email-sorting-workflow-2.png",
        alt: "Variante workflow dark mode",
      },
    ],
    challenge: `La casella email era diventata ingestibile: centinaia di messaggi al giorno tra 
    richieste legittime, spam, lead potenziali e clienti interessati. Distinguere le priorità 
    richiedeva 2+ ore ogni giorno, con il rischio costante di perdere opportunità importanti 
    o rispondere in ritardo a richieste urgenti.`,
    solution: `Ho sviluppato un sistema di classificazione AI a doppia modalità:

    **Modalità Batch Processing:**
    • Elaborazione dello storico email esistenti
    • Loop intelligente con controllo completamento
    • Ideale per pulizia iniziale della inbox

    **Modalità Real-Time:**
    • Trigger su nuove email in arrivo
    • Classificazione istantanea

    **Classificazione AI con Google Gemini:**
    • **"Interessati"** → Azione prioritaria, notifica immediata
    • **"Non Interessati"** → Archiviazione automatica
    • **"Potenziali"** → Follow-up programmato
    • **"Richiesta Informazioni"** → Risposta automatica template

    **Per ogni categoria:**
    • Parsing intelligente del contenuto
    • Estrazione dati strutturati (nome, azienda, richiesta)
    • Aggiornamento Google Sheets con stato e metadati
    • Notifica appropriata (Telegram per urgenti, email per follow-up)`,
    results: `• **2+ ore risparmiate ogni giorno** nella gestione email
    • **>90% accuracy** nella classificazione AI
    • **Zero email perse o dimenticate**
    • **Prioritizzazione automatica** dei lead caldi
    • **Dashboard real-time** su Google Sheets sempre aggiornata`,
    behindTheScenes: `La scelta di Google Gemini rispetto ad altri LLM è stata dettata dal 
    miglior rapporto costo/performance per task di classificazione testuale in italiano. 
    Ho creato un sistema di prompt engineering con esempi few-shot per ottenere classificazioni 
    consistenti. Il sistema gestisce anche edge cases come email in lingue diverse o con 
    allegati, estraendo metadati rilevanti. L'architettura a doppia modalità permette 
    sia di processare backlog esistenti che di gestire il flusso in tempo reale.`,
    benefits: [
      "Risparmio 2+ ore/giorno nella gestione email",
      "Classificazione accurata con AI (>90% accuracy)",
      "Zero email perse o dimenticate",
      "Prioritizzazione automatica dei lead caldi",
      "Dashboard in tempo reale su Google Sheets",
    ],
    category: "ai",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
