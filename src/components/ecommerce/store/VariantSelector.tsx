'use client'

import { useState } from "react"

type Props = {
    label: string
    options: string[]
    value?: string
    classNames?:string
    onChange: (value: string) => void
}
export function VariantSelector({ label, options, value, classNames, onChange }: Props) {

    const [activeOptionIndex, setActiveOptionIndex] = useState(0);

    return (
        <div className={`flex flex-col gap-2 ${classNames}`}>
            <span className="text-sm font-medium">{label}</span>
            <div className="flex flex-wrap gap-2">
                {options.map((option, index) => {
                    // const active = value === option
                    return (
                        <button
                            key={option}
                            onClick={() => {setActiveOptionIndex(index); onChange(option)}}
                            className={`px-4 py-2 border rounded-md text-sm transition 
                                ${activeOptionIndex === index ? "bg-black text-white border-black": "border-neutral-300 hover:border-black"}
                                `}
                        >
                            {option}
                        </button>
                    )

                })}
            </div>
        </div>
    )
}