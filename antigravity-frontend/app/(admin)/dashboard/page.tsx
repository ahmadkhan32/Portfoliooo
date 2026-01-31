"use client";

import FadeIn from "@/components/animations/FadeIn";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardPage() {
    const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // We'd ideally have a stats endpoint, but we can fetch counts roughly or just 0 for now
                // Let's assume we fetch all and count for MVP
                const [projects, blogs, messages] = await Promise.all([
                    api.get('/projects'),
                    api.get('/blogs'),
                    api.get('/messages') // Helper: needs admin token
                ]);
                setStats({
                    projects: projects.data.length,
                    blogs: blogs.data.length,
                    messages: messages.data.length
                });
            } catch (error) {
                console.error("Failed to fetch stats");
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <FadeIn>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn delay={0.1}>
                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
                        <p className="text-3xl font-bold mt-2">{stats.projects}</p>
                    </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Blogs</h3>
                        <p className="text-3xl font-bold mt-2">{stats.blogs}</p>
                    </div>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Messages</h3>
                        <p className="text-3xl font-bold mt-2">{stats.messages}</p>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
