export type IBlogAuthor = {
  id: string;
  name: string;
  slug: string;
  avatarUrl?: string;
  avatar?: string;
  bio?: string;
};

export type IBlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type IBlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt?: any;
  coverImage: string;
  publishedAt?: string;
  readingTime?: number;
  authorId: string;
  author: IBlogAuthor;
  category?: string;
  categoryIds: string[];
  date: string;
  views: number;
};

export type IBlogPost = IBlogPostSummary & {
  categories: IBlogCategory[];
};
