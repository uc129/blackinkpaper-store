
import { mockProductService } from "@/lib/api/ecommerce/products"
import CardSimple from "../../_ui/cards/card-simple";
import { Heading } from "@/components/_ui/primitives/heading";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";




export default function WorkProjectsGrid() {
    const categories = mockProductService.getCategories();
    const activeCategories = categories.filter(cat => cat.isActive && cat.name_code !== "original");

    return (
        <ContainerSimple>
            <Heading size="title" className="breathe-room">Works</Heading>
            <div className="mx-auto grid gap-0 items-center align-center w-full">
                {activeCategories.map(cat => (
                    <div key={cat.id} className="col-12 lg:col-6 2xl:col-4 mb-12 ">
                        <CardSimple
                            linkHref={`/works/categories/${cat.slug}`}
                            imageSrc={cat.coverImageUrl!}
                            title={cat.print_name}
                            showTitle
                        ></CardSimple>
                    </div>
                ))}
            </div>
        </ContainerSimple>
    )

}