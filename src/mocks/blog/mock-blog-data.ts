import { IBlogPost, IBlogPostSummary } from "@/lib/api/blog/blog";
import { RichTextDocument } from "@/lib/types/blog-types";

export const mockAuthors = [
    {
        id: "author_1",
        name: "Aarav Mehta",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "Tech writer exploring software architecture and digital craftsmanship.",
    },
    {
        id: "author_2",
        name: "Rhea Kapoor",
        avatarUrl: "https://randomuser.me/api/portraits/women/48.jpg",
        bio: "Designer and storyteller obsessed with elegant digital experiences.",
    },
];

export const mockCategories = [
    { id: "cat_js", name: "JavaScript" },
    { id: "cat_webdev", name: "Web Development" },
    { id: "cat_design", name: "Design" },
    { id: "cat_startups", name: "Startups" },
];

const sampleRichText: RichTextDocument = {
    type: "doc",
    content: [
        {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Introduction" }],
        },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Building clean and scalable architecture is less about magic and more about discipline. You build layers, connect them wisely, and avoid clever chaos.",
                },
            ],
        },
        {
            type: "image",
            attrs: {
                src: "https://picsum.photos/800",
                alt: "Tech Banner",
            },
        },
        {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Why Architecture Matters" }],
        },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Because your future self deserves to not hate you. That's it.",
                },
            ],
        },
        {
            type: "bullet_list",
            content: [
                {
                    type: "list_item",
                    content: [{ type: "text", text: "Cleaner code base" }],
                },
                {
                    type: "list_item",
                    content: [{ type: "text", text: "Better maintainability" }],
                },
                {
                    type: "list_item",
                    content: [{ type: "text", text: "Happy developers" }],
                },
            ],
        },
    ],
};

export const mockArticles: IBlogPostSummary[] = [
    {
        id: "art_001",
        slug: "building-modern-blog-architecture",
        title: "Building a Modern Blog Architecture in 2025",
        excerpt: "A walkthrough of how structure, clarity, and a dash of rebellion create a scalable blog platform.",
        coverImage: "https://picsum.photos/800",
        publishedAt: "2025-01-12T10:00:00.000Z",
        updatedAt: "2025-01-18T14:22:00.000Z",
        authorId: "author_1",
        categoryIds: ["cat_webdev", "cat_js"],
        primaryCategory: "cat_webdev",

        body: sampleRichText,
        readingTime: 6,
        tags: [],
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        commentsCount: 0,
        category: undefined,
        author: undefined,
        date: ""
    },
    {
        id: "art_002",
        slug: "designing-with-intent",
        title: "Designing with Intent: How to Improve UX Without Guessing",
        excerpt: "Design isn't magic. It's observation, feedback, iteration, and a suspicious amount of coffee.",
        coverImage: "https://picsum.photos/800",
        publishedAt: "2025-01-20T07:30:00.000Z",
        updatedAt: "2025-01-22T11:00:00.000Z",
        authorId: "author_2",
        categoryIds: ["cat_design"],
        body: sampleRichText,
        readingTime: 7,
        primaryCategory: "",
        tags: [],
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        commentsCount: 0,
        category: undefined,
        author: undefined,
        date: ""
    },
    {
        id: "art_003",
        slug: "javascript-tricks-that-age-well",
        title: "JavaScript Tricks That Actually Age Well",
        excerpt: "JS has a habit of inventing a new religion every six months. These tricks survive the chaos.",
        coverImage: "https://picsum.photos/800",
        publishedAt: "2025-02-01T09:10:00.000Z",
        updatedAt: "2025-02-03T09:10:00.000Z",
        authorId: "author_1",
        categoryIds: ["cat_js"],
        body: sampleRichText,
        readingTime: 5,
        primaryCategory: "",
        tags: [],
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        commentsCount: 0,
        category: undefined,
        author: undefined,
        date: ""
    },
];

export const mockPagination = {
    page: 1,
    perPage: 10,
    total: 23,
};
