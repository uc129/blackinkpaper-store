export function PriceTag({ price, previous }: { price: number; previous?: number }) {
    return (
        <div className="flex items-center gap-space-2">
            <span className="text-title-sm text-text-primary font-bold">
                ₹{price}
            </span>
            {previous && (
                <span className="text-body-xs text-text-secondary line-through">
                    ₹{previous}
                </span>
            )}
        </div>
    );
}
