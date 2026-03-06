import { InlineRenderer } from "./ArticleBody/InlineRenderer";

export function Paragraph({ value }: { value: any }) {
    return (
        <p className="text-ink body mb-6">
            <InlineRenderer nodes={value.children} />
        </p>
    );
}
