export type Category = "Electrónica" | "Gaming" | "Audio" | "Hogar" | "Accesorios";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Representa descuento si existe
  rating: number; // Promedio
  reviewsCount: number;
  images: string[];
  category: Category;
  tags?: string[];
  inventory: number; // Stock disponible
  isFeatured?: boolean;
}
