"use client";
import React, { useEffect, useState } from 'react';
import { Gear, PhoneCall, CaretRight } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('sneha_token');

        if (!token) {
            router.push('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                } else {
                    localStorage.removeItem('sneha_token');
                    localStorage.removeItem('sneha_user');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('sneha_user');
        localStorage.removeItem('sneha_token');
        router.push('/');
    };

    if (!user) return null; // or loading spinner

    return (
        <div className="fade-in pt-6">
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-semibold shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 text-sm">Joined Dec 2025</p>
            </div>

            <div className="space-y-4 mb-8">
                <MenuItem icon={<Gear size={24} className="text-primary" />} label="Settings" />
                <MenuItem icon={<PhoneCall size={24} className="text-red-500" />} label="Emergency Contacts" className="text-red-500" />
            </div>

            <button
                onClick={handleLogout}
                className="w-full py-3 border border-red-400 text-red-500 rounded-2xl font-medium hover:bg-red-50 transition-colors"
            >
                Log Out
            </button>
        </div>
    );
}

function MenuItem({ icon, label, className = "text-gray-800" }: { icon: React.ReactNode, label: string, className?: string }) {
    return (
        <div className="glass-panel p-4 flex items-center gap-4 cursor-pointer hover:bg-white/80 transition-colors group">
            {icon}
            <span className={`font-medium ${className}`}>{label}</span>
            <CaretRight className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
    )
}
