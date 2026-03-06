export function ProductBadge({ label }: { label: string }) {
    const color =
        label.toLowerCase() === "sale"
            ? "bg-accent text-text-onAccent"
            : "bg-surface-variant text-text-secondary";

    return (
        <span
            className={`text-body-xs px-space-2 py-space-1 rounded-sm font-medium ${color}`}
        >
            {label}
        </span>
    );
}
