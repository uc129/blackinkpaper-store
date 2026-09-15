"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../_ui/primitives/button";

export function QuantitySelector({
  value,
  onChange,
  classNames,
  max,
  disabled = false,
}: {
  value: number;
  classNames?: string;
  max?: number | null;
  disabled?: boolean;
  onChange: (quantity: number) => void;
}) {
  const canDecrease = !disabled && value > 1;
  const canIncrease = !disabled && (max == null || value < max);

  return (
    <div className={`flex items-center gap-3 ${classNames}`}>
      <Button
        variant={"icon"}
        aria-label="Decrease quantity"
        disabled={!canDecrease}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 grid place-items-center text-[var(--ink)]"
      >
        <MinusCircle size={18} />
      </Button>

      <span className="min-w-8 text-center text-base font-medium">{value}</span>

      <Button
        variant={"icon"}
        aria-label="Increase quantity"
        disabled={!canIncrease}
        onClick={() =>
          onChange(max == null ? value + 1 : Math.min(max, value + 1))
        }
        className="w-8 h-8 grid place-items-center text-[var(--ink)]"
      >
        <PlusCircle size={18} />
      </Button>
    </div>
  );
}
