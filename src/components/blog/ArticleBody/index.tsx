import { RichTextDocument } from "@/lib/types/blog-types";
import { BlockRenderer } from "./BlockRenderer";


export function ArticleBody({ document }: { document: RichTextDocument | string }) {

  if (typeof document !== "string") {
    return (
      <div className="prose prose-neutral max-w-none">
        {document?.content?.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    );
  }

  // fallback when document is a string
  return (
    <div className="prose prose-neutral max-w-none">
      {document}
    </div>
  );

}
