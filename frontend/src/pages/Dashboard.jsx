import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Brain, Users, Activity, Heart, Search, Calendar, Bell, Moon, Sun, X, ChevronLeft } from 'lucide-react';
import doctorMascot from '../assets/wox.mp4';
import SlidingPanel from '../components/layout/SlidingPanel';


export default function Dashboard() {
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [panelOpen, setPanelOpen] = useState(false);
    const notificationRef = useRef(null);
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

    return (
        <div className="animate-fade-in">
            {/* Top Stat Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)' }}>
                        How are you feeling, {user?.name?.split(' ')[0]}?
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Let's continue your journey to healing today.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', zIndex: isSearchFocused ? 1100 : 10 }}>
                        {/* Ultra-Sleek Search Icon */}
                        <Search
                            size={16}
                            style={{
                                position: 'absolute',
                                left: '16px',
                                zIndex: 10,
                                color: isSearchFocused ? 'var(--primary)' : '#A1A1AA',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        />

                        {/* Ultra-Compact pill input */}
                        <motion.input
                            className="input"
                            placeholder="Explore Sneha..."
                            animate={{
                                width: isSearchFocused ? '320px' : '220px',
                                backgroundColor: isSearchFocused ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.45)',
                                boxShadow: isSearchFocused
                                    ? '0 12px 24px rgba(109, 40, 217, 0.08), 0 0 0 2px rgba(109, 40, 217, 0.03)'
                                    : '0 2px 6px rgba(0, 0, 0, 0.02)'
                            }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{
                                paddingLeft: '42px',
                                paddingRight: searchTerm ? '32px' : '15px',
                                borderRadius: '19px',
                                marginBottom: 0,
                                height: '38px',
                                fontSize: '13.5px',
                                fontWeight: '500',
                                border: isSearchFocused ? '1px solid var(--primary)' : '1px solid rgba(167, 139, 250, 0.15)',
                                backdropFilter: 'blur(10px)',
                                color: 'var(--text-main)',
                                transition: 'border 0.2s ease, background-color 0.2s ease'
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                        />

                        {/* Ultra-Compact clear button */}
                        <AnimatePresence>
                            {searchTerm && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    onClick={() => setSearchTerm('')}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        cursor: 'pointer',
                                        color: '#A1A1AA',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '4px'
                                    }}
                                    whileHover={{ color: 'var(--primary)' }}
                                >
                                    <X size={13} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Compact Results Dropdown */}
                        <AnimatePresence>
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    className="glass-card"
                                    style={{
                                        position: 'absolute',
                                        top: '46px',
                                        left: 0,
                                        width: '100%',
                                        padding: '8px',
                                        zIndex: 1000,
                                        textAlign: 'left',
                                        borderRadius: '16px',
                                        boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                                        border: '1px solid rgba(109, 40, 217, 0.06)',
                                        background: 'rgba(255, 255, 255, 0.98)',
                                        backdropFilter: 'blur(12px)'
                                    }}
                                >
                                    {searchTerm ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            {filteredFeatures.length > 0 ? (
                                                filteredFeatures.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => item.path !== '#' && navigate(item.path)}
                                                        style={{
                                                            padding: '8px 10px',
                                                            borderRadius: '10px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(109, 40, 217, 0.04)'}
                                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                                    >
                                                        <div style={{
                                                            color: item.color,
                                                            background: `${item.color}10`,
                                                            width: '28px',
                                                            height: '28px',
                                                            borderRadius: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            {item.icon && <item.icon.type size={16} />}
                                                        </div>
                                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                                            <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#18181B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                                                            <div style={{ fontSize: '11.5px', color: '#71717A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.desc}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '20px 0', textAlign: 'center', color: '#71717A' }}>
                                                    <div style={{ fontSize: '13px', fontWeight: '500' }}>No results</div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ padding: '4px' }}>
                                            <div style={{ fontSize: '9px', fontWeight: '800', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', paddingLeft: '6px' }}>Quick Starts</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {['Meditation', 'Mood'].map((tag) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setSearchTerm(tag)}
                                                        style={{
                                                            padding: '4px 8px',
                                                            borderRadius: '8px',
                                                            border: '1px solid rgba(167, 139, 250, 0.15)',
                                                            background: 'white',
                                                            fontSize: '11.5px',
                                                            fontWeight: '600',
                                                            color: '#3F3F46',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                        onMouseOver={(e) => {
                                                            e.currentTarget.style.borderColor = 'var(--primary)';
                                                            e.currentTarget.style.color = 'var(--primary)';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.15)';
                                                            e.currentTarget.style.color = '#3F3F46';
                                                        }}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Minimal Overlay */}
                    <AnimatePresence>
                        {isSearchFocused && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSearchFocused(false)}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(24, 24, 27, 0.05)',
                                    backdropFilter: 'blur(2px)',
                                    zIndex: 1050
                                }}
                            />
                        )}
                    </AnimatePresence>

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
                    <div style={{ position: 'relative' }} ref={notificationRef}>
                        <div
                            className="hover-scale"
                            onClick={() => setShowNotifications(!showNotifications)}
                            style={{
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
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                cursor: 'pointer'
                            }}
                        >
                            <Bell size={22} />
                            <span style={{ position: 'absolute', top: '10px', right: '12px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
                        </div>

                        {showNotifications && (
                            <div className="glass-card" style={{
                                position: 'absolute',
                                top: '55px',
                                right: '0',
                                width: '300px',
                                padding: '15px',
                                zIndex: 1000,
                                textAlign: 'left',
                                cursor: 'default'
                            }} onClick={(e) => e.stopPropagation()}>
                                <h4 style={{ margin: '0 0 15px', fontSize: '18px', fontWeight: '800', color: 'var(--bg-darker)' }}>Notifications</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {notifications.map(n => (
                                        <div key={n.id} style={{
                                            padding: '10px',
                                            borderRadius: '10px',
                                            background: n.read ? 'transparent' : 'rgba(109, 40, 217, 0.05)',
                                            border: '1px solid rgba(109, 40, 217, 0.1)'
                                        }}>
                                            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--bg-darker)', marginBottom: '4px' }}>{n.title}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{n.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <SlidingPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />

            {/* Floating Sliding Menu Button - Arrow Always Visible */}
            <button
                className="floating-menu-btn"
                onClick={() => setPanelOpen(true)}
                style={{
                    position: 'fixed',
                    top: '50%',
                    right: '-12px',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    width: '48px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--primary)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1100,
                    paddingLeft: '8px'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.right = '0';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.border = '2px solid var(--primary)';
                    e.currentTarget.style.borderRight = 'none';
                    e.currentTarget.style.borderTopLeftRadius = '16px';
                    e.currentTarget.style.borderBottomLeftRadius = '16px';
                    e.currentTarget.style.boxShadow = '-8px 0 30px rgba(109, 40, 217, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.right = '-12px';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.border = 'none';
                    e.currentTarget.style.borderRadius = '0';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <ChevronLeft size={28} strokeWidth={2.5} />
            </button>

            {/* Welcome Banner Desktop */}
            <motion.div
                className="welcome-banner-desktop"
                whileHover={{
                    boxShadow: '0 30px 60px rgba(109, 40, 217, 0.15)',
                    y: -4
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '0',
                    padding: '0',
                    alignItems: 'stretch',
                    overflow: 'hidden',
                    background: 'white',
                    border: '1px solid rgba(167, 139, 250, 0.15)',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(109, 40, 217, 0.05)',
                    cursor: 'default'
                }}
            >
                {/* Left Side: Content Box */}
                <div style={{
                    padding: '50px 60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'transparent'
                }}>
                    <div style={{ background: 'rgba(109, 40, 217, 0.1)', color: 'var(--primary)', padding: '6px 15px', borderRadius: '20px', display: 'inline-block', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.5px', width: 'fit-content' }}>
                        NEW CONTENT AVAILABLE
                    </div>
                    <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '15px', color: 'var(--bg-darker)', lineHeight: '1.2' }}>Welcome back to Sneha!</h2>
                    <p style={{ fontSize: '18px', opacity: 0.8, lineHeight: '1.6', marginBottom: '30px', color: 'var(--bg-darker)' }}>
                        We've added new guided meditations and support groups tailored for your
                        <span style={{ fontWeight: '800', color: 'var(--primary)' }}> {user?.supportType || 'wellness'}</span>.
                        Explore them now to stay resilient.
                    </p>
                    <button onClick={() => navigate('/wellness')} className="btn btn-primary" style={{ fontWeight: '800', padding: '14px 35px', width: 'fit-content', boxShadow: '0 10px 20px rgba(109, 40, 217, 0.2)' }}>
                        Explore Wellness
                    </button>
                </div>

                {/* Right Side: Mascot Box */}
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent'
                }}>


                    {/* Smoothly Animated Mascot Video */}
                    <motion.video
                        src={doctorMascot}
                        autoPlay
                        loop
                        muted
                        playsInline
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
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
                            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.05))',
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                        }}
                    />
                </div>
            </motion.div>

            {/* Content Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                <div>
                    <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '25px', color: 'var(--bg-darker)' }}>
                        Recommended for You
                    </h3>
                    <div className="pref-grid-desktop">
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
                    </div>
                </div>

                {/* Sidebar Widget (Desktop Only) */}
                <div>
                    <div className="glass-card" style={{ marginBottom: '30px' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={20} color="var(--primary)" />
                            Upcoming Events
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <EventItem time="4:00 PM" label="Meditation Session" />
                            <EventItem time="Tomorrow" label="Cancer Survivor Meet" />
                        </div>
                    </div>

                    <div className="glass-card" style={{ background: 'white', border: '1px solid #E9D5FF', color: 'var(--text-main)' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px' }}>Daily Reminder</h4>
                        <p style={{ color: 'var(--text-main)', fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
                            "Your illness doesn't define you. Your strength and resilience do. Take a deep breath."
                        </p>
                    </div>
                </div>
            </div>
        </div >
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
            <span style={{ fontWeight: '700', fontSize: '16px', color: 'var(--primary)' }}>{time}</span>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>{label}</span>
        </div>
    );
}
