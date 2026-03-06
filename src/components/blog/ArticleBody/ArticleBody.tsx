

"use client";

import { RichTextDocument } from "@/lib/types/blog-types";
import { RichTextRenderer } from "../RichTextRenderer";



export function ArticleBody({ document }: { document: RichTextDocument }) {
    return (
        <article
            className="
        prose 
        prose-neutral 
        dark:prose-invert 
        max-w-none
        prose-headings:font-display
        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
        prose-p:text-base prose-li:text-base
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold
        prose-img:rounded-xl
        prose-code:text-[0.85em] prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-muted/60
      "
        >
            {RichTextRenderer({ doc: document })}
        </article>
    );
}
