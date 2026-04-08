"use client";

import { Mail, MapPin, Phone, Send, Bird } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 flex items-center justify-center gap-3">
          ¡Danos un <span className="text-primary italic">Honk!</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          ¿Tienes dudas, sugerencias o simplemente quieres mandarnos plumas de felicitación? Escríbenos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-10">
          <div className="flex items-start gap-5">
            <div className="bg-primary/10 p-4 rounded-full shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 mt-1">Nuestra Laguna Principal</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                123 Ruta Migratoria, Lago Central<br/>
                Avian City, CP 45000
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="bg-primary/10 p-4 rounded-full shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 mt-1">Correo Electrónico</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                hola@tiendadelganso.com<br/>
                soporte@tiendadelganso.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="bg-primary/10 p-4 rounded-full shrink-0">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 mt-1">Teléfono</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                +1 (555) GANSO-99<br/>
                Lunes a Viernes, 9am - 6pm (Hora del Nido)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border-2 p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden">
          {/* Decorative Bird */}
          <div className="absolute -top-6 -right-6 text-primary/5 pointer-events-none">
            <Bird size={180} />
          </div>
          
          <h2 className="text-2xl font-bold mb-8">Envíanos un mensaje</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            <div>
              <label className="text-sm font-bold text-muted-foreground mb-2 block uppercase tracking-wide">
                Tu Nombre
              </label>
              <input 
                required 
                type="text" 
                placeholder="Ej. Señor Ganso"
                className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-muted-foreground mb-2 block uppercase tracking-wide">
                Tu Correo
              </label>
              <input 
                required 
                type="email" 
                placeholder="ganso@estanque.com"
                className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-muted-foreground mb-2 block uppercase tracking-wide">
                Mensaje
              </label>
              <textarea 
                required 
                rows={4}
                placeholder="Hola, me encantó comprar en su laguna..."
                className="flex w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 resize-none transition-colors"
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full mt-4 gap-2 text-base font-bold rounded-xl h-14" disabled={isSent}>
              {isSent ? "¡Mensaje Volando Hacia Nosotros!" : (
                <>
                  <Send className="h-5 w-5" /> Enviar Mensaje
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
