import { formatPriceToIntl } from "@/lib/utils";
import { ContainerSimpleInLine, Grid } from "../_ui/containers/container-simple";




export function PriceTag({ currencyCode, price, previous, notificationText, large }: { currencyCode: string, price: number; previous?: number, notificationText?: string, large?: boolean }) {

    if (large) {
        return (
            <ContainerSimpleInLine className="justify-start xl:gap-12 flex-wrap w-fit ">
                <Grid className="items-center gap-2 md:gap-4">
                    <span className="col-6 text-2xl text-[var(--ink)] font-bold"> {formatPriceToIntl(price, currencyCode)}</span>
                    {previous && (
                        <span className="col-6 text-xl text-[var(--muted)] line-through">{formatPriceToIntl(previous, currencyCode)}</span>
                    )}
                </Grid>
                {notificationText && <span className="text-sm font-bold text-[var(--accent-1)]"> {notificationText} </span>}
            </ContainerSimpleInLine>
        );
    }

    return (
        <ContainerSimpleInLine className="justify-start xl:gap-12 flex-wrap w-fit ">
            <Grid className="items-center gap-2 md:gap-4">
                <span className="col-6 text-base text-[var(--ink)] font-normal"> {formatPriceToIntl(price, currencyCode)}</span>
                {previous && (
                    <span className="col-6 text-sm text-[var(--muted)] line-through">{formatPriceToIntl(previous, currencyCode)}</span>
                )}
            </Grid>
            {notificationText && <span className="text-sm text-[var(--accent-1)]"> {notificationText} </span>}
        </ContainerSimpleInLine>
    );
}
