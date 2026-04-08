"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Unwrap params using React.use for Next.js 15
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          if (res.status === 404) setProduct(null);
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-32 flex justify-center flex-1">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
      </div>
    );
  }

  if (!product && !isLoading) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    // Podríamos lanzar un toast acá
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-1 animate-in slide-in-from-bottom-8 duration-700">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Lado de las imágenes */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/30 border shadow-sm group">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.isFeatured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground pointer-events-none">
                Destacado
              </Badge>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <Badge variant="destructive" className="absolute top-4 right-4 pointer-events-none text-sm font-semibold">
                Oferta Limitada
              </Badge>
            )}
          </div>
        </div>

        {/* Lado de los detalles */}
        <div className="flex flex-col pb-10">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">
            {product.category}
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-muted'}`} 
                />
              ))}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                ({product.rating} / {product.reviewsCount} reseñas)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through font-medium">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <Separator className="mb-8" />

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Cantidad</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Check className="h-4 w-4 text-green-500" />
                {product.inventory} en stock
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full border bg-background px-1 py-1 h-12 shadow-sm">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-10 w-10 text-muted-foreground hover:text-foreground active:bg-muted" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-bold text-lg select-none">
                  {quantity}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-10 w-10 text-muted-foreground hover:text-foreground active:bg-muted" 
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  disabled={quantity >= product.inventory}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 rounded-full h-12 text-base shadow-lg transition-all hover:shadow-xl active:scale-95"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al Carrito
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-muted/30 p-4 border border-border/50">
            <div className="flex items-start gap-4">
              <div className="bg-background rounded-full p-2 shadow-sm shrink-0 border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Pago Seguro</h4>
                <p className="text-xs text-muted-foreground">Tus transacciones están protegidas con encriptación de 256-bits.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-2">
              <div className="bg-background rounded-full p-2 shadow-sm shrink-0 border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M5 21h14a2 2 0 0 0 2-2V7.5L14.5 2H5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Garantía de Devolución</h4>
                <p className="text-xs text-muted-foreground">Retorna el producto gratis hasta 30 días después de la compra.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
