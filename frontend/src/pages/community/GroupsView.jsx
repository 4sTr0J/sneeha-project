import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, MoreVertical, Megaphone, ChevronRight, Plus, Send, Smile } from 'lucide-react';
import { communityService } from '../../services/communityService';

export default function GroupsView() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            const data = await communityService.getGroups();
            setGroups(data || []);
            // Auto-select first community
            if (data && data.length > 0) {
                setSelectedCommunity(data[0]);
            }
        } catch (error) {
            console.error('Failed to load groups:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mock chat messages - using community names as keys for better matching
    const getMockMessages = (communityName) => {
        const messagesMap = {
            "Healing Community '25": [
                { id: 1, sender: { name: 'Sarah Johnson', avatar: 'SJ', color: '#6D28D9' }, message: 'Welcome to Healing Community 2025! 🌟', timestamp: '10:30 AM', isOwn: false },
                { id: 2, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Thank you! Happy to be here.', timestamp: '10:32 AM', isOwn: true },
                { id: 3, sender: { name: 'Michael Chen', avatar: 'MC', color: '#8B5CF6' }, message: 'Looking forward to connecting with everyone!', timestamp: '10:35 AM', isOwn: false },
            ],
            "Mental Wellness Circle": [
                { id: 1, sender: { name: 'Dr. Lisa Martinez', avatar: 'LM', color: '#10B981' }, message: 'Remember, mental health is just as important as physical health 💚', timestamp: '9:15 AM', isOwn: false },
                { id: 2, sender: { name: 'James Wilson', avatar: 'JW', color: '#F59E0B' }, message: 'Thank you for creating this safe space!', timestamp: '9:20 AM', isOwn: false },
                { id: 3, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Grateful for this community.', timestamp: '9:25 AM', isOwn: true },
            ],
            "Heart Health Warriors": [
                { id: 1, sender: { name: 'Robert Davis', avatar: 'RD', color: '#EF4444' }, message: 'Just completed my cardio rehab session! Feeling strong 💪', timestamp: 'Yesterday', isOwn: false },
                { id: 2, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'That\'s amazing! Keep it up!', timestamp: 'Yesterday', isOwn: true },
            ],
            "Diabetes Support Network": [
                { id: 1, sender: { name: 'Maria Garcia', avatar: 'MG', color: '#3B82F6' }, message: 'Sharing my favorite low-carb recipe today!', timestamp: '2:30 PM', isOwn: false },
                { id: 2, sender: { name: 'Tom Anderson', avatar: 'TA', color: '#8B5CF6' }, message: 'My A1C levels improved! 🎉', timestamp: '2:45 PM', isOwn: false },
                { id: 3, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Congratulations Tom!', timestamp: '2:50 PM', isOwn: true },
            ],
            "Chronic Pain Relief": [
                { id: 1, sender: { name: 'Jennifer Lee', avatar: 'JL', color: '#F59E0B' }, message: 'Found a new stretching routine that really helps!', timestamp: '11:00 AM', isOwn: false },
                { id: 2, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Would love to try it!', timestamp: '11:05 AM', isOwn: true },
            ],
            "Respiratory Care Community": [
                { id: 1, sender: { name: 'Dr. Alan Cooper', avatar: 'AC', color: '#06B6D4' }, message: 'Reminder: Keep your inhalers handy during seasonal changes!', timestamp: 'Yesterday', isOwn: false },
                { id: 2, sender: { name: 'Emma White', avatar: 'EW', color: '#10B981' }, message: 'Thank you for the reminder, Dr. Cooper!', timestamp: 'Yesterday', isOwn: false },
            ],
            "Autoimmune Alliance": [
                { id: 1, sender: { name: 'Rachel Green', avatar: 'RG', color: '#8B5CF6' }, message: 'Managing flare-ups is challenging, but we\'re in this together! 💜', timestamp: '3:00 PM', isOwn: false },
                { id: 2, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Absolutely! This community is so supportive.', timestamp: '3:10 PM', isOwn: true },
            ],
            "Survivors Circle V1.0": [
                { id: 1, sender: { name: 'Sarah Johnson', avatar: 'SJ', color: '#6D28D9' }, message: 'Welcome everyone to Survivors Circle! 🌟', timestamp: '10:30 AM', isOwn: false },
                { id: 2, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Thank you! Happy to be here.', timestamp: '10:32 AM', isOwn: true },
                { id: 3, sender: { name: 'Michael Chen', avatar: 'MC', color: '#8B5CF6' }, message: 'Looking forward to connecting with everyone!', timestamp: '10:35 AM', isOwn: false },
                { id: 4, sender: { name: 'Emily Davis', avatar: 'ED', color: '#10B981' }, message: 'This is such a supportive community ❤️', timestamp: '11:20 AM', isOwn: false },
            ],
            "Hopeful Horizon": [
                { id: 1, sender: { name: 'Dr. Amanda Lee', avatar: 'AL', color: '#6D28D9' }, message: 'Welcome to Hopeful Horizon! Let\'s support each other.', timestamp: 'Yesterday', isOwn: false },
                { id: 2, sender: { name: 'You', avatar: 'ME', color: '#EC4899' }, message: 'Excited to be part of this journey!', timestamp: 'Yesterday', isOwn: true },
            ]
        };

        return messagesMap[communityName] || [
            { id: 1, sender: { name: 'Community Admin', avatar: 'CA', color: '#6D28D9' }, message: 'Welcome to our community!', timestamp: 'Today', isOwn: false }
        ];
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // TODO: Implement actual message sending
            console.log('Sending message:', messageInput);
            setMessageInput('');
        }
    };

    const filteredGroups = groups.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{
            display: 'flex',
            position: 'fixed',
            top: '160px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            maxWidth: '1400px',
            height: 'calc(100vh - 140px)',
            background: 'var(--page-bg)',
            zIndex: 100,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(109, 40, 217, 0.1)',
            border: '1px solid rgba(109, 40, 217, 0.1)'
        }}>
            {/* LEFT PANEL - Communities List */}
            <div style={{
                width: '400px',
                background: 'var(--card-bg)',
                borderRight: '1px solid var(--input-bg)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header with Search */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid var(--input-bg)',
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#6D28D9', margin: '0 0 16px 0' }}>Communities</h2>

                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                        <input
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px 10px 40px',
                                border: '1px solid var(--input-bg)',
                                borderRadius: '12px',
                                background: 'var(--input-bg)',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* New Community Button */}
                <div
                    className="interactive-row"
                    style={{
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--input-bg)',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => alert('Feature coming soon!')}
                >
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--primary)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Plus size={24} color="#fff" />
                    </div>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)' }}>New community</span>
                </div>

                {/* Communities List */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <p style={{ color: '#666' }}>Loading communities...</p>
                        </div>
                    ) : (
                        filteredGroups.map((group) => (
                            <div
                                key={group.id}
                                className="interactive-row"
                                onClick={() => setSelectedCommunity(group)}
                                style={{
                                    padding: '16px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    background: selectedCommunity?.id === group.id ? 'rgba(109, 40, 217, 0.08)' : 'transparent',
                                    borderLeft: selectedCommunity?.id === group.id ? '4px solid var(--primary)' : '4px solid transparent',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#56247E20',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Users size={24} color="#56247E" />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937', margin: '0 0 4px 0' }}>{group.name}</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#6B7280',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {(() => { const msgs = getMockMessages(group.name); return msgs[msgs.length - 1]?.message || 'No messages yet'; })()}
                                    </p>
                                </div>
                                <span style={{ fontSize: '12px', color: '#9CA3AF', flexShrink: 0 }}>
                                    {group.id === 'group-1' ? '11:20 AM' : 'Yesterday'}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* RIGHT PANEL - Chat Messages */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: '#F8F9FE'
            }}>
                {selectedCommunity ? (
                    <>
                        {/* Chat Header */}
                        <div style={{
                            padding: '20px 30px',
                            background: 'var(--card-bg)',
                            borderBottom: '1px solid var(--input-bg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#56247E20',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Users size={24} color="#56247E" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>{selectedCommunity.name}</h2>
                                    <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                                        {selectedCommunity.memberCount || 256} members
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', color: 'var(--primary)' }}>
                                <Search size={22} style={{ cursor: 'pointer' }} />
                                <MoreVertical size={22} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            {getMockMessages(selectedCommunity.name)?.map((msg) => (
                                <div key={msg.id} style={{
                                    display: 'flex',
                                    justifyContent: msg.isOwn ? 'flex-end' : 'flex-start',
                                    gap: '12px'
                                }}>
                                    {!msg.isOwn && (
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            background: msg.sender.color,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            flexShrink: 0
                                        }}>
                                            {msg.sender.avatar}
                                        </div>
                                    )}
                                    <div style={{ maxWidth: '60%' }}>
                                        {!msg.isOwn && (
                                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                                                {msg.sender.name}
                                            </div>
                                        )}
                                        <div style={{
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            background: msg.isOwn ? 'var(--primary)' : 'white',
                                            color: msg.isOwn ? 'white' : '#1F2937',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                            fontSize: '15px',
                                            lineHeight: '1.5'
                                        }}>
                                            {msg.message}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: 'var(--text-muted)',
                                            marginTop: '4px',
                                            textAlign: msg.isOwn ? 'right' : 'left'
                                        }}>
                                            {msg.timestamp}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div style={{
                            padding: '20px 30px',
                            background: 'var(--card-bg)',
                            borderTop: '1px solid var(--input-bg)',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        }}>
                            <Smile size={24} color="var(--primary)" style={{ cursor: 'pointer', flexShrink: 0 }} />
                            <input
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                style={{
                                    flex: 1,
                                    padding: '14px 18px',
                                    border: '1px solid var(--input-bg)',
                                    borderRadius: '12px',
                                    background: 'var(--input-bg)',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleSendMessage}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'var(--primary)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    flexShrink: 0
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary)'}
                            >
                                <Send size={20} color="white" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <Users size={64} color="var(--primary)" style={{ opacity: 0.3, marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Select a community</h3>
                            <p>Choose a community from the list to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
