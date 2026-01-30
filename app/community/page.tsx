"use client";
import React, { useState } from 'react';
import { ArrowLeft, PaperPlaneRight } from '@phosphor-icons/react';
import Link from 'next/link';

export default function Community() {
    const [activeChat, setActiveChat] = useState<string | null>(null);

    if (activeChat) {
        return <ChatView onBack={() => setActiveChat(null)} title={activeChat} />;
    }

    return (
        <div className="fade-in pb-24">
            <h2 className="text-2xl font-bold text-primary mb-6">Community Groups</h2>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                <FilterChip label="All" active />
                <FilterChip label="Cancer" />
                <FilterChip label="Chronic" />
                <FilterChip label="Family" />
            </div>

            <div className="grid gap-4">
                <ChatItem
                    name="General Support"
                    time="12:30 PM"
                    preview="Dr. Perera: Remember to take deep breaths..."
                    avatar="https://ui-avatars.com/api/?name=Support+Group&background=0F4C5C&color=fff"
                    onClick={() => setActiveChat("General Support")}
                />
                <ChatItem
                    name="Morning Meditation"
                    time="Yesterday"
                    preview="Sarah: This really helped me start my day."
                    avatar="https://ui-avatars.com/api/?name=Meditation&background=E36414&color=fff"
                    onClick={() => setActiveChat("Morning Meditation")}
                />
            </div>
        </div>
    );
}

function ChatView({ onBack, title }: { onBack: () => void, title: string }) {
    return (
        <div className="fade-in flex flex-col h-[calc(100vh-140px)]">
            <div className="flex items-center gap-3 mb-4">
                <button onClick={onBack} className="text-2xl text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft />
                </button>
                <h3 className="font-bold text-xl text-primary">{title}</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                <div className="self-start bg-white/80 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[85%] shadow-sm border border-white">
                    <p className="text-sm text-gray-800">Has anyone tried the new meditation track?</p>
                    <span className="text-[10px] text-gray-400 block mt-1">Kamal • 10:00 AM</span>
                </div>
                <div className="self-end ml-auto bg-primary text-white p-3 rounded-tl-xl rounded-br-xl rounded-bl-xl max-w-[85%] shadow-md">
                    <p className="text-sm">Yes! It's very calming.</p>
                    <span className="text-[10px] text-primary-light block mt-1 text-right">You • 10:02 AM</span>
                </div>
            </div>

            <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[440px] glass-panel !p-2 flex gap-2 items-center z-40">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 !mb-0 !p-2 text-sm"
                />
                <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary-light transition-colors">
                    <PaperPlaneRight size={20} weight="fill" />
                </button>
            </div>
        </div>
    );
}

function FilterChip({ label, active = false }: { label: string, active?: boolean }) {
    return (
        <button className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${active ? 'bg-primary text-white shadow-md' : 'bg-white/50 text-gray-600 hover:bg-white'}`}>
            {label}
        </button>
    )
}

function ChatItem({ name, time, preview, avatar, onClick }: { name: string, time: string, preview: string, avatar: string, onClick: () => void }) {
    return (
        <div onClick={onClick} className="glass-panel p-4 flex gap-4 items-start cursor-pointer hover:bg-white/80 transition-colors active:scale-[0.98] transform duration-100">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
            <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-gray-800">{name}</h4>
                    <span className="text-xs text-gray-400">{time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{preview}</p>
            </div>
        </div>
    )
}

