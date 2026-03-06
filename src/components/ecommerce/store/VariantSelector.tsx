'use client'

type Props = {
    label: string
    options: string[]
    value?: string
    onChange: (value: string) => void
}

export function VariantSelector({ label, options, value, onChange }: Props) {

    return (
        <div className="flex flex-col gap-2">

            <span className="text-sm font-medium">{label}</span>

            <div className="flex flex-wrap gap-2">

                {options.map(option => {

                    const active = value === option

                    return (
                        <button
                            key={option}
                            onClick={() => onChange(option)}
                            className={`px-4 py-2 border rounded-md text-sm transition
                ${active
                                    ? "bg-black text-white border-black"
                                    : "border-neutral-300 hover:border-black"
                                }`}
                        >
                            {option}
                        </button>
                    )

                })}

            </div>

        </div>
    )
}