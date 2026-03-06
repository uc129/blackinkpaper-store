import { IBlogAuthor } from "@/lib/api/blog/blog";
import Image from "next/image";

export function AuthorBadge({ author, date }: { author: IBlogAuthor, date?: string }) {
    return (
        <div className="flex items-center gap-space-3">
            {author.avatarUrl && (
                <Image
                    src={author.avatarUrl}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            )}

            <div className="flex flex-col">
                <span className="text-body-sm font-medium text-text-primary">
                    {author.name}
                </span>

                {date && (
                    <span className="text-body-xs text-text-secondary">
                        {new Date(date).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
}
