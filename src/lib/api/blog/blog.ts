import { BodyContent } from "@/lib/types/blog-types";
import { ISODate } from "@/lib/types/isodate";

export interface IBlogPost {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    excerpt?: string;

    authorId: string;
    primaryCategory: string;
    categoryIds: string[];
    tags: string[];

    coverImage: string;
    imageList: string[];
    imageOrder: 'normal' | 'reverse' | 'random';

    body: BodyContent;

    publishedAt: ISODate | null;
    publishedBy?: string;

    createdAt: ISODate;
    updatedAt?: ISODate;

    isPublished: boolean;
    isFeatured: boolean;

    readonly views: number;
    readonly likes: number;
    readonly commentsCount: number;

    readingTime?: number; // computed in backend
}
export interface IBlogPostCreate {
    title: string;
    subtitle?: string;

    authorId: string;
    category: string;
    tags: string[];

    coverImage: string;
    imageList: string[];
    imageOrder: 'normal' | 'reverse' | 'random';

    body: BodyContent;

    isPublished: boolean;
    isFeatured: boolean;
}

export interface IBlogPostUpdate {
    title?: string;
    subtitle?: string;

    category?: string;
    tags?: string[];

    coverImage?: string;
    imageList?: string[];
    imageOrder?: 'normal' | 'reverse' | 'random';

    body?: BodyContent;

    isPublished?: boolean;
    isFeatured?: boolean;
}

export interface IBlogPostSummary {
    category: any;
    author: any;
    date: string | number | Date;
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    authorId: string;
    primaryCategory: string;
    categoryIds: string[];
    tags: string[];
    coverImage: string;
    excerpt?: string;
    body?: BodyContent;
    publishedAt: ISODate | null;
    updatedAt?: ISODate | null;
    isPublished: boolean;
    isFeatured: boolean;
    readonly readingTime?: number;
    readonly views: number;
    readonly likes: number;
    readonly commentsCount: number;
}

export interface IBlogPostFilters {
    authorId?: string;
    category?: string;
    tags?: string[];

    isPublished?: boolean;
    isFeatured?: boolean;

    searchQuery?: string;

    dateRange?: {
        start?: ISODate;
        end?: ISODate;
    };
}

export interface IBlogPagination {
    page: number;
    pageSize: number;
}

export interface IBlogSortOptions {
    sortBy: 'publishedAt' | 'views' | 'likes' | 'commentsCount';
    sortOrder: 'asc' | 'desc';
}

export interface IBlogSearchOptions {
    query: string;
    filters?: IBlogPostFilters;
    pagination?: IBlogPagination;
    sortOptions?: IBlogSortOptions;
}
export interface IBlogPostListResponse {
    posts: IBlogPost[];
    total: number;
    page: number;
    pageSize: number;
}
export interface IBlogPostStats {
    totalPosts: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
}
export interface IBlogAuthor {
    id: string;
    name: string;
    bio?: string;

    avatarUrl?: string;
    website?: string;

    socialLinks?: {
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        instagram?: string;
    };
}

export interface IBlogCategory {
    id: string;
    name: string;
    description?: string;
    slug: string;
    icon?: string;
}

export interface IBlogTag {
    id: string;
    name: string;
    slug: string;
    color?: string;
}
export interface IBlogComment {
    id: string;
    postId: string;

    parentId?: string; // optional threading

    authorName: string;
    authorEmail: string;

    content: string;

    createdAt: ISODate;
    isApproved: boolean;
}

export interface IBlogCommentCreate {
    postId: string;
    parentId?: string;

    authorName: string;
    authorEmail: string;
    content: string;
}

export interface IBlogCommentUpdate {
    content?: string;
    isApproved?: boolean;
}

export interface IBlogCommentListResponse {
    comments: IBlogComment[];
    total: number;
    page: number;
    pageSize: number;
}
export interface IBlogSettings {
    siteTitle: string;
    siteDescription: string;

    postsPerPage: number;

    allowComments: boolean;
    moderateComments: boolean;
}
export interface IBlogAnalytics {
    dailyViews: {
        date: ISODate;
        views: number;
    }[];

    topPosts: {
        postId: string;
        title: string;
        views: number;
    }[];

    topAuthors: {
        authorId: string;
        name: string;
        views: number;
    }[];
}
