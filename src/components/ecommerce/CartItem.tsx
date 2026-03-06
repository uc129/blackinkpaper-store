import Image from "next/image";
import { QuantitySelector } from "./QuantitySelector";
import { PriceTag } from "./PriceTag";

export function CartItem({ item, onQtyChange, onRemove }: { item: any, onQtyChange: (product: any, quantity: number) => void, onRemove: (product: any) => void }) {
    return (
        <div className="flex gap-space-4 p-space-4 border-b border-surface-variant">
            <div className="relative w-24 h-24 rounded-card overflow-hidden">
                <Image src={item.product.images[0]} alt="" fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-space-2 flex-1">
                <h3 className="text-body-sm text-text-primary font-medium">
                    {item.product.title}
                </h3>

                <PriceTag price={item.product.price} previous={undefined} />

                <QuantitySelector
                    value={item.quantity}
                    onChange={(q: number) => onQtyChange(item.product, q)}
                />

                <button
                    onClick={() => onRemove(item.product)}
                    className="text-body-xs text-accent font-medium mt-space-2"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
