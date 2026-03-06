"use client";

import { RichTextDocument } from "@/lib/types/blog-types";
import { BlockRenderer } from "./ArticleBody/BlockRenderer";


export function RichTextRenderer({ doc }: { doc: RichTextDocument }) {
    return (
        <div className="prose dark:prose-invert max-w-none">
            {doc.content?.map((node, index) => {
                return <BlockRenderer key={index} block={node} />
            })}
        </div>
    );
}


