import type { Project } from "@/data/projects";
import { ArrowRight, Wrench } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onViewDetails,
}: ProjectCardProps) {
  return (
    <div
      className="glass-card overflow-hidden group animate-fade-in-up cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* Image placeholder area */}
      <div className="relative h-48 bg-gradient-to-br from-penn-blue to-oxford-blue overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-blue-ncs/20 flex items-center justify-center">
              <Wrench className="w-8 h-8 text-blue-ncs" />
            </div>
            <p className="text-white/60 text-sm">Screenshot workflow</p>
          </div>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-blue-ncs/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-ncs transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-blue-ncs/20 text-blue-ncs rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-white/10 text-white/60 rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          className="flex items-center text-blue-ncs font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(project);
          }}
        >
          Leggi di più
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
