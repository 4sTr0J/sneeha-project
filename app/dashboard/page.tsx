"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import {
    Bell,
    SquaresFour,
    VideoCamera,
    Sparkle,
    Headphones,
    UsersThree
} from '@phosphor-icons/react';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="min-h-screen pb-40">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <div>
                    <p className="text-primary/60 text-sm font-bold uppercase tracking-widest">Good Morning,</p>
                    <h1 className="text-4xl font-black text-primary tracking-tight">Friend</h1>
                </div>
                <div className="relative">
                    <button className="p-3 bg-white shadow-premium rounded-2xl text-primary transition-all hover:scale-105 active:scale-95">
                        <Bell size={28} weight="fill" />
                    </button>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-4 border-[#fbf7ff]"></span>
                </div>
            </header>

            {/* Mood Tracker */}
            <div className="glass-card p-6 rounded-[32px] mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                    <Sparkle weight="fill" className="text-accent" />
                    How are you feeling?
                </h3>
                <div className="flex justify-between items-center px-2">
                    <MoodBtn emoji="😢" />
                    <MoodBtn emoji="😐" />
                    <MoodBtn emoji="🙂" />
                    <MoodBtn emoji="😊" />
                    <MoodBtn emoji="🥰" />
                </div>
            </div>

            {/* Quick Actions */}
            <h3 className="font-bold text-primary-dark mb-6 px-2 flex items-center justify-between">
                Quick Access
                <Link href="#" className="text-xs font-bold text-primary-light">View All</Link>
            </h3>
            <div className="grid grid-cols-2 gap-5 mb-10">
                <QuickAction
                    href="/chat"
                    icon={<Sparkle weight="fill" />}
                    label="Sneha AI"
                    color="bg-primary"
                />
                <QuickAction
                    href="/wellness"
                    icon={<Headphones weight="fill" />}
                    label="Relax"
                    color="bg-purple-600"
                />
                <QuickAction
                    href="/community"
                    icon={<UsersThree weight="fill" />}
                    label="Groups"
                    color="bg-purple-700"
                />
                <QuickAction
                    href="/profile"
                    icon={<SquaresFour weight="fill" />}
                    label="Profile"
                    color="bg-purple-500"
                />
            </div>

            {/* Upcoming Meetups */}
            <h3 className="font-bold text-primary-dark mb-6 px-2">Upcoming Meetups</h3>
            <div className="glass-card p-5 rounded-[28px] flex items-center gap-5 hover:scale-[1.02] transition-all cursor-default">
                <div className="bg-primary text-white p-4 rounded-[20px] text-center min-w-[80px] shadow-lg">
                    <span className="block text-[10px] opacity-70 font-black uppercase tracking-widest mb-1">Jan</span>
                    <span className="font-black text-2xl">28</span>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-primary tracking-tight">Cancer Support Group</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <VideoCamera size={16} weight="fill" className="text-primary-light opacity-60" />
                        <p className="text-xs text-gray-500 font-bold">2:00 PM • Video Call</p>
                    </div>
                </div>
                <button className="bg-primary text-white text-[10px] px-5 py-2.5 rounded-full font-black uppercase tracking-widest shadow-lg hover:bg-primary-dark transition-colors">
                    Join
                </button>
            </div>
        </div>
    );
}

function MoodBtn({ emoji }: { emoji: string }) {
    const [selected, setSelected] = useState(false);
    return (
        <button
            onClick={() => setSelected(!selected)}
            className={`text-4xl transition-all duration-300 transform ${selected ? 'scale-150 drop-shadow-xl p-2 bg-white rounded-2xl' : 'hover:scale-125 opacity-60 hover:opacity-100'}`}
        >
            {emoji}
        </button>
    );
}

function QuickAction({ icon, label, color, href }: { icon: React.ReactNode, label: string, color: string, href: string }) {
    return (
        <Link href={href} className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white transition-all overflow-hidden relative">
            <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg ${color} text-white`}>
                {icon}
            </div>
            <span className="font-bold text-primary-dark text-sm tracking-tight">{label}</span>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 group-hover:scale-[3] transition-transform duration-700"></div>
        </Link>
    );
}
