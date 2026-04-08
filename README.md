# La Tienda del Ganso (E-Commerce Full-Stack)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Neon-Postgres-00e5a0?logo=postgresql&logoColor=white" alt="Neon" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-UI-000000?logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Zustand-State-764ABC?logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-Form-EC5990?logo=reacthookform&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Zod-Validation-3068B7?logo=zod&logoColor=white" alt="Zod" />
</p>

Una aplicación web de comercio electrónico, construida con **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Prisma ORM** y **Neon PostgreSQL**. Diseñada como un proyecto de portafolio profesional para mostrar una arquitectura escalable, bases de datos reales en la nube, y la mejor experiencia de usuario en teléfonos móviles y escritorio.

<p align="center">
  <a href="https://tienda-del-ganso-fullstack.vercel.app/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
</p>

---

## ✨ Stack Tecnológico

| Capa | Tecnología | Propósito |
|-------|-----------|---------|
| Framework | [Next.js 15](https://nextjs.org) | App Router, React Server Components, API Routes |
| Base de Datos | Neon (Serverless Postgres) | Almacenamiento relacional ultrarrápido en la nube |
| ORM | Prisma | Modelado de datos y consultas tipadas seguras |
| UI & Estilos | Tailwind CSS + shadcn/ui | Sistema de componentes limpio, responsivo y elegante |
| Estado Global | Zustand | Gestión ágil de las lógicas del carrito |
| Formularios| react-hook-form + zod | Validación hiper-segura en pasos de Checkout y Contacto |

---

## 🚀 Cómo Inicializar el Proyecto Localmente

### 1. Requisitos Previos e Instalación
- Node.js ≥ 22
- Una base de datos gratuita de [Neon.tech](https://neon.tech)

```bash
git clone https://github.com/tu-usuario/tienda-del-ganso-fullstack.git
cd tienda-del-ganso-fullstack
npm install
```

### 2. Variables de Entorno (`.env`)
Configura las credenciales de tu base de datos en un archivo `.env`:
```env
DATABASE_URL="postgresql://usuario:password@eu-tu-db.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://usuario:password@eu-tu-db.neon.tech/neondb?sslmode=require"
```

### 3. Migración y Semillero (Seed)
Empuja tu esquema de tablas y corre el servidor comercial:
```bash
npx prisma db push
npm run dev
```

> **Aviso Importante:** Al iniciar por primera vez, entra con tu navegador a `http://localhost:3000/api/seed` para que la base de datos consuma automáticamente los 20 objetos de nuestro catálogo de prueba (Seeding).

---

## 🌟 Características Destacadas

### 🛒 Catálogo Conectado a SQL
- Tarjetas de producto alimentadas agresivamente por **PostgreSQL**.
- UX de **filtros avanzados**: El menú de filtros de catálogo para versión móvil utiliza un Drawer inteligente tipo App Nativa.
- Imágenes de producto precargadas y listas para compresión en los Edge Servers de Vercel.

### 💳 Checkout en API Segura
- El cálculo total no confía en el navegador del usuario: el endpoint `/api/checkout` repasa el carrito contra la base de datos real para protegerte contra manipulación de montos.
- Animaciones limpias y redirección a página de éxito dinámica de servidor.

### 🦆 Identidad de Marca Unificada
- Cero links rotos (`/about`, `/contact`).
- Identidad cálida, tonos *"naranja ganso"*, y esquinas redondas y amistosas gracias a los Design Tokens personalizables de Tailwind.

---

🚀 **Roadmap Futuro (Version 2.0):** Panel de Administración Seguro y Almacenamiento Dinámico de Archivos (Imágenes) con Supabase Storage o AWS S3.

---

## 📄 Licencia

MIT © 2026

<hr />

<p align="center">
  <sub>Construido con ❤️ por <strong>Pablo Amion</strong> — © 2026</sub>
</p>
