import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Bird } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/40 py-12 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bird className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">La Tienda del Ganso</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Descubre nuestra cuidada selección de productos de primera línea diseñados para hacerte tan feliz como un ganso en un lago.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold tracking-tight text-foreground">Comprar</h3>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Todo el catálogo</Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Novedades</Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ofertas</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold tracking-tight text-foreground">Soporte</h3>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preguntas frecuentes</Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de devoluciones</Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Garantías</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold tracking-tight text-foreground">Síguenos</h3>
          <div className="flex gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-12 mb-0 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} La Tienda del Ganso. Todos los derechos honqueados.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Política de privacidad
          </Link>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Términos de servicio
          </Link>
        </div>
      </div>
    </footer>
  );
}
