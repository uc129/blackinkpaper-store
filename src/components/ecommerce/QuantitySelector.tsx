"use client";

export function QuantitySelector({ value, onChange }: { value: number; onChange: (quantity: number) => void }) {
    return (
        <div className="flex items-center gap-space-3">
            <button
                onClick={() => onChange(Math.max(1, value - 1))}
                className="w-8 h-8 grid place-items-center rounded-card bg-surface-variant text-text-primary"
            >
                –
            </button>

            <span className="text-body-sm font-medium">{value}</span>

            <button
                onClick={() => onChange(value + 1)}
                className="w-8 h-8 grid place-items-center rounded-card bg-surface-variant text-text-primary"
            >
                +
            </button>
        </div>
    );
}
