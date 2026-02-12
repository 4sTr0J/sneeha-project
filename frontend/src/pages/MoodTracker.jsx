import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { moodService } from '../services/moodService';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Smile,
    Frown,
    Meh,
    CloudLightning,
    Sun,
    Calendar,
    ChevronLeft,
    TrendingUp,
    Briefcase,
    Home,
    Users,
    Zap,
    Moon,
    Music,
    BookOpen,
    Gamepad2,
    Coffee,
    Sparkles,
    Wind,
    Quote,
    Trash2
} from 'lucide-react';

const AFFIRMATIONS = [
    "You are worthy of happiness and healing.",
    "Every breath is a new beginning.",
    "Small steps are still progress.",
    "Your feelings are valid and important.",
    "You are stronger than you know.",
    "It's okay to take things one day at a time.",
    "Self-care is not selfish, it is essential."
];

const WELLNESS_TIPS = [
    { title: "Hydrate", desc: "Drinking water can improve focus and mood." },
    { title: "Step Outside", desc: "Fresh air and sunlight boost serotonin." },
    { title: "Stretch", desc: "Release tension in your shoulders and neck." },
    { title: "Unplug", desc: "Take a 5-minute break from screens." }
];

const MOODS = [
    { id: 'happy', label: 'Happy', icon: <Smile size={28} />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
    { id: 'calm', label: 'Calm', icon: <Sun size={28} />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    { id: 'neutral', label: 'Meh', icon: <Meh size={28} />, color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.1)' },
    { id: 'sad', label: 'Sad', icon: <Frown size={28} />, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    { id: 'anxious', label: 'Anxious', icon: <CloudLightning size={28} />, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)' },
];

const ACTIVITIES = [
    { id: 'work', label: 'Work', icon: <Briefcase size={14} /> },
    { id: 'family', label: 'Family', icon: <Home size={14} /> },
    { id: 'friends', label: 'Friends', icon: <Users size={14} /> },
    { id: 'exercise', label: 'Exercise', icon: <Zap size={14} /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon size={14} /> },
    { id: 'music', label: 'Music', icon: <Music size={14} /> },
    { id: 'reading', label: 'Reading', icon: <BookOpen size={14} /> },
    { id: 'gaming', label: 'Gaming', icon: <Gamepad2 size={14} /> },
    { id: 'relax', label: 'Relax', icon: <Coffee size={14} /> },
];

export default function MoodTracker() {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);
    const [intensity, setIntensity] = useState(5);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [note, setNote] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instruction, setInstruction] = useState("Breathe In...");

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMoodHistory();

        // Breathing animation timer
        const interval = setInterval(() => {
            setInstruction(prev => prev === "Breathe In..." ? "Breathe Out..." : "Breathe In...");
        }, 4000); // 4 seconds in, 4 seconds out

        return () => clearInterval(interval);
    }, []);

    const fetchMoodHistory = async () => {
        try {
            const data = await moodService.getMoodHistory();
            setMoodHistory(data);
        } catch (error) {
            console.error('Failed to fetch mood history:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleActivity = (id) => {
        if (selectedActivities.includes(id)) {
            setSelectedActivities(selectedActivities.filter(a => a !== id));
        } else {
            setSelectedActivities([...selectedActivities, id]);
        }
    };

    const handleSaveMood = async () => {
        if (!selectedMood) return;

        const entryData = {
            mood: selectedMood.id,
            intensity: intensity,
            activities: selectedActivities,
            note: note,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: 'Today'
        };

        try {
            const savedEntry = await moodService.saveMoodEntry(entryData);
            setMoodHistory([savedEntry, ...moodHistory]);
            setSelectedMood(null);
            setIntensity(5);
            setSelectedActivities([]);
            setNote('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Failed to save mood entry:', error);
            alert('Failed to save mood entry. Please try again.');
        }
    };

    const handleClearHistory = async () => {
        if (!window.confirm('Are you sure you want to clear your entire mood history? This cannot be undone.')) {
            return;
        }

        try {
            await moodService.clearMoodHistory();
            setMoodHistory([]);
        } catch (error) {
            console.error('Failed to clear history:', error);
            alert('Failed to clear history. Please try again.');
        }
    };

    return (
        <div className="animate-fade-in" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div className="dashboard-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: 'white',
                            border: '1px solid #E9D5FF',
                            padding: '10px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: 'var(--primary)',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                            Mood Tracker
                        </h1>
                        <p style={{ margin: '5px 0 0', color: 'var(--text-muted)' }}>Understanding your emotions is the first step to healing.</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '40px' }}>
                {/* Left Column: Input Form */}
                <div className="glass-card" style={{ padding: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', color: 'var(--bg-darker)' }}>
                        {selectedMood ? "Tell us more..." : "How are you feeling right now?"}
                    </h2>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', justifyContent: 'space-between' }}>
                        {MOODS.map(mood => (
                            <motion.button
                                key={mood.id}
                                whileHover={{ y: -5, boxShadow: `0 10px 20px ${mood.bg}` }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedMood(mood)}
                                style={{
                                    padding: '20px 10px',
                                    borderRadius: '20px',
                                    background: selectedMood?.id === mood.id ? mood.bg : 'white',
                                    border: `2px solid ${selectedMood?.id === mood.id ? mood.color : 'rgba(109, 40, 217, 0.1)'}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                    flex: 1
                                }}
                            >
                                <div style={{
                                    color: mood.color,
                                    background: selectedMood?.id === mood.id ? 'white' : `${mood.bg}`,
                                    padding: '10px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50px',
                                    height: '50px'
                                }}>
                                    {mood.icon}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: selectedMood?.id === mood.id ? mood.color : 'var(--text-muted)' }}>
                                    {mood.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {!selectedMood ? (
                            <motion.div
                                key="empty-state"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{ textAlign: 'center', padding: '20px 0' }}
                            >
                                {/* Breathing Exercise Widget */}
                                <div style={{
                                    marginBottom: '40px',
                                    background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
                                    borderRadius: '24px',
                                    padding: '30px',
                                    border: '1px solid rgba(167, 139, 250, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--bg-darker)', marginBottom: '5px' }}>
                                        Take a Moment to Breathe
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '25px' }}>
                                        Center yourself before checking in.
                                    </p>

                                    <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                                        {/* Outer Ripple 1 */}
                                        <motion.div
                                            animate={{ scale: [1, 1.6, 1], opacity: [0.1, 0.3, 0.1] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%)',
                                            }}
                                        />
                                        {/* Outer Ripple 2 */}
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                width: '80%',
                                                height: '80%',
                                                borderRadius: '50%',
                                                background: 'var(--primary)',
                                                opacity: 0.15
                                            }}
                                        />
                                        {/* Core Circle */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.15, 1],
                                                boxShadow: [
                                                    "0 10px 30px rgba(109, 40, 217, 0.2)",
                                                    "0 20px 50px rgba(109, 40, 217, 0.5)",
                                                    "0 10px 30px rgba(109, 40, 217, 0.2)"
                                                ]
                                            }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                            style={{
                                                width: '70px',
                                                height: '70px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                zIndex: 10
                                            }}
                                        >
                                            <Wind size={28} />
                                        </motion.div>
                                    </div>
                                    <motion.p
                                        key={instruction}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ marginTop: '5px', fontSize: '16px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.5px' }}
                                    >
                                        {instruction}
                                    </motion.p>
                                </div>

                                {/* Daily Meaningful Content */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    {/* Daily Affirmation */}
                                    <div style={{
                                        padding: '20px',
                                        borderRadius: '20px',
                                        background: '#FFFAEA',
                                        border: '1px solid #FFE4A3',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#D97706' }}>
                                            <Quote size={18} />
                                            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Daily Affirmation</span>
                                        </div>
                                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#78350F', lineHeight: '1.4' }}>
                                            "{AFFIRMATIONS[new Date().getDate() % AFFIRMATIONS.length]}"
                                        </p>
                                    </div>

                                    {/* Quick Wellness Tip */}
                                    <div style={{
                                        padding: '20px',
                                        borderRadius: '20px',
                                        background: '#F0FDFA',
                                        border: '1px solid #CCFBF1',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#0F766E' }}>
                                            <Sparkles size={18} />
                                            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>wellness Tip</span>
                                        </div>
                                        <p style={{ fontSize: '15px', fontWeight: '700', color: '#115E59', marginTop: '0', marginBottom: '5px' }}>
                                            {WELLNESS_TIPS[new Date().getDate() % WELLNESS_TIPS.length].title}
                                        </p>
                                        <p style={{ fontSize: '13px', color: '#134E4A', margin: 0 }}>
                                            {WELLNESS_TIPS[new Date().getDate() % WELLNESS_TIPS.length].desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="mood-form"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                {/* Intensity Slider */}
                                <div style={{ marginBottom: '35px', marginTop: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <label style={{ fontWeight: '700', fontSize: '16px', color: 'var(--bg-darker)' }}>
                                            Intensity based on feeling
                                        </label>
                                        <span style={{ fontWeight: '800', color: selectedMood.color, fontSize: '18px' }}>
                                            {intensity}/10
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={intensity}
                                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                                        style={{
                                            width: '100%',
                                            height: '8px',
                                            borderRadius: '5px',
                                            background: `linear-gradient(to right, ${selectedMood.color}30, ${selectedMood.color})`,
                                            appearance: 'none',
                                            cursor: 'pointer',
                                            accentColor: selectedMood.color
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: 'var(--text-muted)', fontSize: '12px' }}>
                                        <span>Mild</span>
                                        <span>Moderate</span>
                                        <span>Intense</span>
                                    </div>
                                </div>

                                {/* Activities Selection */}
                                <div style={{ marginBottom: '35px' }}>
                                    <label style={{ display: 'block', marginBottom: '15px', fontWeight: '700', fontSize: '16px', color: 'var(--bg-darker)' }}>
                                        What have you been doing?
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {ACTIVITIES.map(activity => {
                                            const isSelected = selectedActivities.includes(activity.id);
                                            return (
                                                <button
                                                    key={activity.id}
                                                    onClick={() => toggleActivity(activity.id)}
                                                    style={{
                                                        padding: '10px 18px',
                                                        borderRadius: '30px',
                                                        border: isSelected ? `1px solid ${selectedMood.color}` : '1px solid rgba(109, 40, 217, 0.1)',
                                                        background: isSelected ? selectedMood.bg : 'white',
                                                        color: isSelected ? selectedMood.color : 'var(--text-muted)',
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {activity.icon}
                                                    {activity.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Note Input */}
                                <div style={{ marginBottom: '35px' }}>
                                    <label style={{ display: 'block', marginBottom: '15px', fontWeight: '700', fontSize: '16px', color: 'var(--bg-darker)' }}>
                                        Add a note (Optional)
                                    </label>
                                    <div className="search-input-wrapper" style={{ padding: '2px', background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(236, 72, 153, 0.3))', borderRadius: '14px' }}>
                                        <textarea
                                            placeholder="What's on your mind? Journaling helps process emotions..."
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            style={{
                                                width: '100%',
                                                height: '140px',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                resize: 'none',
                                                outline: 'none',
                                                fontSize: '15px',
                                                background: 'white',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSaveMood}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        borderRadius: '16px',
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        boxShadow: `0 10px 30px ${selectedMood.bg}`,
                                        border: 'none',
                                        background: selectedMood.color
                                    }}
                                >
                                    Check In
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column: History & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                    {/* Weekly Summary (Mock Visualization) */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                            <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>Your Week</h3>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '120px', paddingBottom: '10px' }}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '12px',
                                        height: `${30 + Math.random() * 70}%`,
                                        background: i === 6 ? 'var(--primary)' : 'rgba(109, 40, 217, 0.2)',
                                        borderRadius: '10px'
                                    }} />
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>{day}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ background: '#10B981', borderRadius: '50%', padding: '5px', display: 'flex' }}><TrendingUp size={14} color="white" /></div>
                            <span style={{ fontSize: '13px', color: '#047857', fontWeight: '600' }}>Your mood is improving! Keep it up.</span>
                        </div>
                    </div>

                    {/* Recent History List */}
                    <div className="glass-card" style={{ padding: '30px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={24} style={{ color: 'var(--primary)' }} />
                                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>Recent Journal</h3>
                            </div>
                            {moodHistory.length > 0 && (
                                <button
                                    onClick={handleClearHistory}
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#EF4444',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '8px 12px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                >
                                    <Trash2 size={16} />
                                    Clear
                                </button>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
                            {moodHistory.length > 0 ? (
                                moodHistory.map((entry, idx) => {
                                    const moodData = MOODS.find(m => m.id === entry.mood);
                                    let entryActivities = entry.activities;
                                    if (typeof entryActivities === 'string') {
                                        try { entryActivities = JSON.parse(entryActivities); } catch (e) { entryActivities = []; }
                                    }

                                    return (
                                        <motion.div
                                            key={entry.id || idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            style={{
                                                padding: '20px',
                                                borderRadius: '20px',
                                                background: 'white',
                                                border: '1px solid rgba(167, 139, 250, 0.1)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{
                                                        background: moodData?.bg,
                                                        color: moodData?.color,
                                                        padding: '8px',
                                                        borderRadius: '12px'
                                                    }}>
                                                        {moodData && React.cloneElement(moodData.icon, { size: 20 })}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--bg-darker)' }}>{moodData?.label}</div>
                                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{entry.time}</div>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    background: 'var(--page-bg)',
                                                    padding: '5px 10px',
                                                    borderRadius: '10px',
                                                    fontSize: '12px',
                                                    fontWeight: '700',
                                                    color: moodData?.color,
                                                    height: 'fit-content'
                                                }}>
                                                    Intensity: {entry.intensity || 5}
                                                </div>
                                            </div>

                                            {entry.note && (
                                                <p style={{ margin: '0 0 12px', fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                                                    {entry.note}
                                                </p>
                                            )}

                                            {entryActivities && entryActivities.length > 0 && (
                                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                    {entryActivities.map(actId => {
                                                        const act = ACTIVITIES.find(a => a.id === actId);
                                                        if (!act) return null;
                                                        return (
                                                            <span key={actId} style={{
                                                                fontSize: '11px',
                                                                padding: '4px 10px',
                                                                background: '#F3F4F6',
                                                                borderRadius: '8px',
                                                                color: '#4B5563',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px',
                                                                fontWeight: '600'
                                                            }}>
                                                                {act.icon && React.cloneElement(act.icon, { size: 12 })}
                                                                {act.label}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                    <p>No entries yet. Start tracking!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
