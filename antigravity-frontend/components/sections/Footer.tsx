import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t bg-muted/20 py-12">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Antigravity</h2>
                    <p className="text-muted-foreground">Building the future, one line of code at a time.</p>
                </div>
                <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
                    <Link href="/projects" className="hover:text-foreground">Projects</Link>
                    <Link href="/blogs" className="hover:text-foreground">Blogs</Link>
                    <Link href="/about" className="hover:text-foreground">About</Link>
                    <Link href="/contact" className="hover:text-foreground">Contact</Link>
                </div>
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Antigravity Portfolio. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
