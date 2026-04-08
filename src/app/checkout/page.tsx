import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-1 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Finalizar Compra</h1>
            <p className="text-muted-foreground">Completa tus datos para procesar tu orden de forma segura.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Pago 100% Seguro
          </div>
        </div>
        
        <CheckoutForm />
      </div>
    </div>
  );
}
