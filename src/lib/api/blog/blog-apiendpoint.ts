export interface IBlogApiEndpoint {
    getPosts: string;
    getPostById: (id: string) => string;
    createPost: string;
    updatePost: (id: string) => string;
    deletePost: (id: string) => string;

    getAuthors: string;
    getCategories: string;
    getTags: string;

    getComments: string;
    createComment: string;
    updateComment: (id: string) => string;
    deleteComment: (id: string) => string;

    getSettings: string;
    updateSettings: string;

    getAnalytics: string;

    uploadImage: string;
}

export const BLOG_API_ENDPOINTS: IBlogApiEndpoint = {
    getPosts: '/api/blog/posts',
    getPostById: id => `/api/blog/posts/${id}`,
    createPost: '/api/blog/posts',
    updatePost: id => `/api/blog/posts/${id}`,
    deletePost: id => `/api/blog/posts/${id}`,

    getAuthors: '/api/blog/authors',
    getCategories: '/api/blog/categories',
    getTags: '/api/blog/tags',

    getComments: '/api/blog/comments',
    createComment: '/api/blog/comments',
    updateComment: id => `/api/blog/comments/${id}`,
    deleteComment: id => `/api/blog/comments/${id}`,

    getSettings: '/api/blog/settings',
    updateSettings: '/api/blog/settings',

    getAnalytics: '/api/blog/analytics',

    uploadImage: '/api/blog/upload'
};
