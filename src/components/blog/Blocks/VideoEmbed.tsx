export function VideoEmbed({ url }: { url: string }) {
    return (
        <div className="my-8 aspect-video overflow-hidden rounded-xl border bg-black/10 dark:bg-white/10">
            <iframe
                src={url}
                className="h-full w-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
