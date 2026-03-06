import { InlineRenderer } from "./ArticleBody/InlineRenderer";

export function Heading({ value }: { value: { level: number, children: React.ReactNode[] } }) {
    const Tag = `h${value.level}` as any;

    const classMap = {
        1: "text-h1 mt-16 mb-6",
        2: "text-h2 mt-12 mb-4",
        3: "text-h3 mt-10 mb-3",
        4: "text-h4 mt-8 mb-2",
    };

    return (
        <Tag className={`font-semibold text-ink ${classMap[value.level as keyof typeof classMap] || "text-h4 mt-8 mb-2"}`}>
            <InlineRenderer nodes={value.children} />
        </Tag>
    );
}
