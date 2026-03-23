import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}


export const formatPriceToIntl = (amount: number, currencyCode: string) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR"
}).format(amount)