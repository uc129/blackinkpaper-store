import { formatPriceToIntl } from "@/lib/utils";
import { ContainerSimpleInLine, Grid } from "../_ui/containers/container-simple";




export function PriceTag({ currencyCode, price, previous, notificationText, large }: { currencyCode: string, price: number; previous?: number, notificationText?: string, large?: boolean }) {

    if (large) {
        return (
            <ContainerSimpleInLine className="justify-start xl:gap-12 flex-wrap w-fit ">
                <Grid className="items-center gap-2 md:gap-4">
                    <span className="col-6 text-xl text-text-primary font-bold"> {formatPriceToIntl(price, currencyCode)}</span>
                    {previous && (
                        <span className="col-6 text-xl text-text-secondary line-through">{formatPriceToIntl(previous, currencyCode)}</span>
                    )}
                </Grid>
                {notificationText && <span className="text-xl font-bold text-amber-500"> {notificationText} </span>}
            </ContainerSimpleInLine>
        );
    }

    return (
        <ContainerSimpleInLine className="justify-start xl:gap-12 flex-wrap w-fit ">
            <Grid className="items-center gap-2 md:gap-4">
                <span className="col-6 text-title-sm text-text-primary font-bold"> {formatPriceToIntl(price, currencyCode)}</span>
                {previous && (
                    <span className="col-6 text-body-xs text-text-secondary line-through">{formatPriceToIntl(previous, currencyCode)}</span>
                )}
            </Grid>
            {notificationText && <span className="text-sm text-amber-500"> {notificationText} </span>}
        </ContainerSimpleInLine>
    );
}
