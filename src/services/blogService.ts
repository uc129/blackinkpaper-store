// services/blogService.ts

import { mockArticles, mockAuthors, mockCategories } from "@/mocks/blog/mock-blog-data";


export const blogService = {


    async getAll({ category, author, sort, page }: any) {
        let filtered = [...mockArticles];

        if (category) {
            filtered = filtered.filter(a => a.category === category);
        }

        if (author) {
            filtered = filtered.filter(a => a.author.slug === author);
        }

        if (sort === "newest") {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sort === "oldest") {
            filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (sort === "popular") {
            filtered.sort((a, b) => b.views - a.views);
        }

        const pageSize = 10;
        const totalPages = Math.ceil(filtered.length / pageSize);
        const start = (page - 1) * pageSize;

        return {
            articles: filtered.slice(start, start + pageSize),
            totalPages,
        };
    },

    async getBySlug(slug: string) {
        const article = mockArticles.find((a) => a.slug === slug);
        if (!article) return null;

        return {
            ...article,
            author: mockAuthors.find((x) => x.id === article.authorId)!,
            categories: article.categoryIds.map(
                (id) => mockCategories.find((c) => c.id === id)!
            ),
        };
    },

};
