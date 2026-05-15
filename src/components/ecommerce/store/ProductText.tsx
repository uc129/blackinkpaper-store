import { Heading } from "@/components/_ui/primitives/heading"
import { PriceTag } from "../PriceTag"


export type ProductTextProps = {
    title: string,
    description?: string,
    currencyCode?: string
    currentPrice: number,
    oldPrice?: number,
    notificationText?: string
    descriptionClassNames?: string
    titleClassNames?: string
    displayPrice?: boolean
    classNames?: string
    large?: boolean
}

export function ProductText({ title, description, currentPrice, oldPrice, currencyCode, displayPrice = true, classNames, large, ...rest }: ProductTextProps) {

    if (large) {
        return (
            <div className={`py-4 flex flex-col gap-5 ${classNames}`}>
                <Heading  size="title" className={`font-display text-[var(--ink)] ${rest.titleClassNames}`}>{title}</Heading>
                {description && <div className={`max-w-2xl whitespace-pre-line text-lg leading-relaxed text-[var(--ink-soft)] ${rest.descriptionClassNames}`}> {description} </div>}
                {displayPrice && <PriceTag large price={currentPrice} previous={oldPrice} currencyCode={currencyCode || "INR"} notificationText={rest.notificationText} />}
            </div>
        )
    }

    return (
        <div className={`py-4 flex flex-col gap-3 ${classNames}`}>
            <Heading  size="titleSmall" className={`font-display text-[var(--ink)] ${rest.titleClassNames}`}>{title}</Heading>
            {description && <article className={`text-[var(--ink-soft)] ${rest.descriptionClassNames}`}> {description} </article>}
            {displayPrice && <PriceTag price={currentPrice} previous={oldPrice} currencyCode={currencyCode || "INR"} notificationText={rest.notificationText} />}
        </div>
    )
}
