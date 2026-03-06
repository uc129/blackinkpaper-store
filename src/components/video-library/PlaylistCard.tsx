import Link from "next/link";
import Image from "next/image";

export function PlaylistCard({ playlist }: { playlist: any }) {
    return (
        <Link
            href={`/videos/playlist/${playlist.slug}`}
            className="block rounded-card bg-surface shadow-card hover:shadow-cardHover transition-shadow"
        >
            <div className="relative w-full h-40 rounded-t-card overflow-hidden">
                <Image
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                />

                <span className="absolute bottom-2 left-2 
          bg-surface-variant/80 backdrop-blur 
          text-body-xs px-space-2 py-space-1 
          rounded-sm text-text-primary">
                    {playlist.videoCount} videos
                </span>
            </div>

            <div className="p-space-4">
                <h2 className="text-title-sm font-semibold text-text-primary line-clamp-2">
                    {playlist.title}
                </h2>
            </div>
        </Link>
    );
}
