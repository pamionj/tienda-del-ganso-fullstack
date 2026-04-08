"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Feather, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function Home() {
  const {
    products,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  } = useProducts();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-1 animate-in fade-in duration-500 relative overflow-hidden">
      
      {/* Goose Motif Decorations */}
      <div className="absolute top-10 left-10 text-primary/20 rotate-12 md:top-20 md:left-20 pointer-events-none">
        <Feather size={64} strokeWidth={1.5} />
      </div>
      <div className="absolute top-60 right-5 text-primary/10 -rotate-45 md:right-32 pointer-events-none hidden sm:block">
        <Feather size={120} strokeWidth={1} />
      </div>
      <div className="absolute bottom-20 left-1/3 text-primary/15 rotate-90 pointer-events-none hidden lg:block">
        <Feather size={48} strokeWidth={1} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Descubre lo Mejor</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Navega por nuestro catálogo premium. Combina diseño minimalista, calidad superior y 
            un toque de diversión emplumada para tu día a día. Honk!
          </p>
        </div>
        <ProductSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <aside className="hidden lg:block w-[280px] shrink-0">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <section className="flex-1 min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm bg-muted text-muted-foreground font-medium px-3 py-1 rounded-full w-fit">
              Mostrando <span className="text-foreground font-bold">{products.length}</span> resultados
            </p>

            {/* Switch on Mobile / Hidden on Desktop */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 border-primary/20 hover:bg-primary/5">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  Filtrar Catálogo
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] sm:h-[80vh] overflow-y-auto rounded-t-3xl pb-10 px-4">
                <SheetHeader>
                  <SheetTitle className="sr-only">Filtros de Catálogo</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground flex flex-col items-center justify-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
              <p>Cargando catálogo premium...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-destructive">
              <p>Ocurrió un error cargando el catálogo: {error}</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </div>
    </div>
  );
}
