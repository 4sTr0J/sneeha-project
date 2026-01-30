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
    const isMeditation = item.type === 'meditation';

    // Generate a unique gradient based on the title
    const getGradient = (title) => {
        const colors = [
            'linear-gradient(135deg, #6D28D9 0%, #EC4899 100%)',
            'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
            'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)'
        ];
        const index = title.length % colors.length;
        return colors[index];
    };

    return (
        <div className="desktop-card wellness-card-hover" style={{
            textAlign: 'left',
            padding: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            border: 'none',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <div style={{ height: '200px', background: 'var(--bg-darker)', position: 'relative' }}>
                {/* Visual placeholder with gradient and icon */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.8,
                    background: getGradient(item.title)
                }}></div>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}></div>

                <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>
                    {item.type}
                </div>

                <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    color: 'white',
                    opacity: 0.8
                }}>
                    {isMeditation ? <Heart size={20} /> : <Play size={20} />}
                </div>

                <button className="play-button-hover" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}>
                    <Play fill="var(--primary)" size={24} />
                </button>
            </div>

            <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--bg-darker)', margin: 0 }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6', marginBottom: 'auto', paddingBottom: '20px' }}>
                    {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '6px 15px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '800',
                        boxShadow: '0 4px 10px rgba(109, 40, 217, 0.2)'
                    }}>
                        {item.duration || '5:00 min'}
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button style={{
                            background: '#F1F5F9',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '10px',
                            color: '#64748B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Filter size={18} />
                        </button>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '0'
                        }}>
                            <Heart size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
