"use client";
import { useState } from 'react';
import Image from 'next/image';
import {
    Bell,
    Leaf,
    SpeakerHigh,
    Translate,
    CaretLeft,
    LockKey,
    DeviceMobile
} from '@phosphor-icons/react';
import { clsx } from 'clsx';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'privacy' | 'app'>('app');

    return (
        <div className="min-h-screen pb-32">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button className="p-2 hover:bg-purple-100 rounded-full transition-colors">
                    <CaretLeft size={24} className="text-primary" />
                </button>
                <h1 className="text-2xl font-bold text-primary">Settings</h1>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8 p-2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-light">
                    <Image
                        src="/images/mascot.png" // Placeholder or avatar
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-primary">Saneth Rasanjana</h2>
                    <span className="text-sm text-gray-500">Patient</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-purple-50 rounded-2xl mb-8">
                <button
                    onClick={() => setActiveTab('privacy')}
                    className={clsx(
                        "flex-1 py-3 text-sm font-semibold rounded-xl transition-all",
                        activeTab === 'privacy' ? "bg-white text-primary shadow-sm" : "text-gray-400"
                    )}
                >
                    Privacy & Security
                </button>
                <button
                    onClick={() => setActiveTab('app')}
                    className={clsx(
                        "flex-1 py-3 text-sm font-semibold rounded-xl transition-all",
                        activeTab === 'app' ? "bg-primary text-white shadow-lg" : "text-gray-400"
                    )}
                >
                    App Settings
                </button>
            </div>

            {/* Settings List */}
            <div className="space-y-6">
                {activeTab === 'app' ? (
                    <>
                        <SectionTitle title="Notifications" />
                        <SettingsItem
                            icon={<Bell weight="fill" />}
                            title="General Notifications"
                            desc="Allow the app to send general updates"
                        />
                        <SettingsItem
                            icon={<Leaf weight="fill" />}
                            title="Daily Wellness Notifications"
                            desc="Receive reminders for mood check-ins"
                        />

                        <SectionTitle title="Sound & Haptic" />
                        <SettingsItem
                            icon={<SpeakerHigh weight="fill" />}
                            title="App Sounds and Haptics"
                            desc="Allow the user to customize app sounds"
                        />

                        <SectionTitle title="Preferences" />
                        <SettingsItem
                            icon={<Translate weight="fill" />}
                            title="Language Preference"
                            desc="Select the language used throughout the application interface."
                        />
                    </>
                ) : (
                    <>
                        <SectionTitle title="Security" />
                        <SettingsItem
                            icon={<LockKey weight="fill" />}
                            title="Encrypted Communication"
                            desc="Ensure all data transmission is secure"
                        />
                        <SettingsItem
                            icon={<DeviceMobile weight="fill" />}
                            title="Two-Factor Authentication"
                            desc="Add an extra layer of security to your account"
                        />
                    </>
                )}
            </div>

            {/* Mascot Footer */}
            <div className="mt-12 flex justify-center">
                <div className="relative w-48 h-48 animate-pulse-slow">
                    <Image
                        src="/images/mascot.png"
                        alt="Mascot"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ title }: { title: string }) {
    return <h3 className="text-lg font-bold text-primary mb-2 mt-4 px-2">{title}</h3>;
}

function SettingsItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4 p-4 hover:bg-white rounded-2xl transition-all group cursor-pointer">
            <div className="p-3 bg-purple-100 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-primary-dark">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[240px]">{desc}</p>
            </div>
        </div>
    );
}
