import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Smile,
    Frown,
    Meh,
    CloudLightning,
    Sun,
    Plus,
    Calendar,
    ChevronLeft,
    Brain,
    Activity,
    Users
} from 'lucide-react';

const MOODS = [
    { id: 'happy', label: 'Happy', icon: <Smile size={32} />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
    { id: 'calm', label: 'Calm', icon: <Sun size={32} />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    { id: 'neutral', label: 'Meh', icon: <Meh size={32} />, color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.1)' },
    { id: 'sad', label: 'Sad', icon: <Frown size={32} />, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    { id: 'anxious', label: 'Anxious', icon: <CloudLightning size={32} />, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)' },
];

export default function MoodTracker() {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState('');
    const [moodHistory, setMoodHistory] = useState([
        { id: 1, mood: 'happy', note: 'Feeling great after group session!', time: '10:30 AM', date: 'Today' },
        { id: 2, mood: 'calm', note: 'Meditation helped a lot.', time: 'Yesterday', date: 'Feb 8' }
    ]);

    const handleSaveMood = () => {
        if (!selectedMood) return;

        const newEntry = {
            id: Date.now(),
            mood: selectedMood.id,
            note: note,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: 'Today'
        };

        setMoodHistory([newEntry, ...moodHistory]);
        setSelectedMood(null);
        setNote('');
    };

    return (
        <div className="animate-fade-in" style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        background: 'white',
                        border: '1px solid #E9D5FF',
                        padding: '10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        color: 'var(--primary)'
                    }}
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                    Mood Tracker
                </h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '30px' }}>
                {/* Main Section: Add Mood */}
                <div className="glass-card" style={{ padding: '40px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>How are you today?</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Tracking your emotions helps you understand your healing journey.</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', gap: '15px' }}>
                        {MOODS.map(mood => (
                            <motion.div
                                key={mood.id}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedMood(mood)}
                                style={{
                                    flex: 1,
                                    padding: '20px 10px',
                                    borderRadius: '20px',
                                    background: selectedMood?.id === mood.id ? mood.bg : 'white',
                                    border: `2px solid ${selectedMood?.id === mood.id ? mood.color : 'rgba(109, 40, 217, 0.05)'}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxShadow: selectedMood?.id === mood.id
                                        ? `0 10px 20px ${mood.bg}`
                                        : '0 4px 12px rgba(0,0,0,0.03)'
                                }}
                            >
                                <div style={{ color: mood.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {mood.icon}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: selectedMood?.id === mood.id ? mood.color : 'var(--text-muted)' }}>
                                    {mood.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedMood && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', fontSize: '15px' }}>
                                        Add a note (Optional)
                                    </label>
                                    <textarea
                                        className="input"
                                        placeholder="What's on your mind?"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        style={{ height: '120px', resize: 'none' }}
                                    />
                                </div>
                                <button
                                    onClick={handleSaveMood}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '18px', borderRadius: '15px', fontSize: '16px', fontWeight: '800' }}
                                >
                                    Save Entry
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar: History */}
                <div>
                    <div className="glass-card" style={{ padding: '25px', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Calendar size={20} style={{ color: 'var(--primary)' }} />
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Recent Entries</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {moodHistory.map(entry => {
                                const moodData = MOODS.find(m => m.id === entry.mood);
                                return (
                                    <div key={entry.id} style={{
                                        padding: '15px',
                                        borderRadius: '16px',
                                        background: 'rgba(109, 40, 217, 0.02)',
                                        border: '1px solid rgba(109, 40, 217, 0.05)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ color: moodData?.color }}>
                                                    {moodData && React.cloneElement(moodData.icon, { size: 18 })}
                                                </div>
                                                <span style={{ fontWeight: '700', fontSize: '14px' }}>{moodData?.label}</span>
                                            </div>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{entry.time} • {entry.date}</span>
                                        </div>
                                        {entry.note && (
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.4' }}>
                                                "{entry.note}"
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
