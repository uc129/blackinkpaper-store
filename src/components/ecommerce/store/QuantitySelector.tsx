'use client'

import { useState } from "react"

type Props = {
    value?: number
    min?: number
    max?: number
    onChange?: (qty: number) => void
}

export default function QuantitySelector({
    value = 1,
    min = 1,
    max = 99,
    onChange
}: Props) {

    const [qty, setQty] = useState(value)

    const update = (newQty: number) => {
        const clamped = Math.max(min, Math.min(max, newQty))
        setQty(clamped)
        onChange?.(clamped)
    }

    return (
        <div className="flex items-center border rounded-lg overflow-hidden">

            <button
                onClick={() => update(qty - 1)}
                className="px-3 py-2 hover:bg-neutral-100"
            >
                −
            </button>

            <span className="px-4 font-medium">{qty}</span>

            <button
                onClick={() => update(qty + 1)}
                className="px-3 py-2 hover:bg-neutral-100"
            >
                +
            </button>

        </div>
    )
}