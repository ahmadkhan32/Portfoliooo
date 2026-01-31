import ProjectsSection from "@/components/sections/Projects";

async function getProjects() {
    // In production, use the actual full URL. For dev, we might need to handle localhost carefully if SSR.
    // Ensure NEXT_PUBLIC_API_URL or API_URL is set for SSR.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
        const res = await fetch(`${apiUrl}/projects`, { cache: 'no-store' });
        if (!res.ok) {
            // Handle error or return empty
            console.error("Failed to fetch projects");
            return [];
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen pt-20">
            <ProjectsSection projects={projects} />
        </div>
    );
}
