import { InlineRenderer } from "./ArticleBody/InlineRenderer";
export function Quote({ value }: { value: any }) {
    return (
        <blockquote className="border-l-4 border-ink-light pl-4 italic text-ink-light my-6">
            <InlineRenderer nodes={value.children} />
        </blockquote>
    );
}
