export function CodeBlock({ value }: { value: any }) {
    return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto my-6 text-sm">
            <code>{value.code}</code>
        </pre>
    );
}
