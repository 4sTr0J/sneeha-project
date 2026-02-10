import React from 'react';
import { Search, MoreVertical, Camera, ChevronRight } from 'lucide-react';
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

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-main)', minHeight: '100vh', padding: '20px 0 100px', position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>Updates</h1>
                <div style={{ display: 'flex', gap: '20px', color: 'var(--text-main)' }}>
                    <Camera size={22} style={{ cursor: 'pointer' }} />
                    <Search size={22} style={{ cursor: 'pointer' }} />
                    <MoreVertical size={22} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Status Section */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', padding: '0 20px', marginBottom: '15px' }}>Status</h2>
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    overflowX: 'auto',
                    padding: '0 20px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }} className="hide-scrollbar">
                    {statuses.map(status => (
                        <div key={status.id} style={{
                            flex: '0 0 140px',
                            height: '210px',
                            borderRadius: '25px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <img src={status.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                left: '12px',
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                padding: '3px',
                                background: status.isMine ? 'transparent' : '#22C55E', // Green ring for others
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={status.avatar} alt="" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid black' }} />
                                    {status.isMine && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-2px',
                                            right: '-2px',
                                            background: '#22C55E',
                                            borderRadius: '50%',
                                            width: '16px',
                                            height: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid black',
                                            color: 'white',
                                            fontSize: '11px',
                                            fontWeight: '800'
                                        }}>+</div>
                                    )}
                                </div>
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: '12px',
                                left: '12px',
                                right: '12px',
                                color: 'white',
                                fontSize: '15px',
                                fontWeight: '700',
                                textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {status.user}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Channels Section */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)' }}>Channels</h2>
                    <button style={{ background: 'transparent', border: 'none', color: '#22C55E', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Explore <ChevronRight size={18} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 10px' }}>
                    {channels.map(channel => (
                        <div key={channel.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '12px 10px',
                            borderRadius: '15px',
                            cursor: 'pointer'
                        }} className="interactive-row">
                            <img src={channel.icon} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', background: 'white' }} />
                            <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{channel.name}</h4>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{channel.lastUpdate}</span>
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {channel.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
