import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, MoreVertical, Megaphone, ChevronRight, Plus, Send, Smile } from 'lucide-react';
import { communityService } from '../../services/communityService';

export default function GroupsView() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            const data = await communityService.getGroups();
            setGroups(data || []);
            if (data && data.length > 0) {
                setSelectedCommunity(data[0]);
            }
        } catch (error) {
            console.error('Failed to load groups:', error);
        } finally {
            setLoading(false);
        }
    };

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
            console.log('Sending message:', messageInput);
            setMessageInput('');
        }
    };

    const filteredGroups = groups.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: 'flex',
                height: 'calc(100vh - 180px)',
                background: 'var(--card-bg)',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '1px solid var(--input-bg)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
            }}
        >
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
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--input-bg)',
                }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)', margin: '0 0 12px 0' }}>Communities</h2>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ position: 'relative' }}
                    >
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 16px 14px 48px',
                                border: '1px solid var(--input-bg)',
                                borderRadius: '16px',
                                background: 'var(--input-bg)',
                                fontSize: '15px',
                                outline: 'none',
                                transition: 'all 0.3s'
                            }}
                            className="focus-ring"
                        />
                    </motion.div>
                </div>

                {/* New Community Button */}
                <motion.div
                    whileHover={{ background: 'rgba(109, 40, 217, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        padding: '12px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--input-bg)',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => alert('Feature coming soon!')}
                >
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--primary)',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 16px rgba(109, 40, 217, 0.2)'
                        }}
                    >
                        <Plus size={24} color="#fff" />
                    </motion.div>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>New community</span>
                </motion.div>

                {/* Communities List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ flex: 1, overflowY: 'auto' }}
                >
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px' }}>
                            <div className="loader" style={{ margin: '0 auto 20px' }}></div>
                            <p style={{ color: 'var(--text-muted)' }}>Loading communities...</p>
                        </div>
                    ) : (
                        filteredGroups.map((group) => (
                            <motion.div
                                key={group.id}
                                variants={itemVariants}
                                whileHover={{ background: 'rgba(109, 40, 217, 0.03)' }}
                                onClick={() => setSelectedCommunity(group)}
                                style={{
                                    padding: '14px 24px',
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
                                    width: '52px',
                                    height: '52px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Users size={26} color="var(--primary)" />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 4px 0' }}>{group.name}</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-muted)',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {(() => { const msgs = getMockMessages(group.name); return msgs[msgs.length - 1]?.message || 'No messages yet'; })()}
                                    </p>
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0, fontWeight: '600' }}>
                                    {group.id === 'group-1' ? '11:20 AM' : 'Yesterday'}
                                </span>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>

            {/* RIGHT PANEL - Chat Messages */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--page-bg)'
            }}>
                <AnimatePresence mode="wait">
                    {selectedCommunity ? (
                        <motion.div
                            key={selectedCommunity.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Chat Header */}
                            <div style={{
                                padding: '12px 32px',
                                background: 'var(--card-bg)',
                                borderBottom: '1px solid var(--input-bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        style={{
                                            width: '52px',
                                            height: '52px',
                                            background: 'rgba(139, 92, 246, 0.1)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Users size={28} color="var(--primary)" />
                                    </motion.div>
                                    <div>
                                        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{selectedCommunity.name}</h2>
                                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                                            {selectedCommunity.memberCount || 256} members
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '20px', color: 'var(--primary)' }}>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Search size={24} style={{ cursor: 'pointer' }} />
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <MoreVertical size={24} style={{ cursor: 'pointer' }} />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '20px 32px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <AnimatePresence initial={false}>
                                    {getMockMessages(selectedCommunity.name)?.map((msg, idx) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: msg.isOwn ? 'flex-end' : 'flex-start',
                                                gap: '14px'
                                            }}
                                        >
                                            {!msg.isOwn && (
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        background: msg.sender.color,
                                                        borderRadius: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontSize: '13px',
                                                        fontWeight: '800',
                                                        flexShrink: 0,
                                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                                    }}
                                                >
                                                    {msg.sender.avatar}
                                                </motion.div>
                                            )}
                                            <div style={{ maxWidth: '65%' }}>
                                                {!msg.isOwn && (
                                                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', marginLeft: '2px' }}>
                                                        {msg.sender.name}
                                                    </div>
                                                )}
                                                <motion.div
                                                    layout
                                                    style={{
                                                        padding: '10px 16px',
                                                        borderRadius: msg.isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                        background: msg.isOwn ? 'var(--primary)' : 'var(--card-bg)',
                                                        color: msg.isOwn ? 'white' : 'var(--text-main)',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                                        fontSize: '15px',
                                                        lineHeight: '1.5',
                                                        border: msg.isOwn ? 'none' : '1px solid var(--input-bg)'
                                                    }}
                                                >
                                                    {msg.message}
                                                </motion.div>
                                                <div style={{
                                                    fontSize: '11px',
                                                    color: 'var(--text-muted)',
                                                    marginTop: '6px',
                                                    textAlign: msg.isOwn ? 'right' : 'left',
                                                    fontWeight: '600'
                                                }}>
                                                    {msg.timestamp}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Message Input */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                style={{
                                    padding: '24px 32px',
                                    background: 'var(--card-bg)',
                                    borderTop: '1px solid var(--input-bg)',
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'center'
                                }}
                            >
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Smile size={26} color="var(--primary)" style={{ cursor: 'pointer', flexShrink: 0 }} />
                                </motion.div>
                                <input
                                    placeholder="Type a message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    style={{
                                        flex: 1,
                                        padding: '16px 20px',
                                        border: '1px solid var(--input-bg)',
                                        borderRadius: '16px',
                                        background: 'var(--input-bg)',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    className="focus-ring"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05, background: 'var(--primary-light)' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSendMessage}
                                    style={{
                                        width: '52px',
                                        height: '52px',
                                        background: 'var(--primary)',
                                        border: 'none',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        flexShrink: 0,
                                        boxShadow: '0 8px 16px rgba(109, 40, 217, 0.2)'
                                    }}
                                >
                                    <Send size={22} color="white" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Users size={80} color="var(--primary)" style={{ opacity: 0.2, marginBottom: '24px' }} />
                                </motion.div>
                                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-main)' }}>Select a community</h3>
                                <p style={{ fontSize: '16px' }}>Choose a community from the list to start chatting</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

