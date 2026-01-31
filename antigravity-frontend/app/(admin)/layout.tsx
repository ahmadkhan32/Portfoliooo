"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Determine if we are on the login page; if so, don't redirect
        if (pathname === '/login') return;

        // Check authentication
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [isAuthenticated, router, pathname]);

    if (pathname === '/login') {
        return <>{children}</>;
    }

    if (!user) return null; // or loading spinner

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Projects", href: "/dashboard/projects" }, // Changed from /projects to Avoid conflict or use clear admin path. wait, structure said (admin)/projects
        // let's stick to structure: (admin)/projects/page.tsx maps to /projects if not careful, but route groups don't add path.
        // Wait, (admin) is a route group. So /projects would be at root if not nested.
        // But (public) also has /projects. This is a CONFLICT.
        // Next.js App Router: if (public)/projects and (admin)/projects both exist, they map to /projects.
        // You CANNOT have two folders mapping to the same URL segment.
        // The structure provided by user:
        // app/(public)/projects/page.tsx -> /projects
        // app/(admin)/projects/page.tsx -> /projects (CONFLICT)

        // I must assume the user meant /admin/projects or similar.
        // OR, the file structure in the prompt is illustrative and one should be nested.
        // Usually admin is under /admin/projects.
        // The structure shows (admin) as a group.
        // I should probably rename the folders in (admin) to be prefixed or move them into an (admin)/admin folder?
        // Or just assume (admin) group has a root layout that might use data, but path collision is real.

        // Let's look at the structure again.
        // (admin)/dashboard -> /dashboard
        // (admin)/projects -> /projects -- COLLISION with (public)/projects

        // I will move (admin)/projects to (admin)/admin/projects to make the path /admin/projects.
        // Or simply naming the folder "admin-projects" in the group? No, that makes path /admin-projects.
        // I'll assume standard practice: /admin/projects. Use `admin` folder inside (admin) group?
        // or just rename the folder `projects` inside `(admin)` to `admin`.
        // The prompt structure:
        // (admin)/projects/page.tsx

        // I will presume I should change the route to avoid conflict.
        // I will use `/admin/projects` (so folder `app/(admin)/admin/projects`? Or `app/admin/projects`?)
        // User structure:
        // app/(admin)/projects

        // I will put them under `app/admin/projects` instead of `app/(admin)/projects`.
        // Wait, I created `app/(admin)/projects`. I should delete it or rename it.
        // I'll rename `app/(admin)` contents.

        // Actually, I can just create `app/admin/projects` and `app/admin/blogs` and `app/admin/dashboard`.
        // The `(admin)` group is useful for layout.
        // So I will make the structure:
        // app/(admin)/admin/dashboard
        // app/(admin)/admin/projects
        // etc.
        // This results in /admin/... URL.
    ];

    // Correction: I'll use /admin prefix.
    // I will move the files later or just use the Correct paths in links for now.
    // I'll create `app/(admin)/admin-dashboard`? No that's ugly.

    // I'll implement the Layout assuming the files ARE at /admin/...
    // So I will Create `app/(admin)/admin/...`

    // Let's just use /dashboard for dashboard (no conflict usually), but /projects is definitely conflict.
    // I will assume the admin project management is at `/admin/projects`.

    return (
        <div className="min-h-screen flex bg-muted/20">
            <aside className="w-64 bg-card border-r hidden md:block">
                <div className="p-6">
                    <h1 className="text-xl font-bold">Antigravity Admin</h1>
                </div>
                <nav className="px-4 space-y-2">
                    {[
                        { name: "Dashboard", href: "/dashboard" },
                        { name: "Projects", href: "/admin/projects" },
                        { name: "Blogs", href: "/admin/blogs" },
                        { name: "Messages", href: "/admin/messages" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "block px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mt-8"
                    >
                        Logout
                    </button>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
