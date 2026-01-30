"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('sneha_token', data.token);
                localStorage.setItem('sneha_user', JSON.stringify(data));
                router.push('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong');
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-[#4c1d95] flex flex-col items-center justify-center p-6 text-white overflow-hidden relative font-outfit">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none"></div>

            {/* Mascot Container */}
            <div className="mb-8 relative w-48 h-48 animate-pulse-slow">
                <Image
                    src="/images/mascot.png"
                    alt="Sneha Mascot"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            <div className="w-full max-w-md space-y-8 text-center z-10">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome Back !</h1>
                    <p className="text-white/70 text-sm font-medium">
                        " A Supportive Digital Community <br /> Empowering Healing And Growth... "
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <p className="text-red-500 text-center text-sm font-bold bg-white/10 p-3 rounded-2xl border border-red-500/20">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all"
                    />

                    <button type="submit" className="w-full bg-white text-primary font-black py-4 rounded-full transition-all mt-4 shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-widest text-sm">
                        Sign In
                    </button>
                </form>

                <div className="mt-8">
                    <p className="text-white/60 text-sm font-medium">
                        Don't have an account? <Link href="/register" className="text-white font-black hover:underline underline-offset-4">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

