"use client";

import {  MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../_ui/primitives/button";

export function QuantitySelector({ value, onChange, classNames }: { value: number; classNames?:string, onChange: (quantity: number) => void }) {
    return (
        <div className={`flex items-center gap-3 ${classNames}`}>
            <Button variant={"icon"}
                onClick={() => onChange(Math.max(1, value - 1))}
                className="w-8 h-8 grid place-items-center text-[var(--ink)]"
            >
                <MinusCircle size={18}/>
            </Button>

            <span className="min-w-8 text-center text-base font-medium">{value}</span>

            <Button variant={"icon"} 
                onClick={() => onChange(value + 1)}
                className="w-8 h-8 grid place-items-center text-[var(--ink)]"
            >
                <PlusCircle size={18}/>
            </Button>
        </div>
    );
}
