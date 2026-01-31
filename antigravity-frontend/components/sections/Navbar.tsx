"use client";

import Link from 'next/link';
import { Button } from '../ui/Button';
import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl tracking-tighter">
                    Antigravity.
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">Dashboard</Button>
                            </Link>
                            <Button variant="destructive" size="sm" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <Link href="/login">
                            {/* Hidden login button for admin access usually, or just /login direct access */}
                            <Button variant="ghost" size="sm" className="hidden">Login</Button>
                        </Link>
                    )}
                    <Link href="/contact">
                        <Button size="sm">Let's Talk</Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
