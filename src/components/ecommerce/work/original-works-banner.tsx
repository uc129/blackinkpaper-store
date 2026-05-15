import { Heading } from "@/components/_ui/primitives/heading";
import { TextDescription } from "@/components/_ui/primitives/typography";
import CardSimple from "../../_ui/cards/card-simple";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Button } from "@/components/_ui/primitives/button";
import type { ProductSummaryDto } from "@/lib/api/storefront/types";

export default function OriginalWorksBanner({ products }: { products: ProductSummaryDto[] }) {
  return (
    <ContainerSimple className="original-works-banner gap-14">
      <article className="container-simple text-center">
        <Heading size="title" className="font-display text-[var(--ink)]">Artworks For Sale</Heading>
        <TextDescription className="lg:w-3/4 mx-auto text-[var(--ink-soft)]">
          Fancy an original illustration? These are pieces currently available as originals and prints.
        </TextDescription>
      </article>

      <div className="grid gap-x-10 gap-y-14">
        {products.slice(0, 3).map((prod) => (
          <div key={prod.id} className="col-12 lg:col-6 2xl:col-4">
            <CardSimple
              linkHref={`/store/shop/product/${prod.slug}`}
              imageSrc={prod.media.coverImageUrl || prod.media.headerImageUrl || null}
              title={prod.name || "Artwork"}
            />
          </div>
        ))}
      </div>

      <div>
        <Button variant="pill" size="pill_lg" href="/store">
          Shop Now
        </Button>
      </div>
    </ContainerSimple>
  );
}
