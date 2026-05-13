'use client'

type Props = {
    label: string
    options: { id: number; label: string }[]
    value?: number
    classNames?:string
    onChange: (value: number) => void
}
export function VariantSelector({ label, options, value, classNames, onChange }: Props) {
    const activeOptionId = value ?? options[0]?.id;

    return (
        <div className={`flex flex-col gap-2 ${classNames}`}>
            <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    // const active = value === option
                    return (
                        <button
                            type="button"
                            key={option.id}
                            aria-pressed={activeOptionId === option.id}
                            onClick={() => onChange(option.id)}
                            className={`px-4 py-2 border rounded-full text-sm transition
                                ${activeOptionId === option.id ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]": "border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]"}
                                `}
                        >
                            {option.label}
                        </button>
                    )

                })}
            </div>
        </div>
    )
}
