import { useState, useEffect } from 'react';
import {
    X, Play, Pause, SkipForward, SkipBack,
    Repeat, Shuffle, Heart, Settings,
    MoreVertical, ChevronLeft, ListMusic, Volume2, Share2
} from 'lucide-react';
import natureBg from '../../assets/nature_meditation.png';

export default function MusicPlayerOverlay({
    track,
    isPlaying,
    onTogglePlay,
    onClose,
    isFavorite,
    onFavorite,
    audioProgress,
    onSeek,
    duration
}) {
    if (!track) return null;

    // Format time (seconds to MM:SS)
    const formatTime = (time) => {
        if (isNaN(time) || time === Infinity) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentTime = audioProgress * duration;
    const remainingTime = duration - currentTime;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0',
                color: 'white',
                background: `linear-gradient(180deg, rgba(15, 40, 71, 0.95) 0%, rgba(0, 0, 0, 1) 100%)`,
                backdropFilter: 'blur(60px)',
                fontFamily: "'Inter', sans-serif",
                overflow: 'hidden',
                boxShadow: 'none',
                borderTop: 'none'
            }}
        >
            {/* Background Image (blurred) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1,
                    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${natureBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(80px) brightness(0.7)',
                    transform: 'scale(1.5)'
                }}
            />

            <div
                style={{
                    width: '100%',
                    maxWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    zIndex: 1
                }}
            >


                {/* Header */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', position: 'relative', zIndex: 10, padding: '20px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            opacity: 0.8,
                            cursor: 'pointer',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <ChevronLeft size={32} strokeWidth={2.5} />
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            opacity: 0.5,
                            marginBottom: '4px',
                            color: 'white'
                        }}>Now Playing</p>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: '800',
                            letterSpacing: '-0.01em',
                            color: 'white'
                        }}>Sneha Healing Audio</p>
                    </div>

                    <button style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        opacity: 0.8,
                        cursor: 'pointer',
                        padding: '12px'
                    }}>
                        <MoreVertical size={28} />
                    </button>
                </div>

                {/* Album Art Container */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '40px', width: '100%', maxWidth: '380px', margin: '0 auto' }}>
                    <div
                        className="album-art-desktop"
                        style={{
                            width: '100%',
                            maxWidth: '420px',
                            aspectRatio: '1/1',
                            borderRadius: '30px',
                            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8)',
                            overflow: 'hidden',
                            marginBottom: '39px',
                            background: `url(${natureBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '1px solid rgba(255,255,255,0.15)',
                            position: 'relative',
                            transition: 'transform 0.5s ease'
                        }}
                    >
                        {/* Visual filter for depth */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))' }} />
                    </div>

                    <div style={{ textAlign: 'center', width: '100%', padding: '0 8px', marginBottom: '4px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '2px', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white' }}>{track.title}</h2>
                        <p style={{ fontSize: '13px', opacity: 0.6, fontWeight: '500', lineHeight: 1.3, maxWidth: '280px', margin: '0 auto', color: 'white' }}>
                            {track.description}
                        </p>
                    </div>
                </div>

                {/* Controls Section */}
                <div style={{ width: '100%', marginBottom: '0', paddingTop: '20px', paddingBottom: '20px' }}>
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '15px', padding: '0 20px', maxWidth: '800px', margin: '0 auto 15px' }}>
                        <div
                            style={{
                                position: 'relative',
                                height: '6px',
                                width: '100%',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percent = Math.max(0, Math.min(1, x / rect.width));
                                onSeek(percent);
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    background: 'white',
                                    borderRadius: '10px',
                                    width: `${(audioProgress || 0) * 100}%`
                                }}
                            ></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', opacity: 0.6 }}>
                            <span>{formatTime(currentTime)}</span>
                            <span>-{formatTime(remainingTime)}</span>
                        </div>
                    </div>

                    {/* Main Playback Bar - Accurate to reference */}
                    <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>

                            {/* Repeat */}
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <Repeat size={18} strokeWidth={2.5} />
                            </button>

                            {/* Playback Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.8, cursor: 'pointer' }}>
                                    <SkipBack size={24} fill="white" strokeWidth={1} />
                                </button>

                                <button
                                    onClick={onTogglePlay}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#0F2847',
                                        border: 'none',
                                        boxShadow: '0 15px 30px rgba(255,255,255,0.1)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" style={{ marginLeft: '4px' }} />}
                                </button>

                                <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.8, cursor: 'pointer' }}>
                                    <SkipForward size={24} fill="white" strokeWidth={1} />
                                </button>
                            </div>

                            {/* Favorite */}
                            <button
                                onClick={onFavorite}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: isFavorite ? '#EF4444' : 'white',
                                    opacity: isFavorite ? 1 : 0.4,
                                    cursor: 'pointer'
                                }}
                            >
                                <Heart size={22} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Bottom Utility Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px 0' }}>
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <Volume2 size={20} strokeWidth={2.5} />
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <ListMusic size={20} strokeWidth={2.5} />
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <Shuffle size={20} strokeWidth={2.5} />
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <Share2 size={20} strokeWidth={2.5} />
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <MoreVertical size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
