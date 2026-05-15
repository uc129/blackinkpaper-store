import { Heading } from "@/components/_ui/primitives/heading";
import { ImageWithFallback } from "../images/imagewithfallback";

export type CardSimpleProps = {
    linkHref: string;
    imageSrc?: string | null;
    title: string;
    description?: string;
    showText?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    height?:boolean
}

export default function CardSimple(props: CardSimpleProps) {
    return (
        <a href={props.linkHref} className="product-cat-card-link group">
            <article className="product-cat-card">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {props.imageSrc ? (
                        <ImageWithFallback
                            src={props.imageSrc}
                            fill
                            alt={props.title}
                            className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[var(--paper-deep)] text-sm text-[var(--muted)]">
                            No image from server
                        </div>
                    )}
                </div>
                {props.showTitle == null || props.showTitle == true
                    &&
                    <div className="pt-2">
                        {props.showTitle == null || props.showTitle == true && <Heading size="h4" className="text-center underline underline-offset-5 decoration-1">{props.title}</Heading>}
                        {props.showTitle == null || props.showDescription == true && props.description && <p className="min-h-20 text-[var(--ink-soft)]">{props.description}</p>}
                    </div>
                }
            </article>
        </a>
    )
}
