export function ImageBlock({ value }: { value: any }) {
    return (
        <figure className="my-10">
            <img src={value.url} alt={value.alt} className="rounded-lg" />
            {value.caption && (
                <figcaption className="text-sm text-ink-faint mt-2 text-center">
                    {value.caption}
                </figcaption>
            )}
        </figure>
    );
}
