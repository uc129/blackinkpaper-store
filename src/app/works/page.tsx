import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import PortfolioCard from "@/components/ecommerce/work/PortfolioCard";
import { storefrontProductService } from "@/lib/api/storefront/services";

export const dynamic = "force-dynamic";

export default async function WorksPage() {
    const portfolioPage = await storefrontProductService
        .getProducts({
            IsAvailable: false,
            Page: 1,
            PageSize: 24,
        })
        .catch(() => null);
    const works = portfolioPage?.items ?? [];

    return (
        <Page>
            <Section className="mx-auto">
                <ContainerSimple className="gap-14">
                    <div className="mx-auto max-w-3xl text-center">
                        <Heading size="title" className="font-display font-bold text-[var(--ink)]">
                            Portfolio
                        </Heading>
                        <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
                            Selected illustrations, sketches, and commissioned pieces kept as a visual archive rather than shop inventory.
                        </p>
                    </div>

                    {!portfolioPage ? (
                        <StoreServerError message="Portfolio works could not load because the store server is unavailable." />
                    ) : works.length > 0 ? (
                        <div className="grid gap-x-10 gap-y-16">
                            {works.map((product, index) => (
                                <div key={product.slug || product.id} className="col-12 lg:col-6 2xl:col-4">
                                    <PortfolioCard product={product} priority={index === 0} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-[var(--border)] bg-[var(--paper)] p-10 text-center text-[var(--ink-soft)]">
                            No portfolio works are published yet. Mark products as unavailable in the API to feature them here without selling them.
                        </div>
                    )}
                </ContainerSimple>
            </Section>
        </Page>
    );
}
