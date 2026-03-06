import { CodeBlock } from "../CodeBlock";
import { Heading } from "../Heading";
import { ImageBlock } from "../ImageBlock";
import { OrderedList, UnorderedList } from "../List";
import { Paragraph } from "../Paragraph";
import { Quote } from "../Quote";


export function BlockRenderer({ block }: { block: any }) {
    switch (block.type) {
        case "paragraph":
            return <Paragraph value={block} />;

        case "heading":
            return <Heading value={block} />;

        case "quote":
            return <Quote value={block} />;

        case "code":
            return <CodeBlock value={block} />;

        case "olist":
            return <OrderedList value={block} />;

        case "ulist":
            return <UnorderedList value={block} />;

        case "image":
            return <ImageBlock value={block} />;


        default:
            return null;
    }
}


