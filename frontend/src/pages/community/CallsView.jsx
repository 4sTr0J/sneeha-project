import { Phone, Calendar, Grip, Heart, Search, Video, Eye } from 'lucide-react';

export default function CallsView() {
    const onlineMeetups = [
        { id: 1, date: 'DEC 1' },
        { id: 2, date: 'DEC 2' },
        { id: 3, date: 'DEC 14' },
        { id: 4, date: 'DEC 25' },
        { id: 5, date: 'Jan 10' },
    ];

    const recentCalls = [
        { id: 1, name: 'Kusal Aravinda', time: '7.20PM', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
        { id: 2, name: 'Young Adult Thrivers', time: '6.38PM', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=100&h=100&fit=crop' },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', minHeight: '100vh', padding: '40px 20px 20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>Calls</h1>
                <Search size={22} color="#56247E" />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px 25px' }}>
                <ActionButton icon={<Phone size={24} />} label="Call" color="#56247E" bg="#F3E8FF" />
                <ActionButton icon={<Video size={24} />} label="Schedule" color="#56247E" bg="#F3E8FF" />
                <ActionButton icon={<Grip size={24} />} label="Keypad" color="#56247E" bg="#F3E8FF" />
                <ActionButton icon={<Heart size={24} />} label="Favourites" color="#56247E" bg="#F3E8FF" />
            </div>

            {/* Online Meetups Schedule */}
            <div style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: '25px', border: '1px solid var(--input-bg)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Online Patient Meetups Schedule
                </h3>
                <div style={{ background: 'var(--input-bg)', borderRadius: '50px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Search size={18} color="#9CA3AF" />
                    <input style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', marginLeft: '5px' }}>
                        <span style={{ transform: 'rotate(90deg)', display: 'inline-block' }}>▶</span> Days
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {onlineMeetups.map(m => (
                            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'var(--input-bg)', borderRadius: '12px', color: 'var(--primary)', fontWeight: 'bold' }}>
                                {m.date}
                                <Eye size={20} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent */}
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '15px' }}>Recent</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {recentCalls.map(c => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
        </div>
    );
}

function ActionButton({ icon, label, color, bg }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                boxShadow: '0 4px 10px rgba(86, 36, 126, 0.1)'
            }}>
                {icon}
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>{label}</span>
        </div>
    );
}
