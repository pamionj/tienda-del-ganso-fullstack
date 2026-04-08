"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors peer-focus:text-primary" />
      <Input
        placeholder="Buscar accesorios, equipo, etc..."
        className="pl-10 h-11 peer bg-background focus-visible:ring-primary/50 shadow-sm rounded-full"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
