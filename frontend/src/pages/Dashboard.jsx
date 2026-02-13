import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Brain, Users, Activity, Heart, Search, Calendar, Bell, Moon, Sun, X } from 'lucide-react';
import doctorMascot from '../assets/wox.mp4';

export default function Dashboard() {
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showEvents, setShowEvents] = useState(false);

    const notificationRef = useRef(null);
    const eventsRef = useRef(null);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const coreFeatures = [
        {
            title: "Mind Relaxation",
            icon: <Brain size={35} />,
            desc: "Guided meditations for stress relief",
            color: "#8B5CF6",
            path: '/wellness'
        },
        {
            title: "Community Support",
            icon: <Users size={35} />,
            desc: "Join groups with similar journeys",
            color: "#EC4899",
            path: '/community'
        },
        {
            title: "Mood Tracker",
            icon: <Activity size={35} />,
            desc: "Visualize your emotional progress",
            color: "#3B82F6",
            path: '/mood-tracker'
        },
        {
            title: "Healing Music",
            icon: <Heart size={35} />,
            desc: "Frequency based sounds for peace",
            color: "#10B981",
            path: '/wellness'
        }
    ];

    const filteredFeatures = coreFeatures.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (eventsRef.current && !eventsRef.current.contains(event.target)) {
                setShowEvents(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationRef]);

    const notifications = [
        { id: 1, title: 'New Meditation Added', time: '2h ago', read: false },
        { id: 2, title: 'Welcome to Sneha!', time: '1d ago', read: true },
        { id: 3, title: 'Your profile is 80% complete', time: '2d ago', read: true }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="animate-fade-in"
        >
            {/* Top Stat Bar */}
            <motion.div variants={itemVariants} className="dashboard-header">
                <div className="dashboard-header-left">
                    <h1 className="dashboard-header-title">
                        How are you feeling, {user?.name?.split(' ')[0]}?
                    </h1>
                    <p className="dashboard-header-subtitle">Let's continue your journey to healing today.</p>
                </div>
                <div className="dashboard-header-right">
                    <div className="search-container">
                        <motion.div
                            className="glass-card search-card-responsive"
                            style={{
                                boxShadow: isSearchFocused ? '0 12px 24px rgba(109, 40, 217, 0.08)' : '0 4px 15px rgba(0,0,0,0.03)',
                            }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <Search size={22} color="var(--text-muted)" />
                            <input
                                type="text"
                                placeholder="Explore Sneha..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    fontSize: '16px',
                                    color: 'var(--text-main)',
                                    fontWeight: '500'
                                }}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#A1A1AA', display: 'flex' }}>
                                    <X size={16} />
                                </button>
                            )}
                        </motion.div>

                        <AnimatePresence>
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="glass-card"
                                    style={{
                                        position: 'absolute',
                                        top: '65px',
                                        left: 0,
                                        width: '100%',
                                        padding: '15px',
                                        zIndex: 1000,
                                        background: isDarkMode ? 'var(--card-bg)' : 'rgba(255, 255, 255, 0.98)',
                                        backdropFilter: 'blur(12px)',
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {searchTerm ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            {filteredFeatures.length > 0 ? (
                                                filteredFeatures.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        whileHover={{ x: 5, background: 'rgba(109, 40, 217, 0.05)' }}
                                                        onClick={() => {
                                                            if (item.path !== '#') navigate(item.path);
                                                            setIsSearchFocused(false);
                                                        }}
                                                        style={{
                                                            padding: '12px',
                                                            borderRadius: '12px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            transition: 'background 0.2s'
                                                        }}
                                                    >
                                                        <div style={{
                                                            color: item.color,
                                                            background: `${item.color}15`,
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</div>
                                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</div>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                                                    No results found
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ padding: '5px' }}>
                                            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Quick Suggestions</div>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {['Meditation', 'Community', 'Mood'].map(tag => (
                                                    <motion.span
                                                        key={tag}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setSearchTerm(tag)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            borderRadius: '20px',
                                                            background: 'var(--page-bg)',
                                                            fontSize: '13px',
                                                            cursor: 'pointer',
                                                            border: '1px solid rgba(0,0,0,0.05)',
                                                            color: 'var(--text-main)'
                                                        }}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isSearchFocused && (
                            <div
                                onClick={() => setIsSearchFocused(false)}
                                style={{
                                    position: 'fixed',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    zIndex: 9,
                                    cursor: 'default'
                                }}
                            />
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        style={{
                            background: 'white',
                            border: '1px solid #E9D5FF',
                            borderRadius: '16px',
                            width: '52px',
                            height: '52px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--primary)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        }}
                    >
                        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </motion.button>

                    <div style={{ position: 'relative' }} ref={eventsRef}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowEvents(!showEvents)}
                            style={{
                                background: 'white',
                                border: '1px solid #E9D5FF',
                                borderRadius: '16px',
                                width: '52px',
                                height: '52px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--primary)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }}
                        >
                            <Calendar size={24} />
                        </motion.button>

                        <AnimatePresence>
                            {showEvents && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="glass-card"
                                    style={{
                                        position: 'absolute',
                                        top: '65px',
                                        right: '-60px',
                                        width: '380px',
                                        padding: '25px',
                                        zIndex: 1000,
                                        textAlign: 'left',
                                        cursor: 'default',
                                        background: isDarkMode ? 'var(--card-bg)' : 'white',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        borderRadius: '24px'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div style={{ marginBottom: '25px' }}>
                                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={18} /> Upcoming Events
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <EventItem time="4:00 PM" label="Meditation Session" />
                                            <EventItem time="Tomorrow" label="Cancer Survivor Meet" />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Daily Reminder</h4>
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
                                            padding: '20px',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(167, 139, 250, 0.2)'
                                        }}>
                                            <p style={{ color: 'var(--text-main)', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', fontWeight: '600' }}>
                                                "Your illness doesn't define you. Your strength and resilience do. Take a deep breath."
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={{ position: 'relative' }} ref={notificationRef}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowNotifications(!showNotifications)}
                            style={{
                                background: 'white',
                                border: '1px solid #E9D5FF',
                                borderRadius: '16px',
                                width: '52px',
                                height: '52px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--bg-darker)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                position: 'relative',
                            }}
                        >
                            <Bell size={24} />
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ position: 'absolute', top: '12px', right: '14px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}
                            ></motion.span>
                        </motion.button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="glass-card"
                                    style={{
                                        position: 'absolute',
                                        top: '65px',
                                        right: '0',
                                        width: '320px',
                                        padding: '20px',
                                        zIndex: 1000,
                                        textAlign: 'left',
                                        cursor: 'default',
                                        background: isDarkMode ? 'var(--card-bg)' : 'white',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        borderRadius: '24px'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h4 style={{ margin: '0 0 15px', fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>Notifications</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {notifications.map(n => (
                                            <motion.div
                                                key={n.id}
                                                whileHover={{ x: 3 }}
                                                style={{
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    background: n.read ? 'transparent' : 'rgba(109, 40, 217, 0.05)',
                                                    border: '1px solid rgba(109, 40, 217, 0.1)'
                                                }}
                                            >
                                                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{n.title}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{n.time}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Welcome Banner Desktop */}
            <motion.div
                variants={itemVariants}
                className="welcome-banner-responsive"
                whileHover={{
                    boxShadow: '0 30px 60px rgba(109, 40, 217, 0.15)',
                    y: -4
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="welcome-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ background: 'rgba(109, 40, 217, 0.1)', color: 'var(--primary)', padding: '6px 15px', borderRadius: '20px', display: 'inline-block', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.5px', width: 'fit-content' }}
                    >
                        NEW CONTENT AVAILABLE
                    </motion.div>
                    <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '15px', color: 'var(--bg-darker)', lineHeight: '1.2' }}>Welcome back to Sneha!</h2>
                    <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: '1.6', marginBottom: '30px', color: 'var(--bg-darker)' }}>
                        We've added new guided meditations and support groups tailored for your
                        <span style={{ fontWeight: '800', color: 'var(--primary)' }}> {user?.supportType || 'wellness'}</span>.
                        Explore them now to stay resilient.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/wellness')}
                        className="btn btn-primary"
                        style={{ fontWeight: '800', padding: '14px 35px', width: 'fit-content', boxShadow: '0 10px 20px rgba(109, 40, 217, 0.2)' }}
                    >
                        Explore Wellness
                    </motion.button>
                </div>

                <div className="welcome-mascot">
                    <motion.video
                        src={doctorMascot}
                        autoPlay
                        loop
                        muted
                        playsInline
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: '380px',
                            height: '380px',
                            objectFit: 'contain',
                            position: 'relative',
                            zIndex: 1,
                            mixBlendMode: 'multiply',
                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                        }}
                    />
                </div>
            </motion.div>

            {/* Content Section - Full Width */}
            <motion.div variants={itemVariants} style={{ paddingBottom: '40px' }}>
                <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '25px', color: 'var(--text-main)' }}>
                    Recommended for You
                </h3>
                <motion.div
                    variants={containerVariants}
                    className="pref-grid-desktop"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
                >
                    {filteredFeatures.length > 0 ? (
                        filteredFeatures.map((item, index) => (
                            <PreferenceCard
                                key={index}
                                title={item.title}
                                icon={item.icon}
                                desc={item.desc}
                                color={item.color}
                                onClick={() => item.path !== '#' && navigate(item.path)}
                            />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                            No results found for "{searchTerm}".
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div >
    );
}

function PreferenceCard({ title, icon, desc, color, onClick }) {
    return (
        <motion.div
            whileHover={{
                y: -10,
                boxShadow: `0 20px 40px ${color}20`,
                borderColor: `${color}40`
            }}
            whileTap={{ scale: 0.98 }}
            className="desktop-card"
            onClick={onClick}
            style={{
                transition: 'border-color 0.3s ease'
            }}
        >
            <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                style={{
                    width: '60px',
                    height: '60px',
                    background: `${color}15`,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color,
                    margin: '0 auto 20px'
                }}
            >
                {icon}
            </motion.div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px', color: 'var(--text-main)' }}>{title}</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{desc}</p>
        </motion.div>
    );
}

function EventItem({ time, label }) {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
        >
            <span style={{ fontWeight: '800', fontSize: '15px', color: 'var(--primary)' }}>{time}</span>
            <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{label}</span>
        </motion.div>
    );
}



