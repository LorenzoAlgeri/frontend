import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  const scrollToContact = () => {
    const element = document.getElementById("contatti");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="progetti" className="py-24 bg-oxford-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20 animate-scroll-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Automazioni Realizzate
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              Scopri come ho aiutato aziende e professionisti a risparmiare
              tempo e aumentare l'efficienza con automazioni intelligenti basate
              su n8n e AI.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center animate-fade-in-up">
            <div className="glass-card inline-block p-8 md:p-10 max-w-2xl bg-gradient-to-br from-blue-ncs/20 to-lapis-lazuli/20">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-ncs/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-blue-ncs" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Vuoi automatizzare anche tu i tuoi processi?
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Ogni business ha esigenze uniche. Contattami per una consulenza
                gratuita e scopri come posso creare un'automazione su misura per
                le tue necessità.
              </p>
              <button onClick={scrollToContact} className="btn-primary group">
                Parliamo del tuo progetto
                <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
}
