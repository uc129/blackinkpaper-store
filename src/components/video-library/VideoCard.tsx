import Link from "next/link";
import Image from "next/image";
import { CreatorBadge } from "./CreatorBadge";

export function VideoCard({ video }: { video: any }) {
    return (
        <Link
            href={`/videos/${video.slug}`}
            className="block rounded-card bg-surface shadow-card hover:shadow-cardHover transition-shadow"
        >
            <div className="relative w-full h-48 rounded-t-card overflow-hidden">
                {video.thumbnail && (
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                    />
                )}

                {video.duration && (
                    <span className="absolute bottom-2 right-2 
            bg-surface-variant/80 backdrop-blur 
            text-body-xs px-space-2 py-space-1 rounded-sm
            text-text-primary font-medium">
                        {video.duration}
                    </span>
                )}
            </div>

            <div className="p-space-4 flex flex-col gap-space-3">
                <h2 className="text-title-sm font-semibold text-text-primary line-clamp-2">
                    {video.title}
                </h2>

                <CreatorBadge creator={video.creator} large={undefined} />

                <div className="text-body-xs text-text-secondary flex gap-space-2">
                    {video.views && <span>{video.views} views</span>}
                    {video.publishedAt && (
                        <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
