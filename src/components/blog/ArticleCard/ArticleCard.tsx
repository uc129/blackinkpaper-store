import Link from "next/link";
import { ArticleHeader } from "./ArticleHeader";
import { IBlogPostSummary } from "@/lib/api/blog/blog";


export const BlogArticleCard_SizeStyles = {
    large: "w-full h-96",          // big rectangle
    small: "w-full h-60",          // small rectangle
    square: "w-64 h-64",           // square card
};

export function ArticleCard({ article, variant }: { article: IBlogPostSummary, variant: keyof typeof BlogArticleCard_SizeStyles }) {
    return (
        <Link
            href={`/blog/${article.slug}`}
            className={`article-card ${BlogArticleCard_SizeStyles[variant]}`}
        >
            <ArticleHeader article={article} ></ArticleHeader>
        </Link>
    );
}
