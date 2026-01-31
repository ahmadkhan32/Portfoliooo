import { Project } from "@/types";
import { Button } from "../ui/Button";
import Link from "next/link";
import FadeIn from "../animations/FadeIn";

interface ProjectsProps {
    projects: Project[];
}

const ProjectsSection: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <section className="py-20 container px-4">
            <FadeIn>
                <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Featured Projects</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <FadeIn key={project._id} delay={index * 0.1}>
                        <div className="group rounded-xl border bg-card text-card-foreground shadow overflow-hidden h-full flex flex-col">
                            {/* Valid image URL check or placeholder */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image || "https://placehold.co/600x400"}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-auto">
                                    {project.liveUrl && (
                                        <Link href={project.liveUrl} target="_blank" className="flex-1">
                                            <Button variant="default" className="w-full">Live Demo</Button>
                                        </Link>
                                    )}
                                    {project.sourceUrl && (
                                        <Link href={project.sourceUrl} target="_blank" className="flex-1">
                                            <Button variant="outline" className="w-full">Code</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center text-muted-foreground">
                    No projects found.
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;
