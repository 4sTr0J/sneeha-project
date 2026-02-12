import { useState } from 'react';
import { Search, MoreVertical, Edit, FileText, UserPlus, Filter, Check } from 'lucide-react';

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

    return (
        <div style={{
            display: 'flex',
            height: 'calc(100vh - 140px)',
            background: 'var(--card-bg)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--input-bg)'
        }}>
            {/* Left Sidebar */}
            <div style={{
                width: '400px',
                borderRight: '1px solid var(--input-bg)',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--card-bg)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>Chats</h2>
                    <div style={{ display: 'flex', gap: '20px', color: 'var(--text-main)' }}>
                        <div
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                cursor: 'pointer',
                                color: isEditing ? 'var(--primary)' : 'inherit',
                                background: isEditing ? 'rgba(109, 40, 217, 0.1)' : 'transparent',
                                borderRadius: '8px',
                                padding: '4px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Edit size={22} />
                        </div>
                        <MoreVertical size={22} style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                {/* Search */}
                {!isEditing && (
                    <div style={{ padding: '0 20px 10px' }}>
                        <div style={{
                            background: 'var(--input-bg)',
                            borderRadius: '20px',
                            padding: '10px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <Search size={18} color="var(--text-muted)" />
                            <input
                                placeholder="Search or start a new chat"
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
                    </div>
                )}

                {/* Filters */}
                {!isEditing && (
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        padding: '10px 20px',
                        overflowX: 'auto',
                        scrollbarWidth: 'none'
                    }}>
                        <FilterToken label="All" active />
                        <FilterToken label="Unread" />
                        <FilterToken label="Favourites" />
                        <FilterToken label="Groups" />
                    </div>
                )}

                {/* Editing Actions Bar */}
                {isEditing && (
                    <div style={{
                        padding: '10px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'var(--input-bg)',
                        margin: '0 20px 10px',
                        borderRadius: '12px'
                    }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>
                            {selectedChats.length} Selected
                        </span>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button style={{ border: 'none', background: 'none', color: '#EF4444', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                            <button style={{ border: 'none', background: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Archive</button>
                        </div>
                    </div>
                )}

                {/* Chat List */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className="interactive-row"
                            onClick={() => {
                                if (isEditing) {
                                    toggleSelection(chat.id);
                                }
                            }}
                            style={{
                                display: 'flex',
                                gap: '15px',
                                padding: '12px 20px',
                                cursor: 'pointer',
                                alignItems: 'center',
                                background: selectedChats.includes(chat.id) ? 'rgba(109, 40, 217, 0.05)' : 'transparent'
                            }}
                        >
                            {isEditing && (
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '6px',
                                    border: selectedChats.includes(chat.id) ? 'none' : '2px solid #E5E7EB',
                                    background: selectedChats.includes(chat.id) ? 'var(--primary)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}>
                                    {selectedChats.includes(chat.id) && <Check size={14} color="white" />}
                                </div>
                            )}

                            <img src={chat.img} alt={chat.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div style={{ flex: 1, borderBottom: '1px solid var(--input-bg)', paddingBottom: '12px', minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: 'var(--text-main)',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{chat.name}</h3>
                                    <span style={{ fontSize: '12px', color: chat.unread ? '#22C55E' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{chat.time}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-muted)',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '240px'
                                    }}>{chat.msg}</p>
                                    {chat.unread && !isEditing && (
                                        <div style={{
                                            background: '#22C55E',
                                            color: '#000',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            borderRadius: '50%',
                                            minWidth: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '2px'
                                        }}>
                                            {chat.unread}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Main Area (Empty State) */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                background: 'var(--page-bg)'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <ActionButton icon={<FileText size={24} />} label="Send document" />
                    <ActionButton icon={<UserPlus size={24} />} label="Add contact" />
                </div>
            </div>
        </div>
    );
}

function FilterToken({ label, active }) {
    return (
        <button style={{
            background: active ? '#2D3436' : 'var(--input-bg)',
            color: active ? '#22C55E' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
        }}>
            {label}
        </button>
    );
}

function ActionButton({ icon, label }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
        }}>
            <div style={{
                width: '64px',
                height: '64px',
                background: '#353b44',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9CA3AF'
            }}>
                {icon}
            </div>
            <span style={{ color: '#9CA3AF', fontSize: '14px' }}>{label}</span>
        </div>
    );
}
