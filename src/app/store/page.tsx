import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { NavLink } from "@/components/_ui/primitives/links";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { mockProducts } from "@/lib/api/ecommerce/mockdata/mock-product-data";

const allProductsGrid = <ProductGrid products={mockProducts} hover={true} />;



export default function StoreLandingPage() {
    return (
        <Page>
            <Heading size="title" className="text-center font-bold breathe-room">BlackInkPaper Store</Heading>
            <Section className="mx-auto">
                <ContainerSimple className="gap-24 my-12">
                    <div className="flex gap-32 pb-3 border-b ">
                        <NavLink href="/store/shop/category/originals" text="Original" linkSize="md" />
                        <NavLink href="/store/shop/category/prints" text="Prints" linkSize="md" />
                    </div>
                    <ContainerSimple className=" ">
                        {allProductsGrid}
                    </ContainerSimple>
                </ContainerSimple>
            </Section>
        </Page>
    );
}