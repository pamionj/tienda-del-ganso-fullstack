"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group block h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.isFeatured}
          />
          {product.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Destacado
            </Badge>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <Badge variant="destructive" className="absolute top-3 right-3 font-semibold">
              Sale
            </Badge>
          )}
        </div>
        
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-xs font-medium text-foreground">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-semibold tracking-tight text-lg line-clamp-1 mb-1">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            
            <Button 
              onClick={handleAddToCart}
              size="sm" 
              className="rounded-full shadow-sm transition-transform active:scale-95"
            >
              <ShoppingCart className="h-4 w-4 mr-1 sm:hidden lg:inline-block" />
              <span>Añadir</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
