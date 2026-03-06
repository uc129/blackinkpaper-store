export function FootnoteRef({ id }: { id: string }) {
    return (
        <sup id={`fnref-${id}`} className="text-xs text-primary">
            <a href={`#fn-${id}`}>[{id}]</a>
        </sup>
    );
}


export function Footnotes({ items }: { items: { id: string; content: string }[] }) {
    return (
        <section className="mt-12 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Footnotes</h3>
            <ol className="space-y-4 text-sm">
                {items.map((f) => (
                    <li key={f.id} id={`fn-${f.id}`}>
                        {f.content}{" "}
                        <a href={`#fnref-${f.id}`} className="text-primary">
                            ↩
                        </a>
                    </li>
                ))}
            </ol>
        </section>
    );
}
