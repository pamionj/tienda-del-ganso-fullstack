import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[400px] border border-dashed rounded-xl bg-muted/20 pb-10 w-full animate-in fade-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h3 className="text-xl font-medium tracking-tight">No se encontraron productos</h3>
        <p className="text-muted-foreground text-sm mt-2 max-w-sm text-center">
          No hay resultados que coincidan con tu búsqueda actual. Intenta ajustar los filtros de categoría o precio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
