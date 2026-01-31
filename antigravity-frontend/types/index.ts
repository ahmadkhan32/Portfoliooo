export interface Project {
    _id: string;
    title: string;
    description: string;
    content?: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    sourceUrl?: string;
    featured: boolean;
    createdAt: string;
}

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    image?: string;
    tags: string[];
    published: boolean;
    createdAt: string;
    author: string | { name: string };
}

export interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}
