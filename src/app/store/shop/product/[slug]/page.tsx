import Section from "@/components/_ui/containers/base/section";
import Page from "@/components/_ui/containers/base/page";

import { mockProducts } from "@/mocks/blog/mock-product-data";
import { notFound } from "next/navigation";
import ProductDetailGallery, { GalleryImage } from "@/components/ecommerce/store/ProductDetailGallery";
import { ContainerSimple, ContainerSimpleInLine } from "@/components/_ui/containers/container-simple";




export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {


    const { slug } = await params;
    console.log("Product slug:", slug); // Debug log to check the slug value
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
            <Section>
                <ContainerSimpleInLine className="w-full gap-12">

                    <ProductDetailGallery images={galleryImages} className="" />

                    <div className="">
                        <p>Placeholder for product details, description, price, add to cart button, etc.</p>
                    </div>

                </ContainerSimpleInLine>
            </Section>
        </Page>
    );
}




