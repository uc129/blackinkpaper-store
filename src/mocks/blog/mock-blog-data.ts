import type { IBlogAuthor, IBlogCategory, IBlogPostSummary } from "@/lib/api/blog/blog";

export const mockAuthors: IBlogAuthor[] = [
  {
    id: "author-1",
    name: "BlackInkPaper",
    slug: "blackinkpaper",
    bio: "Studio notes from BlackInkPaper Illustration.",
  },
];

export const mockCategories: IBlogCategory[] = [
  {
    id: "category-1",
    name: "Studio",
    slug: "studio",
  },
];

export const mockArticles: IBlogPostSummary[] = [
  {
    id: "article-1",
    slug: "studio-notes",
    title: "Studio Notes",
    excerpt: "A short note from the BlackInkPaper studio.",
    coverImage: "https://picsum.photos/1200/800",
    publishedAt: "2026-01-01T00:00:00Z",
    readingTime: 3,
    authorId: "author-1",
    author: mockAuthors[0],
    category: "studio",
    categoryIds: ["category-1"],
    date: "2026-01-01T00:00:00Z",
    views: 1,
  },
];
