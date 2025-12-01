import { useEffect } from "react";
import type { Project } from "@/data/projects";
import ImageGallery from "@/components/ImageGallery";
import { X, Check, Target, Lightbulb, TrendingUp, Code } from "lucide-react";

// Delay before scrolling to contacts section to allow modal close animation to complete
const MODAL_CLOSE_ANIMATION_DELAY_MS = 300;

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({
  project,
  onClose,
}: ProjectDetailProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen py-8 px-4">
        <div
          className="max-w-4xl mx-auto bg-oxford-blue rounded-2xl shadow-2xl border border-blue-ncs/20 animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-oxford-blue/95 backdrop-blur-md rounded-t-2xl border-b border-blue-ncs/20 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-white pr-8">
              {project.title}
            </h2>
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              onClick={onClose}
              aria-label="Chiudi"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium bg-blue-ncs/20 text-blue-ncs rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Image Gallery */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-ncs/20 flex items-center justify-center">
                  <Code className="w-4 h-4 text-blue-ncs" />
                </div>
                Screenshot Workflow
              </h3>
              <ImageGallery images={project.images} />
            </section>

            {/* The Challenge */}
            <section className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-red-400" />
                </div>
                La Sfida
              </h3>
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                {project.challenge}
              </p>
            </section>

            {/* The Solution */}
            <section className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-ncs/20 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-blue-ncs" />
                </div>
                La Soluzione
              </h3>
              <div className="text-white/80 leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
                {project.solution.split("**").map((part, index) =>
                  index % 2 === 1 ? (
                    <strong key={index} className="text-white font-semibold">
                      {part}
                    </strong>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </div>
            </section>

            {/* Results */}
            <section className="glass-card p-6 bg-gradient-to-br from-blue-ncs/10 to-lapis-lazuli/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                I Risultati
              </h3>
              <div className="text-white/80 leading-relaxed whitespace-pre-line">
                {project.results.split("**").map((part, index) =>
                  index % 2 === 1 ? (
                    <strong key={index} className="text-white font-semibold">
                      {part}
                    </strong>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">
                Benefici Chiave
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 glass-card p-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-ncs/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-blue-ncs" />
                    </div>
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Behind the Scenes */}
            <section className="glass-card p-6 border-l-4 border-blue-ncs">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Code className="w-4 h-4 text-purple-400" />
                </div>
                Dietro le Quinte
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {project.behindTheScenes}
              </p>
            </section>

            {/* CTA */}
            <div className="text-center pt-4">
              <p className="text-white/60 mb-4">
                Vuoi un'automazione simile per il tuo business?
              </p>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const element = document.getElementById("contatti");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, MODAL_CLOSE_ANIMATION_DELAY_MS);
                }}
                className="btn-primary"
              >
                Parliamo del tuo progetto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
