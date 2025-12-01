import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
//import { apiRequest } from "@/lib/queryClient";
import { sendContactEmail } from "@/lib/email";
import { insertContactSchema } from "@shared/schema";
import { Mail, Phone, MapPin } from "lucide-react";
import type { InsertContact } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      //const response = await apiRequest("POST", "/api/contacts", data);
      //return response.json();
      return await sendContactEmail(data);
    },
    onSuccess: () => {
      toast({
        title: "Messaggio inviato con successo!",
        description: "Ti ricontatterò presto per discutere del tuo progetto.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Errore nell'invio del messaggio",
        description: error.message || "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contatti" className="py-24 bg-oxford-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20 animate-scroll-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Contatti</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Inizia oggi il tuo percorso verso l'innovazione. Lavoro principalmente da Milano,
            collaborando efficacemente con aziende su tutto il territorio nazionale.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass-card p-6 lg:p-10 animate-fade-in-up">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Richiedi una consulenza</h3>
            <p className="text-white/90 mb-8 font-medium leading-relaxed">
              Non aspettare: compila il modulo di contatto o scrivimi direttamente per scoprire
              come possiamo collaborare per migliorare il tuo business.
            </p>
              
              <Form {...form}>
                <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Nome e Cognome *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Il tuo nome completo"
                            {...field}
                            className="contact-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="la.tua@email.com"
                            {...field}
                            className="contact-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Telefono</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+39 xxx xxx xxxx"
                            {...field}
                            className="contact-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Azienda</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome della tua azienda"
                            {...field}
                            className="contact-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Messaggio *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descrivi il tuo progetto o le tue esigenze..."
                            rows={4}
                            {...field}
                            className="contact-input resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="btn-primary w-full"
                  >
                    {contactMutation.isPending ? "Invio in corso..." : "Invia Richiesta"}
                  </button>
                </form>
              </Form>
            </div>
          
          {/* Contact Info */}
          <div className="space-y-6 lg:space-y-8">
            <div className="glass-card p-6 lg:p-10 animate-fade-in-up">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8">Informazioni di Contatto</h3>
              
              <div className="space-y-8">
                <div className="flex items-center group">
                  <div className="bg-blue-ncs/20 p-4 rounded-2xl mr-6 group-hover:bg-blue-ncs/30 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-blue-ncs" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Email</p>
                    <p className="text-white/70 font-medium">lorenzo.algeri03@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-blue-ncs/20 p-4 rounded-2xl mr-6 group-hover:bg-blue-ncs/30 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-blue-ncs" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Telefono</p>
                    <p className="text-white/70 font-medium">(+39) 3892869621</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-blue-ncs/20 p-4 rounded-2xl mr-6 group-hover:bg-blue-ncs/30 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-blue-ncs" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Località</p>
                    <p className="text-white/70 font-medium">Milano, Italia</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Box */}
            <div className="glass-card p-8 lg:p-10 animate-fade-in-up bg-gradient-to-br from-blue-ncs/30 to-lapis-lazuli/30">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white">Pronto a iniziare?</h3>
              <p className="mb-6 text-white/90 font-medium text-base lg:text-lg leading-relaxed">
                Trasforma la tua azienda con l'intelligenza artificiale.
                Contattami per una consulenza personalizzata.
              </p>
              <button
                onClick={scrollToForm}
                className="btn-primary w-full sm:w-auto"
              >
                Richiedi Consulenza
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
