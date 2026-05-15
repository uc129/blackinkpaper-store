
import { Heading } from "@/components/_ui/primitives/heading";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";
import PortfolioCard from "./PortfolioCard";

export default function WorkProjectsGrid({ products = [] }: { products?: ProductSummaryDto[] }) {
    if (products.length === 0) {
        return null;
    }

    return (
        <ContainerSimple className="gap-16">
            <Heading size="title" className="font-display text-center text-[var(--ink)]">My Works</Heading>
            <div className="mx-auto grid gap-x-12 gap-y-20 items-center align-center w-full">
                {products.slice(0, 4).map((product, index) => (
                    <div key={product.slug || product.id} className="col-12 lg:col-6">
                        <PortfolioCard product={product} priority={index === 0} />
                    </div>
                ))}
            </div>
        </ContainerSimple>
    )

}
