import FadeIn from "@/components/animations/FadeIn";
import SkillsSection from "@/components/sections/Skills";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="container px-4 py-20">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight mb-6">About Me</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I am a passionate Full Stack Developer with expertise in the MERN stack.
                            My journey in software development is driven by a desire to build scalable,
                            high-performance applications that solve real-world problems.
                            With a strong foundation in both frontend and backend technologies,
                            I create seamless digital experiences that are not only functional but also visually stunning.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
                        {/* Placeholder image */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            Profile Image
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold">My Journey</h2>
                        <p className="text-muted-foreground">
                            Starting with HTML & CSS, I quickly dived into JavaScript and the modern web ecosystem.
                            I have built numerous projects ranging from simple landing pages to complex SaaS platforms.
                        </p>
                        <p className="text-muted-foreground">
                            I specialize in Next.js for its performance and SEO benefits, combined with the flexibility of Node.js and MongoDB on the backend.
                        </p>
                    </div>
                </div>

                <SkillsSection />
            </div>
        </div>
    );
}
