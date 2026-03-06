import { BlogArticleCard_SizeStyles, ArticleCard } from "@/components/blog/ArticleCard/ArticleCard";
import { FiltersUI } from "@/components/blog/FilterUI";
import { Pagination } from "@/components/blog/Pagination";
import { blogService } from "@/services/blogService";





export const revalidate = 60;

export default async function ArticlesListPage({ searchParams }: { searchParams: any }) {
    const {
        category,
        author,
        sort = "newest",
        page = "1"
    } = await searchParams;

    const filters = {
        category,
        author,
        sort,
        page: Number(page),
    };


    const { articles, totalPages } = await blogService.getAll(filters);

    if (!articles) {
        return <></>;
    }

    return (
        <div className=" section-container bg-gray-400 mx-auto px-4 pb-24">
            <div className="mb-6">
                <FiltersUI current={filters} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {articles.map((article, index) => {
                    let variant: keyof typeof BlogArticleCard_SizeStyles = index % 3 === 0 ? "large" : "small";
                    return <ArticleCard key={article.id} article={article} variant={variant} />
                })}
            </div>

            <div className="mt-12">
                <Pagination currentPage={filters.page} totalPages={totalPages} />
            </div>
        </div>
    );
}
