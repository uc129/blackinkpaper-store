import Page from "@/components/_ui/containers/base/page";

import { mockProducts } from "@/lib/api/ecommerce/mockdata/mock-product-data";
import { notFound } from "next/navigation";
import ProductDetailGallery, { GalleryImage } from "@/components/ecommerce/store/ProductDetailGallery";
import Section from "@/components/_ui/containers/base/section";
import HandleCartLogicComponent from "./HandleCartLogic";
import { ContainerSimpleInLine } from "@/components/_ui/containers/container-simple";
import { ProductText } from "@/components/ecommerce/store/ProductText";


export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = mockProducts.find(p => p.slug === slug);

    if (!product) {
        notFound();
    }

    const galleryImages: GalleryImage[] = product.media.allImageUrls.map(url => ({
        src: url,
        thumb: url,
        alt: product.name
    }));

    galleryImages.unshift({
        src: product.media.coverImageUrl,
        thumb: product.media.coverImageUrl,
        alt: product.name
    });



    return (
        <Page className="items-center"> 

            <ContainerSimpleInLine className="w-full mx-auto gap-6 sm:gap-12 ">
                {/* Image Gallery */}
                <Section className="" customPadding={{ l: "0", r: "0", t: "0", b: "0" }}>
                    <ProductDetailGallery images={galleryImages} className="" />
                </Section>

                {/* Add To Cart */}
                <Section customPadding={{ l: "0", r: "0", t: "0", b: "0" }} 
                className="flex flex-col">
                    <ProductText large classNames=""
                        title={product.name}
                        titleClassNames="text-title-sm text-text-primary font-semibold line-clamp-2"
                        currentPrice={product.pricing.base_price!}
                        oldPrice={product.pricing.base_price! - 1000}
                        displayPrice
                        currencyCode="INR"
                        description={product.content.description}
                        notificationText="SALE" 
                        />
                    <HandleCartLogicComponent product={product} />
                </Section>

            </ContainerSimpleInLine>
        </Page >
    );
}




