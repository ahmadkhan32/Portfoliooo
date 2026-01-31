"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await api.get('/messages');
                setMessages(res.data);
            } catch (error) {
                console.error("Failed to fetch messages");
            }
        };
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/messages/${id}`);
            setMessages(messages.filter(m => m._id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Messages</h1>

            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg._id} className="bg-card p-6 rounded-xl border shadow-sm">
                        <div className="flex justify-between mb-2">
                            <div>
                                <h3 className="font-semibold">{msg.subject || "No Subject"}</h3>
                                <p className="text-sm text-muted-foreground">{msg.name} ({msg.email})</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm mb-4">{msg.message}</p>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(msg._id)}>Delete</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
