export function CartSummary({ subtotal, shipping, total }: { subtotal: number; shipping: number; total: number }) {
    return (
        <div className="rounded-card bg-surface p-space-4 shadow-card">
            <div className="flex justify-between text-body-sm text-text-primary mb-space-3">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-body-sm text-text-primary mb-space-3">
                <span>Shipping</span>
                <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between text-title-sm font-bold text-text-primary pt-space-2 border-t border-surface-variant">
                <span>Total</span>
                <span>₹{total}</span>
            </div>
        </div>
    );
}
