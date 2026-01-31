"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import FadeIn from "../animations/FadeIn";
import api from "@/lib/api";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await api.post('/messages', data);
            setSuccess(true);
            reset();
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="py-20 container px-4 max-w-2xl mx-auto">
            <FadeIn>
                <h2 className="text-4xl font-bold tracking-tight text-center mb-8">Get In Touch</h2>
            </FadeIn>

            <FadeIn delay={0.2}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-xl border shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input id="name" {...register("name")} placeholder="Your name" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" {...register("email")} placeholder="your@email.com" />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                        <Input id="subject" {...register("subject")} placeholder="Project Inquiry" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                        <textarea
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("message")}
                            placeholder="Tell me about your project..."
                        />
                        {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    {success && (
                        <p className="text-green-500 text-center text-sm mt-4">Message sent successfully!</p>
                    )}
                </form>
            </FadeIn>
        </section>
    );
};

export default ContactSection;
