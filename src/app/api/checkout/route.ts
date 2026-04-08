import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingData } = body;

    if (!items || items.length === 0 || !shippingData) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Calcular el total de forma SEGURA en el backend consultando los precios reales
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.product.id },
      });

      if (!product) {
        return NextResponse.json({ error: `Producto no encontrado: ${item.product.name}` }, { status: 404 });
      }

      subtotal += product.price * item.quantity;
      
      orderItemsData.push({
        productId: product.id,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const tax = subtotal * 0.16;
    const shippingCost = subtotal > 150 ? 0 : 15;
    const total = subtotal + tax + shippingCost;

    // Generar un número de orden único
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // Crear la orden en Supabase usando Prisma
    const order = await prisma.order.create({
      data: {
        orderNumber,
        total,
        fullName: shippingData.fullName,
        email: shippingData.email,
        address: shippingData.address,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
        items: {
          create: orderItemsData
        }
      }
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Error procesando la orden" }, { status: 500 });
  }
}
