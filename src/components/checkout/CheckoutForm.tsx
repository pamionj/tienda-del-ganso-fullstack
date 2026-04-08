"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, ChevronRight, CreditCard, Truck } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { shippingSchema, paymentSchema, ShippingFormValues, PaymentFormValues } from "@/lib/validations";
import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const steps = [
  { id: 1, name: "Envío", icon: Truck },
  { id: 2, name: "Pago", icon: CreditCard },
  { id: 3, name: "Revisar", icon: CheckCircle2 },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, getSubTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormValues | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Formularios
  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData || {
      fullName: "", email: "", address: "", city: "", state: "", zipCode: "", country: "",
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentData || {
      cardNumber: "", expiryDate: "", cvv: "", nameOnCard: "",
    },
  });

  const onShippingSubmit = (data: ShippingFormValues) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const onPaymentSubmit = (data: PaymentFormValues) => {
    setPaymentData(data);
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    if (!shippingData) return;
    setIsProcessing(true);
    
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingData,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error en el servidor");
      }

      clearCart();
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Hubo un error procesando tu pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getSubTotal();
  const tax = subtotal * 0.16; // 16% IVA
  const shippingCost = subtotal > 150 ? 0 : 15; // Envío gratis si sobrepasa 150
  const total = subtotal + tax + shippingCost;

  if (items.length === 0 && currentStep !== 3 && !isProcessing) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Button onClick={() => router.push("/")}>Volver al Catálogo</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-20">
      
      {/* Columna Izquierda - Formulario */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        {/* Indicador de pasos */}
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    currentStep > step.id ? 'bg-primary border-primary text-primary-foreground' : 
                    currentStep === step.id ? 'border-primary text-primary' : 
                    'border-muted text-muted-foreground'
                  } transition-colors`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                     currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>{step.name}</span>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className={`absolute top-5 left-14 h-0.5 w-full -translate-y-1/2 rounded ${
                     currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          {/* PASO 1 - ENVÍO */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Detalles de Envío</h2>
              <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <Input id="fullName" {...shippingForm.register("fullName")} className={shippingForm.formState.errors.fullName ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.fullName && <p className="text-xs text-destructive">{shippingForm.formState.errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" {...shippingForm.register("email")} className={shippingForm.formState.errors.email ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.email && <p className="text-xs text-destructive">{shippingForm.formState.errors.email.message}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" {...shippingForm.register("address")} className={shippingForm.formState.errors.address ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.address && <p className="text-xs text-destructive">{shippingForm.formState.errors.address.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" {...shippingForm.register("city")} className={shippingForm.formState.errors.city ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.city && <p className="text-xs text-destructive">{shippingForm.formState.errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado/Provincia</Label>
                    <Input id="state" {...shippingForm.register("state")} className={shippingForm.formState.errors.state ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.state && <p className="text-xs text-destructive">{shippingForm.formState.errors.state.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Código Postal</Label>
                    <Input id="zipCode" {...shippingForm.register("zipCode")} className={shippingForm.formState.errors.zipCode ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.zipCode && <p className="text-xs text-destructive">{shippingForm.formState.errors.zipCode.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input id="country" {...shippingForm.register("country")} className={shippingForm.formState.errors.country ? "border-destructive" : ""} />
                    {shippingForm.formState.errors.country && <p className="text-xs text-destructive">{shippingForm.formState.errors.country.message}</p>}
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit" size="lg" className="rounded-full shadow-md">
                    Continuar al Pago
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* PASO 2 - PAGO */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Método de Pago</h2>
              <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nameOnCard">Nombre en la Tarjeta</Label>
                  <Input id="nameOnCard" {...paymentForm.register("nameOnCard")} placeholder="Ej. Juan Pérez" className={paymentForm.formState.errors.nameOnCard ? "border-destructive" : ""} />
                  {paymentForm.formState.errors.nameOnCard && <p className="text-xs text-destructive">{paymentForm.formState.errors.nameOnCard.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="cardNumber" maxLength={16} placeholder="0000 0000 0000 0000" {...paymentForm.register("cardNumber")} className={`pl-10 ${paymentForm.formState.errors.cardNumber ? "border-destructive" : ""}`} />
                  </div>
                  {paymentForm.formState.errors.cardNumber && <p className="text-xs text-destructive">{paymentForm.formState.errors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Vencimiento</Label>
                    <Input id="expiryDate" placeholder="MM/YY" {...paymentForm.register("expiryDate")} className={paymentForm.formState.errors.expiryDate ? "border-destructive" : ""} />
                    {paymentForm.formState.errors.expiryDate && <p className="text-xs text-destructive">{paymentForm.formState.errors.expiryDate.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="password" maxLength={4} placeholder="123" {...paymentForm.register("cvv")} className={paymentForm.formState.errors.cvv ? "border-destructive" : ""} />
                    {paymentForm.formState.errors.cvv && <p className="text-xs text-destructive">{paymentForm.formState.errors.cvv.message}</p>}
                  </div>
                </div>
                <div className="pt-6 border-t flex items-center justify-between">
                  <Button type="button" variant="ghost" onClick={() => setCurrentStep(1)}>
                    Atrás
                  </Button>
                  <Button type="submit" size="lg" className="rounded-full shadow-md">
                    Revisar Orden
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* PASO 3 - REVISIÓN */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Revisar Orden</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <h3 className="font-semibold text-sm tracking-wide text-primary mb-3">DIRECCIÓN DE ENVÍO</h3>
                  <p className="text-sm font-medium">{shippingData?.fullName}</p>
                  <p className="text-sm text-muted-foreground">{shippingData?.address}</p>
                  <p className="text-sm text-muted-foreground">{shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}</p>
                  <p className="text-sm text-muted-foreground">{shippingData?.country}</p>
                  <p className="text-sm text-muted-foreground mt-2">{shippingData?.email}</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <h3 className="font-semibold text-sm tracking-wide text-primary mb-3">MÉTODO DE PAGO</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">•••• •••• •••• {paymentData?.cardNumber.slice(-4)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Vence: {paymentData?.expiryDate}</p>
                  <p className="text-sm text-muted-foreground mt-2">{paymentData?.nameOnCard}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t flex items-center justify-between">
                <Button type="button" variant="ghost" onClick={() => setCurrentStep(2)} disabled={isProcessing}>
                  Atrás
                </Button>
                <Button 
                  onClick={handlePlaceOrder} 
                  size="lg" 
                  className="rounded-full px-8 shadow-lg active:scale-95 transition-all text-base"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Procesando el pago..." : "Confirmar y Pagar"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Columna Derecha - Resumen de la Orden */}
      <div className="lg:col-span-5 bg-card border rounded-2xl p-6 md:p-8 shadow-sm lg:sticky lg:top-24">
        <h3 className="text-xl font-bold tracking-tight mb-6">Resumen de la Orden</h3>
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                <p className="text-muted-foreground text-xs mt-1">Cant: {item.quantity}</p>
              </div>
              <span className="font-medium text-sm text-right shrink-0">
                {formatCurrency(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-3">
          <div className="flex justify-between text-muted-foreground">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm font-medium text-foreground">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span className="text-sm">Envío</span>
            <span className="text-sm font-medium text-foreground">{shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span className="text-sm">Impuestos (16%)</span>
            <span className="text-sm font-medium text-foreground">{formatCurrency(tax)}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between">
            <span className="font-semibold text-lg">Total</span>
            <span className="font-bold text-2xl text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
