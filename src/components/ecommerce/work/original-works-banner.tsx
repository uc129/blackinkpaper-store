
import { Heading } from "@/components/_ui/primitives/heading";
import { TextDescription } from "@/components/_ui/primitives/typography";
import { mockProductService } from "@/lib/api/ecommerce/services/products-service"
import CardSimple from "../../_ui/cards/card-simple";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Button } from "@/components/_ui/primitives/button";

const originalCategory = mockProductService.getCategories().find(cat => cat.name_code === "original");
const allProducts = mockProductService.getALl();
const originalFeaturedProducts = allProducts.filter(prod =>
    prod.isFeatured === true &&
    prod.categoryId === originalCategory?.id).slice(0, 4);

const showProductsList = originalFeaturedProducts.length > 0 ? originalFeaturedProducts : allProducts.slice(0, 3);

if (originalFeaturedProducts.length <= 0) {
}

export default function OriginalWorksBanner() {
    return (
        <ContainerSimple className="original-works-banner">
            <article className="container-simple">
                <Heading size="title">Original Artworks For Sale</Heading>
                <TextDescription className="lg:w-3/4 mx-auto">
                    Explore our exclusive collection of original artworks, where creativity meets craftsmanship. Each piece is a unique expression of artistic vision, meticulously crafted by talented artists. Whether you're an art enthusiast or a seasoned collector, our original artworks offer a diverse range of styles and themes to suit every taste. Discover the beauty and authenticity of owning a one-of-a-kind masterpiece that will enrich your space and inspire your soul.
                </TextDescription>
            </article>

            <div className="grid gap-5">
                {showProductsList.map(prod => (
                    <div key={prod.id} className="col-12 lg:col-6 2xl:col-4 mb-12">
                        <CardSimple linkHref={`/store/shop/product/${prod.slug}`} imageSrc={prod.coverImageUrl} title={prod.name} />
                    </div>
                ))}
            </div>

            <div>
                <Button variant={"pill"} size={'pill_lg'}>Shop Now</Button>
            </div>

        </ContainerSimple>
    )
}