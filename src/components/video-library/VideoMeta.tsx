import { CategoryPill } from "../blog/ArticleCard/CategoryPill";

export function VideoMeta({ video }: { video: any }) {
    return (
        <section className="flex flex-col gap-space-4 mt-space-6">
            {video.categories?.length > 0 && (
                <div className="flex flex-wrap gap-space-2">
                    {video.categories.map((c: any) => (
                        <CategoryPill key={c} category={c} />
                    ))}
                </div>
            )}

            {video.description && (
                <p className="text-body-sm text-text-secondary">
                    {video.description}
                </p>
            )}
        </section>
    );
}
