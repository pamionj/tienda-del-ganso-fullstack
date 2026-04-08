"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, Bird } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { CartDrawer } from "@/components/cart/CartDrawer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  // Prevent hydration mismatch with condition
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <SheetTitle className="text-left font-bold text-xl mb-8 flex items-center gap-2">
                <Bird className="h-5 w-5 text-primary" />
                La Tienda del Ganso
              </SheetTitle>
              <nav className="flex flex-col gap-6">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Catálogo
                </Link>
                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Nosotros
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Bird className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
              La Tienda del Ganso
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="transition-colors text-muted-foreground hover:text-foreground">
            Catálogo
          </Link>
          <Link href="/about" className="transition-colors text-muted-foreground hover:text-foreground">
            Nosotros
          </Link>
          <Link href="/contact" className="transition-colors text-muted-foreground hover:text-foreground">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          
          <CartDrawer>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative group border-border hover:bg-muted/50"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-[22px] min-w-[22px] px-1 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-sm ring-2 ring-background animate-in zoom-in spin-in-12 duration-300">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartDrawer>
        </div>
      </div>
    </header>
  );
}
