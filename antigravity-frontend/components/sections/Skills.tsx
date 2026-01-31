"use client";

import FadeIn from "../animations/FadeIn";

const skillsData = [
    { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux/Zustand"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"] },
    { category: "DevOps", items: ["Docker", "AWS", "Vercel", "CI/CD", "Nginx"] },
    { category: "Tools", items: ["Git", "Figma", "Postman", "VS Code", "Jira"] },
];

const SkillsSection = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 text-center">
                <FadeIn>
                    <h2 className="text-4xl font-bold tracking-tight mb-12">Technical Arsenal</h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsData.map((skillSet, index) => (
                        <FadeIn key={skillSet.category} delay={index * 0.1}>
                            <div className="p-6 bg-card rounded-xl border shadow-sm h-full">
                                <h3 className="text-xl font-semibold mb-4 text-primary">{skillSet.category}</h3>
                                <ul className="space-y-2">
                                    {skillSet.items.map(item => (
                                        <li key={item} className="text-muted-foreground hover:text-foreground transition-colors">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
