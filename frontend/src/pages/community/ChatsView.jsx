import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, Edit, FileText, UserPlus, Filter, Check, MessageSquare } from 'lucide-react';

export default function ChatsView() {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedChats, setSelectedChats] = useState([]);

    const toggleSelection = (id) => {
        if (selectedChats.includes(id)) {
            setSelectedChats(selectedChats.filter(chatId => chatId !== id));
        } else {
            setSelectedChats([...selectedChats, id]);
        }
    };

    const chats = [
        { id: 1, name: 'Nuwan Jayasinghe', msg: 'https://www.figma.com/design/Q8MP1hMeh...', time: 'Monday', pin: true, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
        { id: 2, name: 'Tharushi Perera', msg: 'Can we schedule the session for tomorrow?', time: 'Yesterday', pin: true, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        { id: 3, name: 'Dinuka Fernando', msg: 'Thank you for the support!', time: '3:27 pm', unread: 2, img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
        { id: 4, name: 'Sanduni Silva', msg: 'I shared the document with you.', time: '3:26 pm', unread: 17, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
        { id: 5, name: 'Kavishka Rathnayake', msg: 'I will be there at 6pm.', time: '3:21 pm', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop' },
        { id: 6, name: 'Supun Sltc CC', msg: '✓✓ keeytd ynne', time: '3:21 pm', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
        { id: 7, name: '+94 77 857 5224', msg: '✓✓ el el...oka dei aniwa', time: '2:53 pm', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
        { id: 8, name: 'Sir Kamesh TM', msg: 'Naa bn', time: '2:42 pm', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
        { id: 9, name: 'Madam Thilini TM', msg: 'Saloni onari & teni diyana (Kadawat...', time: '2:40 pm', unread: 58, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    ];

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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: 'flex',
                height: 'calc(100vh - 180px)',
                background: 'var(--card-bg)',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '1px solid var(--input-bg)',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
            }}
        >
            {/* Background Decorations */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div className="blob-animate" style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(109, 40, 217, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div className="blob-animate" style={{ position: 'absolute', bottom: '-10%', left: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)', borderRadius: '50%', animationDelay: '-2s' }} />
            </div>

            {/* Left Sidebar */}
            <div style={{
                width: '400px',
                borderRight: '1px solid var(--input-bg)',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--card-bg)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header */}
                <div style={{
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>Chats</h2>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-main)' }}>
                        <motion.button
                            whileHover={{ scale: 1.1, background: 'rgba(109, 40, 217, 0.1)' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                cursor: 'pointer',
                                background: isEditing ? 'rgba(109, 40, 217, 0.1)' : 'transparent',
                                color: isEditing ? 'var(--primary)' : 'inherit',
                                borderRadius: '12px',
                                width: '40px',
                                height: '40px',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Edit size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <MoreVertical size={20} />
                        </motion.button>
                    </div>
                </div>

                {/* Search */}
                <AnimatePresence mode="wait">
                    {!isEditing && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ padding: '0 24px 12px' }}
                        >
                            <div style={{
                                background: 'var(--input-bg)',
                                borderRadius: '16px',
                                padding: '12px 18px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                border: '1px solid transparent'
                            }} className="focus-within-ring">
                                <Search size={18} color="var(--text-muted)" />
                                <input
                                    placeholder="Search chats..."
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        outline: 'none',
                                        width: '100%',
                                        fontSize: '15px',
                                        color: 'var(--text-main)'
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filters */}
                {!isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '0 24px 16px',
                            overflowX: 'auto',
                            scrollbarWidth: 'none'
                        }}
                        className="hide-scrollbar"
                    >
                        <FilterToken label="All" active />
                        <FilterToken label="Unread" />
                        <FilterToken label="Favourites" />
                        <FilterToken label="Groups" />
                    </motion.div>
                )}

                {/* Editing Actions Bar */}
                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
                                padding: '16px 20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'var(--input-bg)',
                                margin: '0 24px 24px',
                                borderRadius: '16px',
                                border: '1px solid rgba(109, 40, 217, 0.1)'
                            }}
                        >
                            <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
                                {selectedChats.length} Selected
                            </span>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ border: 'none', background: 'none', color: '#EF4444', fontWeight: '800', cursor: 'pointer', fontSize: '14px' }}>Delete</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ border: 'none', background: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', fontSize: '14px' }}>Archive</motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Chat List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ flex: 1, overflowY: 'auto' }}
                    className="hide-scrollbar"
                >
                    {chats.map(chat => (
                        <motion.div
                            key={chat.id}
                            variants={itemVariants}
                            whileHover={{ background: 'rgba(109, 40, 217, 0.03)', x: 4 }}
                            onClick={() => {
                                if (isEditing) {
                                    toggleSelection(chat.id);
                                }
                            }}
                            style={{
                                display: 'flex',
                                gap: '16px',
                                padding: '12px 24px',
                                cursor: 'pointer',
                                alignItems: 'center',
                                background: selectedChats.includes(chat.id) ? 'rgba(109, 40, 217, 0.08)' : 'transparent',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            {isEditing && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '8px',
                                        border: selectedChats.includes(chat.id) ? 'none' : '2px solid var(--input-bg)',
                                        background: selectedChats.includes(chat.id) ? 'var(--primary)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {selectedChats.includes(chat.id) && <Check size={16} color="white" strokeWidth={3} />}
                                </motion.div>
                            )}

                            <div style={{ position: 'relative' }}>
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    src={chat.img}
                                    alt={chat.name}
                                    style={{ width: '60px', height: '60px', borderRadius: '20px', objectFit: 'cover', border: '2px solid transparent' }}
                                />
                                {chat.unread && !isEditing && (
                                    <div style={{ position: 'absolute', top: -4, right: -4, width: '12px', height: '12px', background: '#10B981', borderRadius: '50%', border: '2px solid var(--card-bg)' }} />
                                )}
                            </div>
                            <div style={{ flex: 1, paddingBottom: '2px', minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <h3 style={{
                                        fontSize: '17px',
                                        fontWeight: '800',
                                        color: 'var(--text-main)',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{chat.name}</h3>
                                    <span style={{ fontSize: '13px', color: chat.unread ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700' }}>{chat.time}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-muted)',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '220px',
                                        fontWeight: '500'
                                    }}>{chat.msg}</p>
                                    {chat.unread && !isEditing && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            style={{
                                                background: 'var(--primary)',
                                                color: 'white',
                                                fontSize: '11px',
                                                fontWeight: '900',
                                                borderRadius: '8px',
                                                minWidth: '24px',
                                                height: '24px',
                                                padding: '0 6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 12px rgba(109, 40, 217, 0.2)'
                                            }}
                                        >
                                            {chat.unread}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Right Main Area (Empty State) */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px',
                background: 'rgba(255,255,255,0.01)',
                position: 'relative',
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', maxWidth: '400px' }}
                >
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'rgba(109, 40, 217, 0.05)',
                        borderRadius: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px',
                        color: 'var(--primary)'
                    }}>
                        <MessageSquare size={48} />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '16px' }}>Select a chat to start messaging</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6' }}>Choose from your existing conversations or start a new one to connect with your community.</p>
                </motion.div>

                <div style={{ display: 'flex', gap: '24px' }}>
                    <ActionButton icon={<FileText size={28} />} label="Send document" />
                    <ActionButton icon={<UserPlus size={28} />} label="Add contact" />
                </div>
            </div>
        </motion.div>
    );
}

function FilterToken({ label, active }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
                background: active ? 'var(--primary)' : 'var(--input-bg)',
                color: active ? 'white' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '14px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: active ? '0 10px 20px rgba(109, 40, 217, 0.2)' : 'none'
            }}
        >
            {label}
        </motion.button>
    );
}

function ActionButton({ icon, label }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer'
            }}
        >
            <motion.div
                whileHover={{ scale: 1.1, background: 'var(--primary)', color: 'white', boxShadow: '0 20px 40px rgba(109, 40, 217, 0.2)' }}
                style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--card-bg)',
                    borderRadius: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    border: '1px solid var(--input-bg)',
                    transition: 'all 0.3s ease'
                }}
            >
                {icon}
            </motion.div>
            <span style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '700' }}>{label}</span>
        </motion.div>
    );
}


