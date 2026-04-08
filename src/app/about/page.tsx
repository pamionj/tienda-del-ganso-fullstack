import { Star, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <div className="mx-auto w-48 h-48 md:w-64 md:h-64 relative mb-8 hover:scale-105 transition-transform duration-500">
          <Image 
            src="/ganso.png" 
            alt="El Ganso, Mascota Oficial de La Tienda"
            fill
            className="object-contain drop-shadow-2xl"
            priority={true}
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Sobre La Tienda del Ganso
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Nacimos con una misión simple: traerte los mejores productos tecnológicos y de estilo de vida para que seas tan feliz como un ganso en el agua.
        </p>
      </div>

      <div className="bg-card border p-8 md:p-12 rounded-3xl shadow-sm text-lg text-muted-foreground leading-loose mb-20">
        <p className="mb-6">
          En <strong className="text-foreground">La Tienda del Ganso</strong> (antes conocida como NexCart), creemos que las compras por internet tienen que tener corazón y personalidad. Por eso, curamos y seleccionamos a mano cada producto de nuestro catálogo para garantizar que recibes tecnología y accesorios premium sin excusas.
        </p>
        <p>
          Nuestro equipo de gansos expertos trabaja día y noche identificando las mejores marcas, peleando por asegurar precios justos y preparando los envíos para que lleguen volando directamente hasta la puerta de tu nido. Tu satisfacción no es nuestra prioridad, es nuestra obsesión.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-center tracking-tight mb-10">¿Por qué elegirnos?</h2>
      
      <div className="grid sm:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center p-8 bg-card rounded-3xl border shadow-sm transition-transform hover:-translate-y-2">
          <div className="bg-amber-500/10 p-4 rounded-full mb-6">
            <Star className="h-8 w-8 text-amber-500" />
          </div>
          <h3 className="font-bold text-xl mb-3 text-foreground">Calidad Premium</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Solo los productos con las mejores especificaciones del mercado tienen el honor de entrar al catálogo del Ganso.</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-card rounded-3xl border shadow-sm transition-transform hover:-translate-y-2">
          <div className="bg-green-500/10 p-4 rounded-full mb-6">
            <ShieldCheck className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="font-bold text-xl mb-3 text-foreground">Garantía Total</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Si recibes algo y no te enamoras al instante, te regresamos el dinero de inmediato sin hacer ruidos extraños.</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-card rounded-3xl border shadow-sm transition-transform hover:-translate-y-2">
          <div className="bg-blue-500/10 p-4 rounded-full mb-6">
            <Truck className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="font-bold text-xl mb-3 text-foreground">Envíos Supersónicos</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Nuestra logística alada se encarga de que tu pedido llegue volando en picada antes de que termines de parpadear.</p>
        </div>
      </div>
    </div>
  );
}
