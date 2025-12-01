import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marco Rossi",
      role: "CEO, TechSolutions",
      content: "\"Grazie a Lorenzo, ora sono già in grado di utilizzare l'AI in modo efficace nella mia professione. Ha trasformato un processo lungo e complicato in un sistema semplice e intuitivo.\""
    },
    {
      name: "Sofia Bianchi",
      role: "Marketing Manager",
      content: "\"Collaborare con Lorenzo è stato un grande investimento: tempi di produzione dimezzati e performance del nostro team visibilmente migliorata.\""
    }
  ];

  return (
    <section id="testimonianze" className="py-24 bg-penn-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20 animate-scroll-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Testimonianze</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Cosa dicono i clienti che hanno trasformato il loro business con l'AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card p-6 lg:p-8 relative group animate-fade-in-up will-change-transform" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="absolute top-6 right-6 text-white/60 drop-shadow-md">

                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="relative mr-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-ncs/20 to-lapis-lazuli/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-ncs/30 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-white/70 text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                ))}
              </div>
              
              <blockquote className="text-white/90 leading-relaxed font-medium text-lg">
                {testimonial.content}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
