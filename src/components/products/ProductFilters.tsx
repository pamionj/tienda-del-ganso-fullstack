"use client";

import { Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: Category | "Todos";
  onCategoryChange: (cat: Category | "Todos") => void;
  priceRange: [number, number];
  onPriceChange: (val: [number, number]) => void;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
}

const CATEGORIES: (Category | "Todos")[] = [
  "Todos",
  "Electrónica",
  "Gaming",
  "Audio",
  "Hogar",
  "Accesorios",
];

export function ProductFilters(props: ProductFiltersProps) {
  return (
    <div className="sticky top-24 flex flex-col gap-8 p-6 rounded-2xl border bg-card/60 backdrop-blur-sm text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 border-b pb-4">
        <SlidersHorizontal className="h-5 w-5" />
        <h2 className="font-bold tracking-tight text-lg">Filtros</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold tracking-tight text-sm uppercase text-muted-foreground">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={props.selectedCategory === cat ? "default" : "secondary"}
              size="sm"
              className={props.selectedCategory === cat ? "rounded-full shadow-md" : "rounded-full shadow-none hover:bg-muted-foreground/10"}
              onClick={() => props.onCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold uppercase text-muted-foreground tracking-tight">Precio Máximo</Label>
          <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            {formatCurrency(props.priceRange[1])}
          </span>
        </div>
        <Slider
          min={0}
          max={2500}
          step={50}
          value={[props.priceRange[1]]}
          onValueChange={(val) => props.onPriceChange([0, val[0]])}
          className="my-5 cursor-grab active:cursor-grabbing"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-semibold uppercase text-muted-foreground tracking-tight">Ordenar Por</Label>
        <Select
          value={props.sortBy}
          onValueChange={(val) => props.onSortChange(val as SortOption)}
        >
          <SelectTrigger className="w-full h-11 rounded-lg">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="rating">Mejor Valorados</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
