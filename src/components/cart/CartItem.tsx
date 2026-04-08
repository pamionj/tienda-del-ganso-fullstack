import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted/50">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium text-sm line-clamp-1 leading-snug">{item.product.name}</h4>
            <p className="text-muted-foreground text-xs mt-1">{formatCurrency(item.product.price)}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => removeItem(item.product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.inventory}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <span className="font-semibold text-sm text-primary">
            {formatCurrency(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
