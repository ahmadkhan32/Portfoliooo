"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import FadeIn from "@/components/animations/FadeIn";
import { Project } from "@/types";

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (error) {
            console.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    // Placeholder for create/update functionality - in a real app would use a Modal or separate page
    const handleCreate = () => {
        alert("Create Project feature would open a Modal here.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Button onClick={handleCreate}>+ Add Project</Button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Description</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id} className="border-t hover:bg-muted/10 transition-colors">
                                <td className="p-4 font-medium">{project.title}</td>
                                <td className="p-4 max-w-md truncate">{project.description}</td>
                                <td className="p-4 text-right gap-2">
                                    <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && !isLoading && (
                            <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No projects found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
