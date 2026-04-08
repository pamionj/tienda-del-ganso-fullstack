import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mockProducts } from "@/data/products";

export async function GET() {
  try {
    const results = [];
    
    // 1. Limpiar las tablas viejas para evitar conflictos al re-sembrar con la nueva lista
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    // 2. Inyectar el nuevo catálogo
    for (const product of mockProducts) {
      const created = await prisma.product.create({
        data: {
          slug: product.slug,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          rating: product.rating,
          reviewsCount: product.reviewsCount,
          images: product.images,
          category: product.category,
          tags: product.tags,
          inventory: product.inventory,
          isFeatured: product.isFeatured || false,
        },
      });
      results.push(created.slug);
    }
    
    return NextResponse.json(
      { message: "Semilla inyectada con éxito", count: results.length, items: results }, 
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error sembrando la base de datos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
