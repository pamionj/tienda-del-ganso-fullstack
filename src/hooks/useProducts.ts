import { useState, useMemo, useEffect } from "react";
import { Product, Category } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "Todos">("Todos");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Error fetching products from server");
        const data = await res.json();
        setAllProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "featured":
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [allProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  return {
    products: filteredProducts,
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
  };
}
