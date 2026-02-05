import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Brain, Users, Activity, Heart, Search, Calendar, Bell, Moon, Sun } from 'lucide-react';
import doctorMascot from '../assets/doctor_mascot.png';

export default function Dashboard() {
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in">
            {/* Top Stat Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)' }}>
                        How are you feeling, {user?.name?.split(' ')[0]}?
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Let's continue your journey to healing today.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '15px', top: '12px', color: '#9CA3AF' }} />
                        <input className="input" placeholder="Search resources..." style={{ width: '300px', paddingLeft: '45px', marginBottom: 0 }} />
                    </div>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'white',
                            border: '1px solid #E9D5FF',
                            borderRadius: '12px',
                            width: '46px',
                            height: '46px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--primary)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                    >
                        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                    <div className="hover-scale" style={{
                        background: 'white',
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #E9D5FF',
                        color: 'var(--bg-darker)',
                        position: 'relative',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <Bell size={22} />
                        <span style={{ position: 'absolute', top: '10px', right: '12px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
                    </div>
                </div>
            </div>

            {/* Welcome Banner Desktop */}
            <div className="welcome-banner-desktop">
                <div style={{ maxWidth: '600px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 15px', borderRadius: '20px', display: 'inline-block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px' }}>
                        NEW CONTENT AVAILABLE
                    </div>
                    <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '15px' }}>Welcome back to Sneha!</h2>
                    <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: '1.5', marginBottom: '30px' }}>
                        We've added new guided meditations and support groups tailored for your
                        <span style={{ fontWeight: '800' }}> {user?.supportType || 'wellness'}</span>.
                        Explore them now to stay resilient.
                    </p>
                    <button onClick={() => navigate('/wellness')} className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: '800', padding: '15px 35px' }}>
                        Explore Wellness
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <div style={{ width: '250px', height: '250px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                    <img src={doctorMascot} alt="Supportive AI" style={{ width: '320px', height: '320px', objectFit: 'contain', position: 'relative', zIndex: 1 }} />
                </div>
            </div>

            {/* Content Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                <div>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '25px', color: 'var(--bg-darker)' }}>Recommended for You</h3>
                    <div className="pref-grid-desktop">
                        <PreferenceCard
                            title="Mind Relaxation"
                            icon={<Brain size={35} />}
                            desc="Guided meditations for stress relief"
                            color="#8B5CF6"
                            onClick={() => navigate('/wellness')}
                        />
                        <PreferenceCard
                            title="Community Support"
                            icon={<Users size={35} />}
                            desc="Join groups with similar journeys"
                            color="#EC4899"
                            onClick={() => navigate('/community')}
                        />
                        <PreferenceCard
                            title="Mood Tracker"
                            icon={<Activity size={35} />}
                            desc="Visualize your emotional progress"
                            color="#3B82F6"
                            onClick={() => { }}
                        />
                        <PreferenceCard
                            title="Healing Music"
                            icon={<Heart size={35} />}
                            desc="Frequency based sounds for peace"
                            color="#10B981"
                            onClick={() => navigate('/wellness')}
                        />
                    </div>
                </div>

                {/* Sidebar Widget (Desktop Only) */}
                <div>
                    <div className="glass-card" style={{ marginBottom: '30px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={20} color="var(--primary)" />
                            Upcoming Events
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <EventItem time="4:00 PM" label="Meditation Session" />
                            <EventItem time="Tomorrow" label="Cancer Survivor Meet" />
                        </div>
                    </div>

                    <div className="glass-card" style={{ background: 'white', border: '1px solid #E9D5FF', color: 'var(--text-main)' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px' }}>Daily Reminder</h4>
                        <p style={{ color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic' }}>
                            "Your illness doesn't define you. Your strength and resilience do. Take a deep breath."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PreferenceCard({ title, icon, desc, color, onClick }) {
    return (
        <div className="desktop-card" onClick={onClick}>
            <div style={{
                width: '60px',
                height: '60px',
                background: `${color}15`,
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                margin: '0 auto 20px'
            }}>
                {icon}
            </div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{title}</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{desc}</p>
        </div>
    );
}

function EventItem({ time, label }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--primary)' }}>{time}</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
        </div>
    );
}
