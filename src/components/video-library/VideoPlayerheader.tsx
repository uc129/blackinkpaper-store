import { CreatorBadge } from "./CreatorBadge";

export function VideoPlayerHeader({ video }: { video: any }) {
    return (
        <header className="flex flex-col gap-space-4 py-space-4">
            <h1 className="text-title-lg font-bold text-text-primary">
                {video.title}
            </h1>

            <CreatorBadge creator={video.creator} large />

            <div className="flex gap-space-4 text-text-secondary text-body-sm">
                <span>{video.views} views</span>
                <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
            </div>
        </header>
    );
}
