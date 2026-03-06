import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { ContainerSimple, ContainerSimpleInLine } from "@/components/_ui/containers/container-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { NavLink } from "@/components/_ui/primitives/links";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { mockProducts } from "@/mocks/blog/mock-product-data";

const allProductsGrid = <ProductGrid products={mockProducts} hover={true} />;

const originalWorksProducts = mockProducts.filter(prod => prod.productShopCategory === "digital");
const originalProductsGrid = originalWorksProducts.length > 0 ? <ProductGrid products={originalWorksProducts} /> : <Heading size={"h4"}>No Original Works Available</Heading>;
// const originalWorksProductsList 

const printWorksProducts = mockProducts.filter(prod => prod.productShopCategory === "print");
const printProductsGrid = printWorksProducts.length > 0 ? <ProductGrid products={printWorksProducts} /> : <Heading size={"h4"}>No Print Works Available</Heading>;


// const tabItems: TabItem[] = [
//     {
//         label: "Original Works",
//         value: "original-works-tab",
//         content: originalProductsGrid
//     },
//     {
//         label: "Print Works",
//         value: "print-works-tab",
//         content: printProductsGrid
//     }]


export default function StoreLandingPage() {
    return (
        <Page>
            <Heading size="title" className="text-center font-bold breathe-room">Blackinkpaper Store</Heading>
            <Section className="mx-auto">
                <ContainerSimple className="gap-24 my-12">
                    <ContainerSimpleInLine className="gap-32">
                        <NavLink href="/store/shop/category/originals" text="Original" linkSize="md" />
                        <NavLink href="/store/shop/category/prints" text="Prints" linkSize="md" />
                    </ContainerSimpleInLine>
                    <ContainerSimple className=" ">
                        {allProductsGrid}
                    </ContainerSimple>
                </ContainerSimple>
            </Section>
        </Page>
    );
}