import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { Blog } from "@/types";

// Helper to remove HTML tags for preview
const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
};

async function getBlogs() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
        const res = await fetch(`${apiUrl}/blogs`, { cache: 'no-store' }); // or next: { revalidate: 60 }
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function BlogsPage() {
    const blogs: Blog[] = await getBlogs();

    return (
        <div className="min-h-screen pt-20 pb-20 container px-4">
            <FadeIn>
                <h1 className="text-4xl font-bold tracking-tight mb-12 text-center">Engineering Thoughts</h1>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {blogs.map((blog, index) => (
                    <FadeIn key={blog._id} delay={index * 0.1}>
                        <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-card">
                            <Link href={`/blogs/${blog.slug}`}>
                                <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">{blog.title}</h2>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-4">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-muted-foreground line-clamp-3 mb-4">
                                {stripHtml(blog.content)}
                            </p>
                            <div className="flex gap-2">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {blogs.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                    No articles published yet.
                </div>
            )}
        </div>
    );
}
