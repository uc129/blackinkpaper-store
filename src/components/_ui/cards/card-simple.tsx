import { Heading } from "@/components/_ui/primitives/heading";
import { ProductCategoryType } from "@/lib/api/ecommerce/types/product-categories";
import { ProductType } from "@/lib/api/ecommerce/types/product-type";
import Image from "next/image";
import { ImageWithFallback } from "../images/imagewithfallback";

type DataType = {
    categories: ProductCategoryType[],
    products: ProductType[],
    any: any
}

export type CardSimpleProps = {
    linkHref: string;
    imageSrc: string;
    title: string;
    description?: string;
    dataType?: DataType;
    showText?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    height?:boolean
}

export default function CardSimple(props: CardSimpleProps) {
    return (
        <a href={props.linkHref} className="product-cat-card-link ">
            <article className="product-cat-card relative min-h-96">
                <ImageWithFallback src={props.imageSrc} fill alt={props.title} className="" />
                {props.showTitle == null || props.showTitle == true
                    &&
                    <div className="pt-4">
                        {props.showTitle == null || props.showTitle == true && <Heading size="h4" className="text-center underline underline-offset-5">{props.title}</Heading>}
                        {props.showTitle == null || props.showDescription == true && props.description && <p className="min-h-20">{props.description}</p>}
                    </div>
                }
            </article>
        </a>
    )
}