import Page from "@/components/_ui/containers/base/page";

import { mockProducts } from "@/mocks/blog/mock-product-data";
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
    const galleryImages: GalleryImage[] = product.allImageUrls.map(url => ({
        src: url,
        thumb: url,
        alt: product.name
    }));

    galleryImages.unshift({
        src: product.coverImageUrl,
        thumb: product.coverImageUrl,
        alt: product.name
    });



    return (
        <Page className=""> {/* dont use items-center as center is too far center; use margin-top on child if required */}

            <ContainerSimpleInLine className="w-full mx-auto gap-6 sm:gap-12 ">
                {/* Image Gallery */}
                <Section className="" customPadding={{ l: "0", r: "0", t: "0", b: "0" }}>
                    <ProductDetailGallery images={galleryImages} className="" />
                </Section>

                {/* Add To Cart */}
                <Section customPadding={{ l: "0", r: "0", t: "0", b: "0" }} className=" flex flex-col md:mt-24 lg:mt-44 gap-14">
                    <ProductText large classNames=""
                        title={product.name}
                        titleClassNames="text-title-sm text-text-primary font-semibold line-clamp-2"
                        currentPrice={product.price_rupees}
                        oldPrice={product.price_rupees - 1000}
                        displayPrice
                        currencyCode="INR"
                        description={product.description}
                        notificationText="SALE" />
                    <HandleCartLogicComponent product={product} />
                </Section>

            </ContainerSimpleInLine>
        </Page >
    );
}




