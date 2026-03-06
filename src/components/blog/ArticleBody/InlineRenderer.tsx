export function InlineRenderer({ nodes }: { nodes: any[] }) {
    return nodes.map((node, i) => {
        if (typeof node === "string") return <span key={i}>{node}</span>;

        switch (node.type) {
            case "bold":
                return <strong key={i}>{node.text}</strong>;

            case "italic":
                return <em key={i}>{node.text}</em>;

            case "link":
                return (
                    <a key={i} href={node.href} className="text-blue-600 underline">
                        {node.text}
                    </a>
                );

            case "code":
                return (
                    <code key={i} className="bg-gray-100 px-1 rounded">
                        {node.text}
                    </code>
                );

            default:
                return null;
        }
    });
}
