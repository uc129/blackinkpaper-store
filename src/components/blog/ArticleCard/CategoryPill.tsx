export function CategoryPill({ category }: { category: string }) {
    return (
        <span
            className="
        inline-block 
        rounded-full 
        px-space-3 
        py-space-1 
        bg-surface-variant 
        text-body-xs 
        text-text-secondary 
        border border-border-light
      "
        >
            {category}
        </span>
    );
}
