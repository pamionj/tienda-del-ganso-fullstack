"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";

interface CartDrawerProps {
  children: React.ReactNode;
}

export function CartDrawer({ children }: CartDrawerProps) {
  const { items, getSubTotal, getTotalItems } = useCartStore();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = getSubTotal();
  const itemCount = getTotalItems();

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md pr-0 overflow-hidden">
        <SheetHeader className="px-6 py-2 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Tu Carrito {itemCount > 0 && <span className="text-muted-foreground font-normal text-sm ml-2">({itemCount} ítems)</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6 ring-8 ring-background">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium tracking-tight mb-2">Tu carrito está vacío</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[250px] leading-relaxed">
              No has añadido ningún producto premium a tu carrito aún. Explora el catálogo para llenarlo.
            </p>
            <Button onClick={() => setOpen(false)} className="rounded-full px-8 shadow-sm">
              Explorar Catálogo
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-4">
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-1 pb-4 pt-2">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t px-6 pt-5 pb-8 mt-auto bg-background/80 backdrop-blur-sm">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium text-foreground">{formatCurrency(total)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-sm">Envío estimado</span>
                  <span className="text-sm font-medium text-foreground">Calculado al checkout</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-semibold text-lg tracking-tight">Total Adeudado</span>
                  <span className="font-bold text-2xl text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
              
              <Link href="/checkout" onClick={() => setOpen(false)} className="block w-full">
                <Button className="w-full rounded-full h-14 text-base font-semibold transition-all shadow-md hover:shadow-lg hover:bg-primary/95 active:scale-[0.98]">
                  Proceder al Pago
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
