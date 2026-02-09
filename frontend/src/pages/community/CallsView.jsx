import { useState, useEffect } from 'react';
import { Phone, Calendar, Grip, Heart, Search, Video, Eye, ChevronRight, ChevronDown, Users } from 'lucide-react';
import heartIcon from '../../assets/heart_icon_purple.png';

export default function CallsView() {
    const [isDaysOpen, setIsDaysOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeOverlay, setActiveOverlay] = useState(null); // 'keypad', 'call', 'meetup'
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

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', minHeight: '100vh', padding: '40px 20px 20px 20px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>
                    {activeOverlay === 'logs' ? 'Call Logs' : activeOverlay === 'keypad' ? 'Keypad' : 'Calls'}
                </h1>
                <button
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                    onClick={() => console.log('Global search clicked')}
                >
                    <Search size={22} />
                </button>
            </div>

            {activeOverlay === null ? (
                <>
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px 25px' }}>
                        <ActionButton icon={<Phone size={24} />} label="Call" color="#56247E" bg="#F3E8FF" onClick={() => setActiveOverlay('logs')} />
                        <ActionButton icon={<Video size={24} />} label="Schedule" color="#56247E" bg="#F3E8FF" onClick={() => setActiveOverlay('logs')} />
                        <ActionButton icon={<Grip size={24} />} label="Keypad" color="#56247E" bg="#F3E8FF" onClick={() => setActiveOverlay('keypad')} />
                        <ActionButton
                            icon={<img src={heartIcon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />}
                            label="Favourites"
                            color="#56247E"
                            bg="#F3E8FF"
                            onClick={() => console.log('Favourites clicked')}
                        />
                    </div>

                    {/* Online Meetups Schedule */}
                    <div style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: '25px', border: '1px solid var(--input-bg)' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Online Patient Meetups Schedule
                        </h3>
                        {/* ... (search and filters) */}
                        <div style={{ background: 'var(--input-bg)', borderRadius: '50px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', border: '1.5px solid transparent' }}>
                            <Search size={18} color="#9CA3AF" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by date or title..."
                                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)', fontSize: '14px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <button
                                onClick={() => setIsDaysOpen(!isDaysOpen)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px',
                                    background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600'
                                }}
                            >
                                {isDaysOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />} Days
                            </button>

                            {isDaysOpen && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {filteredMeetups.length > 0 ? (
                                        filteredMeetups.map(m => (
                                            <div
                                                key={m.id}
                                                onClick={() => {
                                                    setCallTarget(m);
                                                    setActiveOverlay('meetup');
                                                }}
                                                style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px',
                                                    background: 'var(--input-bg)', borderRadius: '12px', color: 'var(--primary)', fontWeight: 'bold',
                                                    cursor: 'pointer', transition: 'all 0.2s'
                                                }}
                                                className="hover-up"
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span>{m.date}</span>
                                                    <span style={{ fontSize: '11px', fontWeight: '500', opacity: 0.6 }}>{m.title}</span>
                                                </div>
                                                <Eye size={20} className="hover-opacity" style={{ opacity: 0.6 }} />
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
                                            No meetups matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent */}
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '15px' }}>Recent</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {recentCalls.map(c => (
                            <div
                                key={c.id}
                                style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', borderRadius: '12px', transition: 'background 0.2s', cursor: 'pointer' }}
                                className="interactive-row"
                                onClick={() => startCall(c)}
                            >
                                <img src={c.img} alt={c.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 2px' }}>{c.name}</h4>
                                        <span style={{ fontSize: '13px', color: '#888' }}>Starting Treatment...</span>
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#888' }}>{c.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="animate-fade-in">
                    {activeOverlay === 'keypad' && <KeypadView onClose={() => setActiveOverlay(null)} onCall={number => startCall({ name: number, img: null })} />}
                    {activeOverlay === 'logs' && <CallLogsView onClose={() => setActiveOverlay(null)} onCall={startCall} />}
                    {activeOverlay === 'meetup' && <MeetupDetailView meetup={callTarget} onClose={() => setActiveOverlay(null)} onJoin={() => startCall({ name: callTarget?.title, img: null })} />}
                </div>
            )}

            {/* Global Overlays (Keep call overlay fixed) */}
            {activeOverlay === 'call' && <ActiveCallOverlay contact={callTarget} onClose={() => setActiveOverlay(null)} />}
        </div>
    );
}

function ActionButton({ icon, label, color, bg, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s'
            }}
            className="hover-up"
        >
            <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                boxShadow: '0 4px 10px rgba(86, 36, 126, 0.1)',
                transition: 'all 0.2s'
            }} className="button-icon-wrapper">
                {icon}
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>{label}</span>
        </button>
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
            justifyContent: 'center',
            padding: '20px 0'
        }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
                </button>
            </div>

            <div style={{ fontSize: '40px', fontWeight: '400', marginBottom: '40px', height: '50px', textAlign: 'center', color: 'var(--text-main)' }}>
                {number || 'Dial...'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '300px' }}>
                {keys.map(key => (
                    <button
                        key={key}
                        onClick={() => setNumber(prev => prev + key)}
                        style={{
                            width: '75px',
                            height: '75px',
                            borderRadius: '50%',
                            border: '1px solid var(--input-bg)',
                            background: 'var(--card-bg)',
                            color: 'var(--text-main)',
                            fontSize: '28px',
                            fontWeight: '300',
                            cursor: 'pointer'
                        }}
                        className="btn-dialer"
                    >
                        {key}
                    </button>
                ))}
            </div>

            <button
                onClick={() => number && onCall(number)}
                style={{
                    marginTop: '40px',
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    background: '#10B981',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                }}
            >
                <Phone size={32} fill="white" />
            </button>
        </div>
    );
}

function ActiveCallOverlay({ contact, onClose }) {
    const [timer, setTimer] = useState(0);

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
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(180deg, #5B21B6 0%, #1E1B4B 100%)',
            zIndex: 2005,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }} className="animate-fade-in">
            <div style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.8, letterSpacing: '2px' }}>ONGOING CALL</div>

            <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
                {contact?.img ? (
                    <img src={contact.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <Users size={60} />
                )}
            </div>

            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>{contact?.name || 'Unknown'}</h2>
            <div style={{ fontSize: '20px', fontWeight: '300', marginBottom: '100px', opacity: 0.8 }}>{formatTime(timer)}</div>

            <div style={{ display: 'flex', gap: '40px' }}>
                <CircleBtn icon={<Phone size={24} style={{ transform: 'rotate(135deg)' }} />} bg="#EF4444" onClick={onClose} label="End" />
                <CircleBtn icon={<Video size={24} />} bg="rgba(255,255,255,0.1)" label="Video" />
                <CircleBtn icon={<Grip size={24} />} bg="rgba(255,255,255,0.1)" label="Mute" />
            </div>
        </div>
    );
}

function MeetupDetailView({ meetup, onClose, onJoin }) {
    if (!meetup) return null;

    return (
        <div style={{ padding: '10px 0' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
                </button>
            </div>

            <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '14px', marginBottom: '15px' }}>{meetup.date} • {meetup.time}</div>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '20px', lineHeight: '1.2' }}>{meetup.title}</h2>

            <p style={{ color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
                Join SRI LANKA'S peer support community. This session focuses on emotional sharing and collective healing for patients and their loved ones.
            </p>

            <button
                onClick={onJoin}
                style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    padding: '18px',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: '800',
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(109, 40, 217, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}
            >
                <Video size={20} />
                Join Live Meetup
            </button>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {logs.map(log => (
                    <div
                        key={log.id}
                        onClick={() => onCall(log)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '12px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        className="interactive-row"
                    >
                        <img src={log.img} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px' }}>{log.name}</h4>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{log.time}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: log.status === 'missed' ? '#EF4444' : 'var(--text-muted)' }}>
                                {log.type === 'Outgoing' ? <Phone size={12} style={{ transform: 'rotate(135deg)' }} /> : <Phone size={12} />}
                                {log.type} Call
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CircleBtn({ icon, bg, onClick, label }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <button onClick={onClick} style={{ width: '68px', height: '68px', borderRadius: '50%', background: bg, border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {icon}
            </button>
            <span style={{ fontSize: '12px', color: 'white', opacity: 0.7 }}>{label}</span>
        </div>
    );
}
