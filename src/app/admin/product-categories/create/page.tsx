import Page from "@/components/_ui/containers/base/page";
import { Heading, HeadingWithCaption } from "@/components/_ui/primitives/heading";
import ProductCategoryForm from "./ProductCategoryForm";


export default function AdminCreateProductCategoryPage() {


    return (
        <Page>
            <HeadingWithCaption as="h2" size="h2" 
            title="Create Product Category" 
            caption="Add a new product category to organize your products." 
            />

            <ProductCategoryForm/>
        </Page>
    )
}