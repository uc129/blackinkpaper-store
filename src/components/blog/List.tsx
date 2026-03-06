import { InlineRenderer } from "./ArticleBody/InlineRenderer";

export function OrderedList({ value }: { value: any }) {
    return (
        <ol className="list-decimal ml-6 my-6">
            {value.items.map((item: any, idx: any) => (
                <li key={idx}>
                    <InlineRenderer nodes={item.children} />
                </li>
            ))}
        </ol>
    );
}


export function UnorderedList({ value }: { value: any }) {
    return (
        <ul className="list-disc ml-6 my-6">
            {value.items.map((item: any, idx: any) => (
                <li key={idx}>
                    <InlineRenderer nodes={item.children} />
                </li>
            ))}
        </ul>
    );
}

