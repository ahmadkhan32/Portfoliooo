"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { Blog } from "@/types";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        try {
            const res = await api.get('/blogs/all'); // Admin route
            setBlogs(res.data);
        } catch (error) {
            console.error("Failed to fetch blogs");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/blogs/${id}`);
            setBlogs(blogs.filter(b => b._id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Blogs</h1>
                <Button>+ Write Article</Button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="border-t hover:bg-muted/10 transition-colors">
                                <td className="p-4 font-medium">{blog.title}</td>
                                <td className="p-4">
                                    <span className={blog.published ? "text-green-500" : "text-yellow-500"}>
                                        {blog.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(blog._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
