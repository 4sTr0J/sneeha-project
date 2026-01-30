"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkle, Heart, ShieldCheck } from '@phosphor-icons/react';

export default function Home() {
    return (
        <div className="pt-20 pb-32 flex flex-col items-center">
            {/* Hero Section */}
            <div className="relative mb-12 text-center group">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
                <div className="relative z-10">
                    <Image
                        src="/images/mascot.png"
                        alt="Mascot"
                        width={180}
                        height={180}
                        className="mx-auto mb-8 animate-pulse-slow drop-shadow-2xl"
                    />
                    <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary-light to-accent mb-4">
                        Welcome to Sneha
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-sm mx-auto leading-relaxed mb-10 opacity-80">
                        Your digital safe space for emotional support, community, and wellness.
                    </p>

                    <Link href="/login" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-light text-white px-10 py-5 rounded-[24px] font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all group/btn">
                        Get Started
                        <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Feature Grids */}
            <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
                <LandingFeature
                    icon={<Sparkle weight="fill" />}
                    title="AI Healing Companion"
                    desc="Talk to Sneha AI for support anytime, anywhere."
                />
                <LandingFeature
                    icon={<Heart weight="fill" />}
                    title="Curated Wellness"
                    desc="Meditation and music tailored for your recovery."
                />
            </div>
        </div>
    );
}

function LandingFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="glass-card flex items-center gap-5 p-6 rounded-[28px] hover:scale-[1.02] transition-all cursor-default">
            <div className="p-4 bg-purple-100 text-primary rounded-2xl">
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-primary-dark">{title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
