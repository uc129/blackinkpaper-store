import Image from "next/image";
import { AuthorBadge } from "./AuthorBadge";
import { IBlogAuthor, IBlogPost, IBlogPostSummary } from "@/lib/api/blog/blog";

export function ArticleHeader({ article, author }: { article: IBlogPostSummary, author?: IBlogAuthor }) {
    return (
        <header className="flex flex-col gap-space-6">
            <h1 className="text-title-lg font-bold text-text-primary">
                {article.title}
            </h1>



            {article.readingTime && article.publishedAt &&
                <div className="flex items-center gap-space-2 text-body-sm text-text-secondary">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{article.readingTime} min read</span>
                </div>
            }
            {author &&
                <AuthorBadge author={author!} date={article.publishedAt!} />
            }
        </header>
    );
}
