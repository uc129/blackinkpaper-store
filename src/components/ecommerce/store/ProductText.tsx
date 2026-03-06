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
}

export function ProductText({ title, description, currentPrice, oldPrice, currencyCode, displayPrice = true, classNames, ...rest }: ProductTextProps) {
    return (
        <div className={`py-4 flex flex-col gap-3 ${classNames}`}>
            <h2 className={`${rest.titleClassNames}`}>{title}</h2>
            {description && <article className={`${rest.descriptionClassNames}`}> {description} </article>}
            {displayPrice && <PriceTag price={currentPrice} previous={oldPrice} currencyCode={currencyCode || "INR"} notificationText={rest.notificationText} />}
        </div>
    )
}