import React from 'react';
import { motion } from 'framer-motion';
import { Search, MoreVertical, Camera, ChevronRight, Plus } from 'lucide-react';
import updateYoga from '../../assets/update_yoga.png';
import updateLungs from '../../assets/update_lungs.png';
import updateAyurveda from '../../assets/update_ayurveda.png';
import updateRibbon from '../../assets/update_ribbon.png';
import updateDoctor from '../../assets/update_doctor.png';
import logo from '../../assets/logo.png';

export default function UpdatesView() {
    const statuses = [
        { id: 0, user: "My status", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", image: updateYoga, isMine: true },
        { id: 1, user: "Nipuni", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", image: updateYoga },
        { id: 2, user: "Kusal", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100", image: updateAyurveda },
        { id: 3, user: "Wasuka", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100", image: updateRibbon },
        { id: 4, user: "Nadil", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100", image: updateDoctor },
        { id: 5, user: "Oshan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", image: updateLungs },
    ];

    const channels = [
        { id: 1, name: "Sneha Wellness", lastUpdate: "Yesterday", text: "New meditation tracks added!", icon: logo },
        { id: 2, name: "Support Community", lastUpdate: "2h ago", text: "Join our live session today at 6 PM.", icon: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=100" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
                background: 'var(--card-bg)',
                borderRadius: '32px',
                padding: '24px',
                minHeight: 'calc(100vh - 200px)',
                border: '1px solid var(--input-bg)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
            }}
        >
            {/* Header */}
            <motion.div
                variants={itemVariants}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
            >
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Updates</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: '500', marginTop: '4px' }}>Stay informed with your community feed</p>
                </div>
                <div style={{ display: 'flex', gap: '32px', color: 'var(--text-main)' }}>
                    <motion.div whileHover={{ scale: 1.1, color: 'var(--primary)' }} style={{ cursor: 'pointer' }}><Camera size={24} /></motion.div>
                    <motion.div whileHover={{ scale: 1.1, color: 'var(--primary)' }} style={{ cursor: 'pointer' }}><Search size={24} /></motion.div>
                    <motion.div whileHover={{ scale: 1.1, color: 'var(--primary)' }} style={{ cursor: 'pointer' }}><MoreVertical size={24} /></motion.div>
                </div>
            </motion.div>

            {/* Status Section */}
            <div style={{ marginBottom: '64px' }}>
                <motion.h2
                    variants={itemVariants}
                    style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px' }}
                >
                    Status
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        padding: '10px 0 24px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="hide-scrollbar"
                >
                    {statuses.map((status, idx) => (
                        <motion.div
                            key={status.id}
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: '0 12px 24px rgba(109, 40, 217, 0.15)' }}
                            style={{
                                flex: '0 0 180px',
                                height: '260px',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                border: '1px solid var(--input-bg)'
                            }}
                        >
                            <img src={status.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="zoom-hover" />

                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)'
                            }} />

                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                left: '16px',
                                padding: '2px',
                                borderRadius: '50%',
                                border: status.isMine ? 'none' : '2px solid var(--primary)',
                                background: status.isMine ? 'transparent' : 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={status.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid white' }} />
                                    {status.isMine && (
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                right: '0',
                                                background: 'var(--primary)',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid white',
                                                color: 'white'
                                            }}
                                        >
                                            <Plus size={14} strokeWidth={4} />
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                right: '20px',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '700',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            }}>
                                {status.user}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Channels Section */}
            <motion.div variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>Channels</h2>
                    <motion.button
                        whileHover={{ x: 5, color: 'var(--primary)' }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '15px' }}
                    >
                        Explore More <ChevronRight size={18} />
                    </motion.button>
                </div>

                <motion.div
                    variants={containerVariants}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '20px'
                    }}
                >
                    {channels.map(channel => (
                        <motion.div
                            key={channel.id}
                            variants={itemVariants}
                            whileHover={{ x: 10, background: 'rgba(139, 92, 246, 0.03)' }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '24px',
                                borderRadius: '24px',
                                cursor: 'pointer',
                                border: '1px solid var(--input-bg)',
                                background: 'var(--page-bg)'
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <img src={channel.icon} alt="" style={{ width: '72px', height: '72px', borderRadius: '22px', objectFit: 'cover', background: 'var(--card-bg)', border: '1px solid var(--input-bg)' }} />
                                <div style={{ position: 'absolute', bottom: -5, right: -5, width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '3px solid var(--card-bg)' }}>
                                    <Plus size={14} strokeWidth={3} />
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{channel.name}</h4>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>{channel.lastUpdate}</span>
                                </div>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: 0, fontWeight: '500', lineHeight: '1.5' }}>
                                    {channel.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

