

export function Callout({ type = "info", children }: { type?: "info" | "warn" | "success" | "danger"; children: React.ReactNode }) {
    const colorMap = {
        info: "border-blue-300 bg-blue-50 dark:bg-blue-900/20",
        warn: "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20",
        success: "border-green-300 bg-green-50 dark:bg-green-900/20",
        danger: "border-red-300 bg-red-50 dark:bg-red-900/20",
    };

    return (
        <div
            className={`
        my-6 rounded-xl border px-4 py-3
        text-sm leading-relaxed
        ${colorMap[type]}
      `}
        >
            {children}
        </div>
    );
}
