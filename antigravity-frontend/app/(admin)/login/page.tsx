"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const login = useAuthStore((state) => state.login);
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post('/auth/login', data);
            login(res.data);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20">
            <FadeIn>
                <div className="bg-card w-full max-w-md p-8 rounded-xl border shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>

                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" {...register("email", { required: true })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input type="password" {...register("password", { required: true })} />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </div>
            </FadeIn>
        </div>
    );
};

export default LoginPage;
