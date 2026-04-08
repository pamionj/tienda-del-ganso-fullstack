"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-700">
      <div className="h-24 w-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-8 ring-8 ring-green-50 dark:ring-green-950 shadow-sm">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-4">¡Orden Confirmada!</h1>
      <p className="text-lg text-muted-foreground text-center max-w-md mb-8">
        Tu compra ha sido procesada con éxito y almacenada en nuestra base de datos.
      </p>
      
      <div className="bg-muted/30 border rounded-2xl p-6 md:p-8 w-full max-w-md mb-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Número de Orden:</span>
          <span className="font-bold text-foreground font-mono text-primary">{orderNumber || "Procesando..."}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Estado de Envio:</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-100 dark:border-amber-900">
            <Package className="h-3.5 w-3.5" />
            Preparando envío
          </span>
        </div>
      </div>
      
      <Link href="/">
        <Button size="lg" className="rounded-full px-8 shadow-md">
          Continuar Comprando
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container py-32 text-center">Cargando confirmación...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
