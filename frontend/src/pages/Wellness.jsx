import { useState, useEffect } from 'react';
import { Play, Heart, Clock, Search, Filter } from 'lucide-react';
import { wellnessService } from '../services/wellnessService';

export default function Wellness() {
    const [content, setContent] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, [filter]);

    const loadContent = async () => {
        try {
            const filterType = filter === 'all' ? null : filter;
            const data = await wellnessService.getWellnessContent(filterType);
            setContent(data);
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const filters = [
        { value: 'all', label: 'All Resources' },
        { value: 'meditation', label: 'Guided Meditation' },
        { value: 'music', label: 'Healing Music' },
        { value: 'breathing', label: 'Breathing Exercises' },
        { value: 'affirmation', label: 'Daily Affirmations' }
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--bg-darker)' }}>Wellness Library</h1>
                    <p style={{ color: '#6B7280', fontSize: '18px' }}>Explore curated content to support your mental and physical healing.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF' }} />
                        <input className="input" placeholder="Search library..." style={{ width: '300px', paddingLeft: '45px', marginBottom: 0 }} />
                    </div>
                </div>
            </div>

            {/* Desktop Filter Bar */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        style={{
                            padding: '12px 25px',
                            borderRadius: '12px',
                            border: 'none',
                            background: filter === f.value ? 'var(--primary)' : 'white',
                            color: filter === f.value ? 'white' : '#6B7280',
                            fontWeight: '700',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div className="gradient-text" style={{ fontSize: '24px', fontWeight: '700' }}>Preparing your wellness space...</div>
                </div>
            ) : content.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <h3 style={{ fontSize: '20px', color: '#9CA3AF' }}>No resources found in this category. Check back later!</h3>
                </div>
            ) : (
                <div className="pref-grid-desktop">
                    {content.map((item) => (
                        <WellnessCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

function WellnessCard({ item }) {
    return (
        <div className="desktop-card" style={{ textAlign: 'left', padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '180px', background: 'var(--bg-darker)', position: 'relative' }}>
                {/* Visual placeholder */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'linear-gradient(45deg, var(--primary), var(--accent))' }}></div>
                <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '8px', color: 'white', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    {item.type}
                </div>
                <button style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', cursor: 'pointer' }}>
                    <Play fill="var(--primary)" size={20} />
                </button>
            </div>
            <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6', marginBottom: '20px' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '13px' }}>
                        <Clock size={14} />
                        {item.duration || '5:00'}
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                        <Heart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
