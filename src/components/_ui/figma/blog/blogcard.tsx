import { ImageWithFallback } from "../../images/imagewithfallback";

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
}

export function BlogCard({ title, excerpt, category, date, readTime, image, author }: BlogCardProps) {
    return (
        <article className="group cursor-pointer">
            <div className="aspect-4/3 overflow-hidden rounded-xl mb-6">
                <ImageWithFallback
                    src={image}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-muted-foreground">{category}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{date}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{readTime}</span>
            </div>

            <h3 className="mb-3 group-hover:text-muted-foreground transition-colors" style={{ fontSize: '1.5rem', lineHeight: '1.3' }}>
                {title}
            </h3>

            <p className="text-foreground/70 mb-4 line-clamp-2">
                {excerpt}
            </p>

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">{author}</span>
            </div>
        </article>
    );
}
