"use client";

import React from 'react';
import FadeIn from '../animations/FadeIn';
import { Button } from '../ui/Button';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 pt-20">
            <div className="container px-4 text-center">
                <FadeIn delay={0.1}>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Antigravity
                        <span className="text-primary block text-2xl md:text-4xl mt-2 font-normal">
                            Defying Limits. Building Future.
                        </span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Advanced MERN Stack Developer Portfolio demonstrating production-ready architecture, modern UI, and scalable backend solutions.
                    </p>
                </FadeIn>

                <FadeIn delay={0.5} className="flex gap-4 justify-center">
                    <Link href="/projects">
                        <Button size="lg" className="rounded-full">View Projects</Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" size="lg" className="rounded-full">Contact Me</Button>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
};

export default Hero;
