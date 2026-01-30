"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Envelope, Lock, CaretLeft } from '@phosphor-icons/react';

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [supportType, setSupportType] = useState('Cancer Support');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, supportType }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('sneha_token', data.token);
                localStorage.setItem('sneha_user', JSON.stringify(data));
                router.push('/dashboard');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong');
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-[#fbf7ff] flex flex-col p-6 font-outfit">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <Link href="/login" className="p-3 bg-white shadow-premium rounded-2xl text-primary transition-all hover:scale-105">
                    <CaretLeft size={24} weight="bold" />
                </Link>
                <h1 className="text-2xl font-black text-primary tracking-tight">Create Account</h1>
            </div>

            <div className="glass-card p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-primary mb-2 tracking-tight">Join Sneha</h2>
                    <p className="text-sm text-gray-500 font-bold">Your journey to healing starts here.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    {error && <p className="text-red-500 text-center text-sm font-bold bg-red-100 p-3 rounded-2xl border border-red-500/20">{error}</p>}

                    <div className="space-y-2">
                        <label className="text-xs font-black text-primary/40 uppercase tracking-widest ml-4">Full Name</label>
                        <div className="relative">
                            <User size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" />
                            <input
                                type="text"
                                placeholder="Preferred Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-purple-50 border-none rounded-full px-14 py-4 text-primary font-bold placeholder:text-primary/20 focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-primary/40 uppercase tracking-widest ml-4">Email Address</label>
                        <div className="relative">
                            <Envelope size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" />
                            <input
                                type="email"
                                placeholder="email@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-purple-50 border-none rounded-full px-14 py-4 text-primary font-bold placeholder:text-primary/20 focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-primary/40 uppercase tracking-widest ml-4">Password</label>
                        <div className="relative">
                            <Lock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-purple-50 border-none rounded-full px-14 py-4 text-primary font-bold placeholder:text-primary/20 focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-primary/40 uppercase tracking-widest ml-4">I am here for...</label>
                        <select
                            className="w-full bg-purple-50 border-none rounded-full px-6 py-4 text-primary font-bold focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                            value={supportType}
                            onChange={(e) => setSupportType(e.target.value)}
                        >
                            <option>Cancer Support</option>
                            <option>Chronic Illness</option>
                            <option>Caregiver Support</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white font-black py-5 rounded-full shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm mt-4">
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-10 text-sm font-bold text-gray-400">
                    Already a member? <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

