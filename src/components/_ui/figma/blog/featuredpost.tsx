import { ImageWithFallback } from "../../images/imagewithfallback";

interface FeaturedPostProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
}

export function FeaturedPost({ title, excerpt, category, date, readTime, image, author }: FeaturedPostProps) {
    return (
        <article className="relative h-150 overflow-hidden rounded-2xl">
            <ImageWithFallback
                src={image}
                alt={title}
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm">{category}</span>
                        <span className="text-white/80 text-sm">{date}</span>
                        <span className="text-white/80 text-sm">{readTime}</span>
                    </div>

                    <h2 className="mb-4 max-w-2xl" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
                        {title}
                    </h2>

                    <p className="mb-6 text-white/90 max-w-xl" style={{ fontSize: '1.125rem' }}>
                        {excerpt}
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
                        <span className="text-white/90">{author}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
