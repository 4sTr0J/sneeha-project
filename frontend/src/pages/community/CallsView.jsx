import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Grip, Heart, Search, Video, Eye, ChevronRight, ChevronDown, Users, X, Mic, MicOff, VideoOff } from 'lucide-react';
import heartIcon from '../../assets/heart_icon_purple.png';

export default function CallsView() {
    const [isDaysOpen, setIsDaysOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeOverlay, setActiveOverlay] = useState(null); // 'keypad', 'call', 'meetup', 'logs'
    const [callTarget, setCallTarget] = useState(null);

    const onlineMeetups = [
        { id: 1, date: 'DEC 1', title: 'Cancer Support Sri Lanka', time: '10:00 AM' },
        { id: 2, date: 'DEC 2', title: 'Nutrition & Wellness Workshop', time: '4:00 PM' },
        { id: 3, date: 'DEC 14', title: 'Caregiver Support Group', time: '7:30 PM' },
        { id: 4, date: 'DEC 25', title: 'Holiday Healing Circle', time: '9:00 AM' },
        { id: 5, date: 'Jan 10', title: 'New Year Meditation', time: '6:00 PM' },
    ];

    const filteredMeetups = onlineMeetups.filter(m =>
        m.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recentCalls = [
        { id: 1, name: 'Kusal Aravinda', time: '7.20PM', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
        { id: 2, name: 'Young Adult Thrivers', time: '6.38PM', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=100&h=100&fit=crop' },
    ];

    const startCall = (contact) => {
        setCallTarget(contact);
        setActiveOverlay('call');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0, y: -20 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'var(--card-bg)',
                borderRadius: '32px',
                padding: '24px',
                minHeight: 'calc(100vh - 200px)',
                border: '1px solid var(--input-bg)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>
                        {activeOverlay === 'logs' ? 'Call Logs' : activeOverlay === 'keypad' ? 'Keypad' : 'Calls'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: '500', marginTop: '4px' }}>
                        Connect with your community and specialists
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, background: 'var(--input-bg)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--primary)',
                        padding: '12px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => console.log('Global search clicked')}
                >
                    <Search size={24} />
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {activeOverlay === null ? (
                    <motion.div
                        key="main-view"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                    >
                        {/* Action Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '32px', padding: '0 0 32px' }}>
                            <ActionButton icon={<Phone size={28} />} label="Call" color="var(--primary)" bg="rgba(139, 92, 246, 0.1)" onClick={() => setActiveOverlay('logs')} />
                            <ActionButton icon={<Video size={28} />} label="Schedule" color="var(--primary)" bg="rgba(139, 92, 246, 0.1)" onClick={() => setActiveOverlay('logs')} />
                            <ActionButton icon={<Grip size={28} />} label="Keypad" color="var(--primary)" bg="rgba(139, 92, 246, 0.1)" onClick={() => setActiveOverlay('keypad')} />
                            <ActionButton
                                icon={<img src={heartIcon} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                                label="Favourites"
                                color="var(--primary)"
                                bg="rgba(139, 92, 246, 0.1)"
                                onClick={() => console.log('Favourites clicked')}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '48px', flex: 1 }}>
                            {/* Left Col: Online Meetups Schedule */}
                            <motion.div
                                variants={itemVariants}
                                style={{
                                    background: 'var(--page-bg)',
                                    borderRadius: '24px',
                                    padding: '32px',
                                    border: '1px solid var(--input-bg)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Calendar size={22} color="var(--primary)" />
                                    Online Patient Meetups Schedule
                                </h3>

                                <div style={{
                                    background: 'var(--card-bg)',
                                    borderRadius: '16px',
                                    padding: '12px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '24px',
                                    border: '1px solid var(--input-bg)'
                                }} className="focus-within-ring">
                                    <Search size={20} color="var(--text-muted)" />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by date or title..."
                                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)', fontSize: '16px' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '10px' }}>
                                    <motion.button
                                        onClick={() => setIsDaysOpen(!isDaysOpen)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px',
                                            background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', letterSpacing: '1px'
                                        }}
                                    >
                                        <motion.div animate={{ rotate: isDaysOpen ? 90 : 0 }}>
                                            <ChevronRight size={16} />
                                        </motion.div>
                                        UPCOMING MEETUPS
                                    </motion.button>

                                    <AnimatePresence>
                                        {isDaysOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}
                                            >
                                                {filteredMeetups.length > 0 ? (
                                                    filteredMeetups.map(m => (
                                                        <motion.div
                                                            key={m.id}
                                                            whileHover={{ x: 5, background: 'rgba(139, 92, 246, 0.05)' }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => {
                                                                setCallTarget(m);
                                                                setActiveOverlay('meetup');
                                                            }}
                                                            style={{
                                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px',
                                                                background: 'var(--card-bg)', borderRadius: '20px', color: 'var(--text-main)',
                                                                cursor: 'pointer', transition: 'all 0.2s', border: '1px solid var(--input-bg)'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px', letterSpacing: '0.5px' }}>{m.date} • {m.time}</span>
                                                                <span style={{ fontSize: '18px', fontWeight: '700' }}>{m.title}</span>
                                                            </div>
                                                            <motion.div whileHover={{ scale: 1.2 }} style={{ color: 'var(--primary)' }}>
                                                                <ChevronRight size={28} />
                                                            </motion.div>
                                                        </motion.div>
                                                    ))
                                                ) : (
                                                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '15px' }}>
                                                        No meetups matching "{searchQuery}"
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Right Col: Recent */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <motion.h3
                                    variants={itemVariants}
                                    style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px' }}
                                >
                                    Recent Calls
                                </motion.h3>
                                <motion.div
                                    variants={containerVariants}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                                >
                                    {recentCalls.map(c => (
                                        <motion.div
                                            key={c.id}
                                            variants={itemVariants}
                                            whileHover={{ x: 10, background: 'rgba(139, 92, 246, 0.03)' }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '24px', transition: 'background 0.2s', cursor: 'pointer', border: '1px solid var(--input-bg)' }}
                                            onClick={() => startCall(c)}
                                        >
                                            <div style={{ position: 'relative' }}>
                                                <img src={c.img} alt={c.name} style={{ width: '64px', height: '64px', borderRadius: '20px', objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', bottom: -2, right: -2, width: '16px', height: '16px', background: '#10B981', border: '3px solid var(--card-bg)', borderRadius: '50%' }} />
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px' }}>{c.name}</h4>
                                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Incoming • {c.time}</span>
                                                </div>
                                                <motion.div
                                                    whileHover={{ scale: 1.2, color: '#10B981' }}
                                                    style={{ color: 'var(--primary)' }}
                                                >
                                                    <Phone size={22} />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="overlay-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}
                    >
                        {activeOverlay === 'keypad' && <KeypadView onClose={() => setActiveOverlay(null)} onCall={number => startCall({ name: number, img: null })} />}
                        {activeOverlay === 'logs' && <CallLogsView onClose={() => setActiveOverlay(null)} onCall={startCall} />}
                        {activeOverlay === 'meetup' && <MeetupDetailView meetup={callTarget} onClose={() => setActiveOverlay(null)} onJoin={() => startCall({ name: callTarget?.title, img: null })} />}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Overlays */}
            <AnimatePresence>
                {activeOverlay === 'call' && <ActiveCallOverlay contact={callTarget} onClose={() => setActiveOverlay(null)} />}
            </AnimatePresence>
        </motion.div>
    );
}

function ActionButton({ icon, label, color, bg, onClick }) {
    return (
        <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
            }}
        >
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                boxShadow: '0 8px 16px rgba(109, 40, 217, 0.1)',
                transition: 'all 0.3s'
            }}>
                {icon}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>{label}</span>
        </motion.button>
    );
}

function KeypadView({ onClose, onCall }) {
    const [number, setNumber] = useState('');
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0'
        }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '32px' }}>
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={onClose}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px' }}
                >
                    <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} /> Back
                </motion.button>
            </div>

            <motion.div
                key={number}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ fontSize: '48px', fontWeight: '300', marginBottom: '48px', height: '60px', textAlign: 'center', color: 'var(--text-main)', letterSpacing: '2px' }}
            >
                {number || 'Dial...'}
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '320px' }}>
                {keys.map(key => (
                    <motion.button
                        key={key}
                        whileHover={{ scale: 1.1, background: 'rgba(139, 92, 246, 0.05)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNumber(prev => prev + key)}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '40px',
                            border: '1px solid var(--input-bg)',
                            background: 'var(--card-bg)',
                            color: 'var(--text-main)',
                            fontSize: '28px',
                            fontWeight: '300',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                    >
                        {key}
                    </motion.button>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '48px' }}>
                <div style={{ width: '80px' }} /> {/* Spacer */}
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => number && onCall(number)}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '40px',
                        background: '#10B981',
                        border: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
                    }}
                >
                    <Phone size={32} fill="white" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setNumber(prev => prev.slice(0, -1))}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '40px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </motion.button>
            </div>
        </div>
    );
}

function ActiveCallOverlay({ contact, onClose }) {
    const [timer, setTimer] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideo, setIsVideo] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(180deg, #5B21B6 0%, #1E1B4B 100%)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                style={{ marginBottom: '20px', fontSize: '14px', letterSpacing: '4px', fontWeight: '700' }}
            >
                ONGOING CALL
            </motion.div>

            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        '0 0 0 0px rgba(255,255,255,0.1)',
                        '0 0 0 30px rgba(255,255,255,0)',
                        '0 0 0 0px rgba(255,255,255,0.1)'
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ width: '180px', height: '180px', borderRadius: '40px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}
            >
                {contact?.img ? (
                    <img src={contact.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <Users size={80} />
                )}
            </motion.div>

            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px' }}>{contact?.name || 'Unknown'}</h2>
            <div style={{ fontSize: '24px', fontWeight: '300', marginBottom: '120px', opacity: 0.8 }}>{formatTime(timer)}</div>

            <div style={{ display: 'flex', gap: '48px' }}>
                <CircleBtn
                    icon={isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    bg={isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)'}
                    label={isMuted ? "Unmute" : "Mute"}
                    onClick={() => setIsMuted(!isMuted)}
                />
                <CircleBtn
                    icon={<Phone size={32} style={{ transform: 'rotate(135deg)' }} />}
                    bg="#EF4444"
                    onClick={onClose}
                    label="End"
                    large
                />
                <CircleBtn
                    icon={isVideo ? <Video size={24} /> : <VideoOff size={24} />}
                    bg={isVideo ? 'rgba(255,255,255,0.1)' : 'rgba(239, 68, 68, 0.2)'}
                    label={isVideo ? "Video" : "Camera Off"}
                    onClick={() => setIsVideo(!isVideo)}
                />
            </div>
        </motion.div>
    );
}

function MeetupDetailView({ meetup, onClose, onJoin }) {
    if (!meetup) return null;

    return (
        <div style={{ padding: '10px 0' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '32px' }}>
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={onClose}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px' }}
                >
                    <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} /> Back
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '16px', marginBottom: '16px', letterSpacing: '1px' }}
            >
                {meetup.date} • {meetup.time}
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '24px', lineHeight: '1.2' }}
            >
                {meetup.title}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ color: 'var(--text-muted)', marginBottom: '48px', fontSize: '18px', lineHeight: '1.6' }}
            >
                Join our peer support community. This session focuses on emotional sharing and collective healing for patients and their loved ones in a safe, moderated environment.
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(109, 40, 217, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoin}
                style={{
                    width: '100%',
                    background: 'var(--primary)',
                    padding: '20px',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: '800',
                    fontSize: '18px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}
            >
                <Video size={24} />
                Join Live Meetup
            </motion.button>
        </div>
    );
}

function CallLogsView({ onClose, onCall }) {
    const logs = [
        { id: 1, name: 'Kusal Aravinda', type: 'Outgoing', time: 'Yesterday, 8:45 PM', status: 'missed', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
        { id: 2, name: 'Young Adult Thrivers', type: 'Incoming', time: 'Feb 8, 11:20 AM', status: 'completed', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=100&h=100&fit=crop' },
        { id: 3, name: 'Dr. Nirmal', type: 'Outgoing', time: 'Feb 7, 3:15 PM', status: 'completed', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' },
        { id: 4, name: 'Family Group', type: 'Incoming', time: 'Feb 6, 9:00 PM', status: 'completed', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=100&h=100&fit=crop' },
    ];

    return (
        <div style={{ padding: '10px 0' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '32px' }}>
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={onClose}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px' }}
                >
                    <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} /> Back
                </motion.button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {logs.map((log, idx) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 10, background: 'rgba(139, 92, 246, 0.03)' }}
                        onClick={() => onCall(log)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            border: '1px solid var(--input-bg)'
                        }}
                    >
                        <img src={log.img} alt="" style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px' }}>{log.name}</h4>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>{log.time}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: log.status === 'missed' ? '#EF4444' : 'var(--text-muted)', fontWeight: '500' }}>
                                {log.type === 'Outgoing' ? <Phone size={14} style={{ transform: 'rotate(135deg)' }} /> : <Phone size={14} />}
                                {log.type} Call • {log.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function CircleBtn({ icon, bg, onClick, label, large }) {
    const size = large ? '84px' : '64px';
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClick}
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: bg,
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
            >
                {icon}
            </motion.button>
            <span style={{ fontSize: '13px', color: 'white', opacity: 0.8, fontWeight: '600' }}>{label}</span>
        </div>
    );
}

