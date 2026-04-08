import { Product } from "../types/product";

export const mockProducts: Product[] = [
  // --- GAMA ALTA (+$500) ---
  {
    id: "p1", slug: "laptop-dell-xps-15", name: "Laptop Dell XPS 15",
    description: "Portátil premium para creadores. Pantalla OLED 4K, procesador Intel Core i9 de 13.ª generación y tarjeta gráfica RTX 4070. Diseño ultradelgado de aluminio mecanizado.",
    price: 1899.00, originalPrice: 2099.00, rating: 4.9, reviewsCount: 312,
    images: ["/products/laptop-dell-xps-15.jpg"],
    category: "Electrónica", tags: ["laptop", "pc", "trabajo", "premium"], inventory: 15, isFeatured: true
  },
  {
    id: "p2", slug: "consola-sony-ps5", name: "Sony PlayStation 5",
    description: "Experimenta cargas ultrarrápidas gracias a una SSD de ultra alta velocidad, inmersión más profunda con retroalimentación háptica, gatillos adaptativos y audio 3D.",
    price: 499.99, originalPrice: 549.99, rating: 4.8, reviewsCount: 15420,
    images: ["/products/consola-sony-ps5.jpg"],
    category: "Gaming", tags: ["consola", "playstation", "gaming", "sony"], inventory: 8, isFeatured: true
  },
  {
    id: "p3", slug: "monitor-ultrawide-lg", name: "Monitor LG UltraWide 34\"",
    description: "Pantalla curva de 34 pulgadas WQHD (3440 x 1440). Perfecto para editores de video, programadores y gaming con 144Hz y soporte G-Sync.",
    price: 549.00, rating: 4.7, reviewsCount: 430,
    images: ["/products/monitor-ultrawide-lg.jpg"],
    category: "Electrónica", tags: ["monitor", "ultrawide", "lg"], inventory: 22
  },
  {
    id: "p4", slug: "apple-iphone-14-pro", name: "Apple iPhone 14 Pro 256GB",
    description: "Sistema de cámaras Pro. Pantalla Super Retina XDR con Always-On y Dynamic Island. Chip A16 Bionic súper rápido.",
    price: 1099.00, rating: 4.9, reviewsCount: 8402,
    images: ["/products/apple-iphone-14-pro.jpg"],
    category: "Electrónica", tags: ["smartphone", "apple", "celular"], inventory: 40
  },

  // --- GAMA MEDIA ($100 - $499) ---
  {
    id: "p5", slug: "auriculares-sony-wh1000", name: "Sony WH-1000XM5",
    description: "Auriculares inalámbricos premium con la mejor cancelación de ruido activa del mercado. Batería de 30 horas y audio Hi-Res.",
    price: 349.00, originalPrice: 399.00, rating: 4.8, reviewsCount: 2150,
    images: ["/products/auriculares-sony-wh1000.jpg"],
    category: "Audio", tags: ["auriculares", "sony", "inalámbrico"], inventory: 45, isFeatured: true
  },
  {
    id: "p6", slug: "teclado-mecanico-keychron", name: "Keychron K8 Pro",
    description: "Teclado mecánico inalámbrico TKL QMK/VIA. Switches intercambiables, base de aluminio y keycaps PBT doble disparo.",
    price: 115.00, originalPrice: 130.00, rating: 4.8, reviewsCount: 342,
    images: ["/products/teclado-mecanico-keychron.jpg"],
    category: "Accesorios", tags: ["teclado", "mecánico", "gaming"], inventory: 30
  },
  {
    id: "p7", slug: "camara-retro-fujifilm", name: "Fujifilm X-T4 Mirrorless",
    description: "Cámara digital con sensor APS-C de 26.1MP. Grabación de video 4K a 60fps y estabilización de imagen en el cuerpo (IBIS).",
    price: 1499.00, rating: 4.6, reviewsCount: 120,
    images: ["/products/camara-retro-fujifilm.jpg"],
    category: "Electrónica", tags: ["fotografía", "cámara", "retro"], inventory: 5
  },
  {
    id: "p8", slug: "apple-watch-series-8", name: "Apple Watch Series 8",
    description: "Tu compañero esencial para una vida saludable ahora es aún más poderoso. Sensores avanzados para la salud y detección de choques.",
    price: 399.00, rating: 4.9, reviewsCount: 3410,
    images: ["/products/apple-watch-series-8.jpg"],
    category: "Accesorios", tags: ["smartwatch", "apple", "reloj"], inventory: 60
  },
  {
    id: "p9", slug: "oculus-quest-2", name: "Meta Quest 2 128GB",
    description: "Casco de realidad virtual todo en uno. No requiere PC ni consola. Resoluciones premium y catálogo de cientos de juegos inmersivos.",
    price: 299.00, rating: 4.7, reviewsCount: 8900,
    images: ["/products/oculus-quest-2.jpg"],
    category: "Gaming", tags: ["vr", "realidad virtual", "meta"], inventory: 110, isFeatured: true
  },
  {
    id: "p10", slug: "microfono-podcast-shure", name: "Micrófono de Condensador",
    description: "Micrófono profesional cardioide ideal para podcasts, streaming en Twitch o grabación de voces de estudio.",
    price: 189.00, originalPrice: 220.00, rating: 4.8, reviewsCount: 950,
    images: ["/products/microfono-podcast-shure.jpg"],
    category: "Audio", tags: ["micrófono", "streaming", "podcast"], inventory: 40
  },
  {
    id: "p11", slug: "escritorio-motorizado", name: "Escritorio Elevable",
    description: "Escritorio ergonómico con motor dual para trabajar sentado o de pie. Tablero de madera de bambú y estructura de acero.",
    price: 450.00, rating: 4.5, reviewsCount: 220,
    images: ["/products/escritorio-motorizado.jpg"],
    category: "Hogar", tags: ["escritorio", "ergonomía", "oficina"], inventory: 25
  },

  // --- GAMA BAJA (Bajo $100) ---
  {
    id: "p12", slug: "logitech-mx-master-3s", name: "Ratón Inalámbrico Pro",
    description: "Ratón ergonómico con scroll electromagnético y botones personalizables para productividad extrema.",
    price: 99.00, rating: 4.9, reviewsCount: 1024,
    images: ["/products/logitech-mx-master-3s.jpg"],
    category: "Accesorios", tags: ["ratón", "productividad", "inalámbrico"], inventory: 85
  },
  {
    id: "p13", slug: "control-ps4-dualshock", name: "Control PS4 DualShock 4",
    description: "Mando inalámbrico oficial para PlayStation 4. Joysticks analógicos y botones de gatillo mejorados para mayor precisión.",
    price: 59.99, rating: 4.6, reviewsCount: 5600,
    images: ["/products/control-ps4-dualshock.jpg"],
    category: "Gaming", tags: ["control", "mando", "ps4", "gaming"], inventory: 150
  },
  {
    id: "p14", slug: "airpods-pro-clon", name: "Auriculares TWS Sport",
    description: "Auriculares intrauriculares True Wireless con resistencia al agua IPX7, controles táctiles y 24 horas de autonomía con el estuche.",
    price: 35.00, originalPrice: 50.00, rating: 4.3, reviewsCount: 890,
    images: ["/products/airpods-pro-clon.jpg"],
    category: "Audio", tags: ["tws", "earbuds", "bluetooth"], inventory: 300
  },
  {
    id: "p15", slug: "altavoz-inteligente-echo", name: "Altavoz Inteligente Home",
    description: "Asistente de voz compacto con sonido rico y potente. Controla luces, termostatos y alarmas de tu casa con tu voz.",
    price: 49.00, rating: 4.7, reviewsCount: 1250,
    images: ["/products/altavoz-inteligente-echo.jpg"],
    category: "Hogar", tags: ["smart-home", "altavoz", "asistente"], inventory: 95
  },
  {
    id: "p16", slug: "cargador-rapido-gan", name: "Cargador Rápido USB-C 65W",
    description: "Cargador de pared con tecnología GaN. Dos puertos USB-C y uno USB-A para cargar laptop, tablet y celular al mismo tiempo.",
    price: 29.99, rating: 4.8, reviewsCount: 340,
    images: ["/products/cargador-rapido-gan.jpg"],
    category: "Accesorios", tags: ["cargador", "usb-c", "gan", "energía"], inventory: 400
  },
  {
    id: "p17", slug: "alfombrilla-mouse-xl", name: "Alfombrilla Deskpad XL",
    description: "Mousepad tamaño escritorio (900x400mm) con bordes cosidos y base de goma antideslizante. Movimiento suave para el ratón.",
    price: 19.99, originalPrice: 25.00, rating: 4.5, reviewsCount: 780,
    images: ["/products/alfombrilla-mouse-xl.jpg"],
    category: "Accesorios", tags: ["mousepad", "escritorio", "gaming"], inventory: 500
  },
  {
    id: "p18", slug: "cuaderno-inteligente", name: "Cuaderno Inteligente Reutilizable",
    description: "Escribe con el lapicero incluido, escanea tus notas a la nube con el celular y borra las páginas con un paño húmedo para reusar eternamente.",
    price: 32.00, rating: 4.6, reviewsCount: 412,
    images: ["/products/cuaderno-inteligente.jpg"],
    category: "Accesorios", tags: ["notas", "cuaderno", "productividad"], inventory: 150
  },
  {
    id: "p19", slug: "funda-laptop-cuero", name: "Funda de Cuero para Laptop 14\"",
    description: "Funda tipo maletín minimalista de cuero sintético premium. Resistente al agua y golpes suaves para proteger tu portátil.",
    price: 25.50, rating: 4.4, reviewsCount: 120,
    images: ["/products/funda-laptop-cuero.jpg"],
    category: "Accesorios", tags: ["funda", "maletín", "cuero"], inventory: 90
  },
  {
    id: "p20", slug: "cable-usb-c-trenzado", name: "Cable USB-C a USB-C Trenzado (2m)",
    description: "Cable de transferencia de datos y carga rápida de 100W. Cubierta trenzada de nylon de ultra resistencia que soporta 20,000 dobleces.",
    price: 12.99, rating: 4.8, reviewsCount: 3100,
    images: ["/products/cable-usb-c-trenzado.jpg"],
    category: "Accesorios", tags: ["cable", "usb-c", "duradero"], inventory: 1000
  }
];
