import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoreServerError } from "@/components/ecommerce/StoreServerError";
import { ApiError } from "@/lib/api/client";
import { storefrontProductService } from "@/lib/api/storefront/services";
import { getPortfolioGalleryImages, getPortfolioHeroImage } from "@/lib/portfolio/product-artwork";

export const dynamic = "force-dynamic";

export default async function WorkItemDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [productResult, portfolioPage] = await Promise.all([
        storefrontProductService.getBySlug(slug).catch((error) => {
            if (error instanceof ApiError && error.status === 404) notFound();
            return null;
        }),
        storefrontProductService
            .getProducts({
                IsAvailable: false,
                Page: 1,
                PageSize: 100,
            })
            .catch(() => null),
    ]);

    if (!productResult) {
        return <StoreServerError message="Portfolio detail could not load because the store server is unavailable." />;
    }

    const product = productResult;
    const heroImage = getPortfolioHeroImage(product);
    const galleryImages = getPortfolioGalleryImages(product);
    const portfolioWorks = portfolioPage?.items ?? [];
    const currentIndex = portfolioWorks.findIndex((work) => work.slug === product.slug);
    const previousWork = currentIndex > 0 ? portfolioWorks[currentIndex - 1] : null;
    const nextWork = currentIndex >= 0 && currentIndex < portfolioWorks.length - 1 ? portfolioWorks[currentIndex + 1] : null;

    return (
        <article className="bg-[var(--primary)] text-[var(--ink)]">
            <section className="relative min-h-[58vh] overflow-hidden md:min-h-[66vh]">
                {heroImage ? (
                    <Image
                        src={heroImage}
                        alt={product.name || "Portfolio artwork"}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover grayscale"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[var(--paper-deep)]" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="layout-navbar relative z-10 flex min-h-[58vh] items-center justify-center py-20 text-center md:min-h-[66vh]">
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/80">Portfolio</p>
                        <h1 className="font-display text-[clamp(3.25rem,9vw,7.5rem)] font-bold leading-[0.95] text-white">
                            {product.name || "Untitled work"}
                        </h1>
                    </div>
                </div>
                <div className="absolute bottom-[-8vw] left-1/2 h-[16vw] w-[140vw] -translate-x-1/2 rounded-t-[100%] bg-[var(--primary)]" />
            </section>

            <section className="layout-navbar py-12 md:py-16">
                {product.content.description && (
                    <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-[var(--ink-soft)]">
                        {product.content.description}
                    </p>
                )}

                {galleryImages.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-12 md:gap-6">
                        {galleryImages.slice(0, 3).map((image, index) => (
                            <figure
                                key={`${image.src}-${index}`}
                                className={`relative overflow-hidden bg-[var(--paper-deep)] ${
                                    index === 0 ? "aspect-[3/5] md:col-span-3" : "aspect-[4/3] md:col-span-4"
                                } ${index === 2 ? "md:col-span-5" : ""}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </figure>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-[var(--border)] bg-[var(--paper)] p-10 text-center text-[var(--ink-soft)]">
                        No portfolio images are available for this work.
                    </div>
                )}
            </section>

            <nav aria-label="Portfolio navigation" className="layout-navbar pb-16 pt-4 md:pb-20">
                <div className="flex items-center justify-between gap-8 border-t border-[var(--border)] pt-8">
                    {previousWork ? (
                        <Link href={`/works/${previousWork.slug}`} className="group inline-flex items-center gap-3 text-left">
                            <ChevronLeft size={28} strokeWidth={1.5} aria-hidden="true" className="transition group-hover:-translate-x-1" />
                            <span className="font-display text-2xl font-bold md:text-4xl">{previousWork.name}</span>
                        </Link>
                    ) : (
                        <span aria-hidden="true" />
                    )}

                    {nextWork ? (
                        <Link href={`/works/${nextWork.slug}`} className="group inline-flex items-center gap-3 text-right">
                            <span className="font-display text-2xl font-bold md:text-4xl">{nextWork.name}</span>
                            <ChevronRight size={28} strokeWidth={1.5} aria-hidden="true" className="transition group-hover:translate-x-1" />
                        </Link>
                    ) : (
                        <span aria-hidden="true" />
                    )}
                </div>
            </nav>
        </article>
    );
}
