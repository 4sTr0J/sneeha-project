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
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 1,
                    paddingBottom: '40px'
                }}
            >
                {/* Header */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10, padding: '20px' }}>
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

                {/* Album Art Container - Even more flexible to protect controls */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '380px',
                    margin: '0 auto',
                    flex: '1',
                    minHeight: '200px',
                    maxHeight: '40vh'
                }}>
                    <div
                        className="album-art-desktop"
                        style={{
                            width: '80%',
                            maxWidth: '280px',
                            aspectRatio: '1/1',
                            borderRadius: '30px',
                            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8)',
                            overflow: 'hidden',
                            marginBottom: '15px',
                            background: `url(${natureBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '1px solid rgba(255,255,255,0.15)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))' }} />
                    </div>

                    <div style={{ textAlign: 'center', width: '100%', padding: '0 8px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '2px', color: 'white' }}>{track.title}</h2>
                        <p style={{ fontSize: '12px', opacity: 0.6, fontWeight: '500', maxWidth: '280px', margin: '0 auto', color: 'white', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {track.description}
                        </p>
                    </div>
                </div>

                {/* Controls Section - docked to bottom with more breathing room */}
                <div style={{ width: '100%', paddingBottom: '30px' }}>
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '20px', padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
                        <div
                            style={{
                                position: 'relative',
                                height: '4px',
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', fontWeight: '800', opacity: 0.5 }}>
                            <span>{formatTime(currentTime)}</span>
                            <span>-{formatTime(remainingTime)}</span>
                        </div>
                    </div>

                    {/* Main Playback Bar */}
                    <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
                            <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.4, cursor: 'pointer' }}>
                                <Repeat size={20} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                                <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.8, cursor: 'pointer' }}>
                                    <SkipBack size={28} fill="white" />
                                </button>

                                <button
                                    onClick={onTogglePlay}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#0F2847',
                                        border: 'none',
                                        boxShadow: '0 10px 25px rgba(255,255,255,0.15)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />}
                                </button>

                                <button style={{ background: 'none', border: 'none', color: 'white', opacity: 0.8, cursor: 'pointer' }}>
                                    <SkipForward size={28} fill="white" />
                                </button>
                            </div>

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
                                <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Bottom Utility Bar - Ensured visibility */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 20px',
                            opacity: 0.6
                        }}>
                            <Volume2 size={20} style={{ cursor: 'pointer' }} />
                            <ListMusic size={20} style={{ cursor: 'pointer' }} />
                            <Shuffle size={20} style={{ cursor: 'pointer' }} />
                            <Share2 size={20} style={{ cursor: 'pointer' }} />
                            <MoreVertical size={20} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
