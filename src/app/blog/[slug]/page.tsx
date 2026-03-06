import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleHeader } from "@/components/blog/ArticleCard/ArticleHeader";
import { AuthorBadge } from "@/components/blog/ArticleCard/AuthorBadge";
import { CategoryPill } from "@/components/blog/ArticleCard/CategoryPill";
import { blogService } from "@/services/blogService";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: { params: { slug: string } }) {
    const article = await blogService.getBySlug(params.slug);

    if (!article) return {};

    const url = `https://yourdomain.com/blog/${article.slug}`;

    return {
        title: article.title,
        description: article.excerpt,

        openGraph: {
            title: article.title,
            description: article.excerpt,
            url,
            type: "article",
            images: [article.coverImage],
        },

        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
        },
    };
}


export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const article = await blogService.getBySlug(params.slug);

    if (!article) return notFound();

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <ArticleHeader article={article} author={article.author} />

            <div className="flex items-center gap-4 mt-6">
                <AuthorBadge author={article.author} />
                <div className="flex gap-2">
                    {article.categories.map((c) => (
                        <CategoryPill key={c.id} category={c.name} />
                    ))}
                </div>
            </div>

            <ArticleBody document={article.excerpt!} />

            <div className="mt-16 border-t pt-10">
                <AuthorBadge author={article.author} />
            </div>
        </div>
    );
}
