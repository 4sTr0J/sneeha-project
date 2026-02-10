import React from 'react';
import { X, Maximize, Share2, Info } from 'lucide-react';

export default function VideoPlayerOverlay({
    track,
    onClose
}) {
    if (!track) return null;

    // Extract Video ID for high-quality thumbnail if needed, 
    // though track.imageUrl might already be set.
    const videoId = track.audioUrl.split('/').pop().split('?')[0];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
            padding: '20px',
            color: 'white'
        }}>
            {/* Header / Close button */}
            <div style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                zIndex: 10
            }}>
                <button
                    onClick={onClose}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    <X size={28} />
                </button>
            </div>

            {/* Video Container */}
            <div style={{
                width: '100%',
                maxWidth: '1000px',
                aspectRatio: '16/9',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#000'
            }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`${track.audioUrl}?autoplay=1`}
                    title={track.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 'none' }}
                ></iframe>
            </div>

            {/* Video Info */}
            <div style={{
                marginTop: '30px',
                textAlign: 'center',
                maxWidth: '800px'
            }}>
                <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '10px', background: 'linear-gradient(135deg, #A78BFA, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {track.title}
                </h2>
                <p style={{ fontSize: '16px', opacity: 0.7, lineHeight: '1.6', marginBottom: '25px' }}>
                    {track.description}
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', fontSize: '14px' }}>
                        <Info size={18} />
                        {track.category}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', fontSize: '14px' }}>
                        <Maximize size={18} />
                        Fullscreen
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.6, cursor: 'pointer' }}>
                        <Share2 size={24} />
                    </button>
                </div>
            </div>

            {/* Decorative background element */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                left: '-100px',
                width: '400px',
                height: '400px',
                background: 'rgba(109, 40, 217, 0.2)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                zIndex: -1
            }} />
        </div>
    );
}
