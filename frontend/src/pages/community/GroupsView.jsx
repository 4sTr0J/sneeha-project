import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, MoreVertical, Megaphone, ChevronRight, Plus } from 'lucide-react';
import { communityService } from '../../services/communityService';

export default function GroupsView() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            const data = await communityService.getGroups();
            setGroups(data || []);
        } catch (error) {
            console.error('Failed to load groups:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', padding: '0', paddingTop: '40px' }}>
            {/* Header with Search */}
            <div style={{
                padding: '16px 20px',
                background: 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--input-bg)',
                position: 'sticky',
                top: '140px',
                zIndex: 10
            }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Communities</h2>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--primary)', alignItems: 'center' }}>
                    {isSearching ? (
                        <input
                            autoFocus
                            placeholder="Filter groups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => !searchQuery && setIsSearching(false)}
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'var(--input-bg)',
                                padding: '8px 15px',
                                borderRadius: '10px',
                                width: '150px',
                                fontSize: '14px',
                                color: 'var(--primary)',
                                fontWeight: '600'
                            }}
                        />
                    ) : (
                        <Search size={22} onClick={() => setIsSearching(true)} style={{ cursor: 'pointer' }} />
                    )}
                    <MoreVertical size={22} />
                </div>
            </div>

            {/* New Community Action */}
            <div className="interactive-row" style={{
                padding: '16px 20px',
                background: 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--input-bg)',
                transition: 'all 0.2s ease'
            }} onClick={() => alert('Feature coming soon!')}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--input-bg)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <Users size={24} color="#666" />
                    <div style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        background: '#56247E',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #fff'
                    }}>
                        <Plus size={12} color="#fff" />
                    </div>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary)' }}>New community</span>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="loading-spinner"></div>
                    <p style={{ color: '#666', marginTop: '12px' }}>Loading communities...</p>
                </div>
            ) : (
                <div style={{ background: 'var(--card-bg)' }}>
                    {groups
                        .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((group) => (
                            <CommunityRow key={group.id} group={group} />
                        ))}
                </div>
            )}
        </div>
    );
}

function CommunityRow({ group }) {
    const navigate = useNavigate();

    return (
        <div style={{ borderBottom: '8px solid var(--input-bg)' }}>
            {/* Community Main Header */}
            <div style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderBottom: '1px solid var(--input-bg)'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#56247E20',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                }}>
                    <Users size={24} color="#56247E" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{group.name}</h3>
            </div>

            {/* Sub-items */}
            <div>
                <CommunitySubItem
                    icon={<Megaphone size={20} color="#56247E" />}
                    title="Announcements"
                    subtitle={`${group.name.split(' ')[0]} : Reminder!! Our Physical ...`}
                    onClick={() => navigate(`/community/${group.id}/announcements`)}
                />
                <CommunitySubItem
                    icon={<Users size={20} color="#56247E" />}
                    title="Program Schedule"
                    subtitle={`${group.name.split(' ')[0]} : Reminder!! Our Physical ...`}
                    onClick={() => navigate(`/community/${group.id}/schedule`)}
                />
                <div className="interactive-row" style={{
                    padding: '12px 20px 12px 84px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#56247E',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderRadius: '8px',
                    margin: '4px 20px'
                }} onClick={() => navigate(`/community/${group.id}/all`)}>
                    <ChevronRight size={18} />
                    View all
                </div>
            </div>
        </div>
    );
}

function CommunitySubItem({ icon, title, subtitle, onClick }) {
    return (
        <div
            className="community-sub-item interactive-row"
            style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
            onClick={onClick || (() => alert(`${title} clicked`))}
        >
            <div style={{
                width: '48px',
                height: '48px',
                background: '#56247E08',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                {icon}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)', margin: '0 0 4px 0' }}>{title}</h4>
                <p style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
}
