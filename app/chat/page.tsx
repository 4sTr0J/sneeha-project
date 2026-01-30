"use client";
import Image from 'next/image';
import {
    CaretLeft,
    ChatTeardropDots,
    Microphone,
    Keyboard,
    SpeakerHigh,
    Globe
} from '@phosphor-icons/react';

export default function AIChatPage() {
    return (
        <div className="min-h-screen pb-32 flex flex-col items-center bg-gradient-to-b from-[#fbf7ff] to-[#f3e8ff]">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-8">
                <button className="p-3 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all">
                    <CaretLeft size={24} className="text-primary-dark" />
                </button>
                <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-white shadow-lg">
                    <SpeakerHigh size={18} weight="fill" />
                    <span className="text-xs font-bold uppercase tracking-widest">Voice Chat</span>
                </div>
                <button className="p-3 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all">
                    <ChatTeardropDots size={24} className="text-primary-dark" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-black text-primary mb-12 leading-tight">
                    What Can I Do For <br /> You Today ?
                </h1>

                {/* Holographic Sphere */}
                <div className="relative w-80 h-80 mb-12">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                    <Image
                        src="/images/ai_sphere.png"
                        alt="AI Sphere"
                        fill
                        className="object-contain animate-spin-slow"
                    />
                </div>

                <div className="flex items-center gap-2 text-primary/60 mb-4 opacity-80">
                    <Keyboard size={20} />
                    <span className="text-sm font-medium">Use Keyboard</span>
                </div>

                <p className="text-xl font-bold text-primary-light max-w-xs leading-relaxed">
                    I can search for New Contacts <br />
                    <span className="opacity-60 font-medium">Welcome to the future of Medicine...</span>
                </p>
            </div>

            {/* Controls */}
            <div className="w-full flex justify-between items-center mt-8 px-2">
                <button className="p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all">
                    <SpeakerHigh size={24} weight="fill" />
                </button>

                <div className="relative">
                    <div className="absolute inset-x-0 -top-1 -bottom-1 bg-primary/20 blur-xl rounded-full"></div>
                    <button className="relative p-8 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all outline outline-8 outline-primary/10">
                        <Microphone size={32} weight="fill" />
                    </button>
                </div>

                <button className="p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all">
                    <Globe size={24} weight="fill" />
                </button>
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </div>
    );
}
