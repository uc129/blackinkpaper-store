import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos }: { videos: any[] }) {
    return (
        <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-space-6
    ">
            {videos.map((v) => (
                <VideoCard key={v.id} video={v} />
            ))}
        </div>
    );
}
