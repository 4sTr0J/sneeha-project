"use client";
import {
    Play,
    Heart,
    DotsThreeVertical,
    Repeat,
    Shuffle,
    Bell,
    SquaresFour
} from '@phosphor-icons/react';
import Image from 'next/image';

const musicList = [
    { title: "Weightless", author: "Ambient, Soft Instrumental", duration: "8.20 min", image: "/images/meditation_bg.png" },
    { title: "Watermark-Enya", author: "Soft Vocals + Ambient Sounds", duration: "8 min", image: "/images/meditation_bg.png" },
    { title: "Strawberry Swing", author: "Chill Pop, Feel-Good", duration: "10 min", image: "/images/meditation_bg.png" },
    { title: "Electra- Air stream", author: "Chill-out, Ambient Electronic", duration: "15 min", image: "/images/meditation_bg.png" },
    { title: "Mellomaniac", author: "Chill-out, Ambient Beats", duration: "11 min", image: "/images/meditation_bg.png" },
];

export default function WellnessPage() {
    return (
        <div className="min-h-screen pb-32">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <button className="p-2 text-primary"><SquaresFour size={28} weight="bold" /></button>
                <h1 className="text-2xl font-black text-primary tracking-tight">Relaxation Music</h1>
                <button className="relative p-2 text-primary">
                    <Bell size={28} weight="fill" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>

            <div className="text-center mb-8">
                <p className="text-primary-light font-bold text-sm">Choose Your Music..</p>
            </div>

            {/* Music List */}
            <div className="space-y-4 mb-12">
                {musicList.map((track, i) => (
                    <div key={i} className="glass-card flex items-center gap-4 p-3 rounded-2xl hover:bg-white transition-all cursor-pointer group">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md">
                            <Image src={track.image} alt={track.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-primary mb-1">{track.title}</h4>
                            <p className="text-[10px] text-gray-500 font-medium mb-3">({track.author})</p>
                            <span className="px-5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full">{track.duration}</span>
                        </div>
                        <button className="p-2 text-primary/40 group-hover:text-primary transition-colors">
                            <DotsThreeVertical size={24} weight="bold" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Floating Player Preview (Optional UI matching reference image 3) */}
            <div className="relative rounded-[40px] overflow-hidden aspect-[9/16] shadow-2xl mb-8 group overflow-hidden">
                <Image src="/images/meditation_bg.png" alt="Meditation" fill className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-10 left-0 right-0 p-8 text-center">
                    <h2 className="text-3xl font-black text-white mb-2">Morning Meditation</h2>
                    <p className="text-white/70 text-sm mb-12 font-medium">(Start your day with positive energy)</p>

                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[40px] shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] text-white/50 font-bold">0:24</span>
                            <div className="flex-1 h-1 mx-4 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                            </div>
                            <span className="text-[10px] text-white/50 font-bold">-3:24</span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <button className="p-2 text-white/60"><Heart size={20} /></button>
                            <button className="p-2 text-white/60"><Repeat size={20} /></button>
                            <button className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all">
                                <Play size={40} weight="fill" />
                            </button>
                            <button className="p-2 text-white/60"><Shuffle size={20} /></button>
                            <button className="p-2 text-white/60"><DotsThreeVertical size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
