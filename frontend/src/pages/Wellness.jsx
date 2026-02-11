import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, Search, Video } from 'lucide-react';
import { wellnessService } from '../services/wellnessService';
import MusicPlayerOverlay from '../components/wellness/MusicPlayerOverlay';
import VideoPlayerOverlay from '../components/wellness/VideoPlayerOverlay';
import natureImage from '../assets/nature_meditation.png';

const ASSET_MAP = {};

export default function Wellness() {
    const [content, setContent] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showPlayer, setShowPlayer] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());

    const isVideo = (item) => {
        return item.type === 'video' || (item.audioUrl && (item.audioUrl.includes('youtube.com') || item.audioUrl.includes('youtu.be')));
    };

    useEffect(() => {
        loadContent();

        const audio = audioRef.current;
        const handleTimeUpdate = () => {
            if (audio.duration) {
                setAudioProgress(audio.currentTime / audio.duration);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setAudioProgress(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current.load();
            }
        };
    }, []);

    useEffect(() => {
        loadContent();
    }, [filter]);

    const loadContent = async () => {
        try {
            const filterType = filter === 'all' ? null : filter;
            const data = await wellnessService.getWellnessContent(filterType);
            setContent(data || []);
            const favs = await wellnessService.getFavorites();
            setFavorites(favs.map(f => f.id));
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenPlayer = (item) => {
        if (isVideo(item)) {
            setCurrentTrack(item);
            setShowVideoPlayer(true);
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            return;
        }

        if (currentTrack?.id !== item.id) {
            audioRef.current.pause();
            audioRef.current.src = item.audioUrl;
            setCurrentTrack(item);
            setIsPlaying(false);
            setAudioProgress(0);
        }
        setShowPlayer(true);
    };

    const handlePlay = (item, e) => {
        if (e) e.stopPropagation();

        if (isVideo(item)) {
            handleOpenPlayer(item);
            return;
        }

        if (currentTrack?.id === item.id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
            setShowPlayer(true);
        } else {
            if (item.audioUrl) {
                audioRef.current.pause();
                audioRef.current.src = item.audioUrl;
                audioRef.current.play();
                setCurrentTrack(item);
                setIsPlaying(true);
                setShowPlayer(true);
            }
        }
    };

    const handleSeek = (percent) => {
        if (audioRef.current) {
            audioRef.current.currentTime = percent * audioRef.current.duration;
        }
    };

    const handleFavorite = async (id) => {
        try {
            const result = await wellnessService.toggleFavorite(id);
            if (result.isFavorited) {
                setFavorites(prev => [...prev, id]);
            } else {
                setFavorites(prev => prev.filter(favId => favId !== id));
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    const filters = [
        { value: 'all', label: 'All Resources' },
        { value: 'meditation', label: 'Guided Meditation' },
        { value: 'music', label: 'Healing Music' },
        { value: 'breathing', label: 'Breathing Exercises' },
        { value: 'affirmation', label: 'Daily Affirmations' }
    ];

    const filteredContent = Array.isArray(content) ? content.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--bg-darker)' }}>Wellness Library</h1>
                    <p style={{ color: '#6B7280', fontSize: '18px' }}>Explore curated content to support your mental and physical healing.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className="search-input-wrapper" style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF', zIndex: 1 }} />
                        <input
                            className="input"
                            placeholder="Search library..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '350px', paddingLeft: '45px', marginBottom: 0, position: 'relative', zIndex: 0 }}
                        />
                    </div>
                </div>
            </div>

            {!showPlayer && !showVideoPlayer && (
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '40px',
                    marginTop: '30px',
                    paddingTop: '15px',
                    overflowX: 'auto',
                    paddingBottom: '15px'
                }}>
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`filter-tab ${filter === f.value ? 'active' : ''}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div className="gradient-text" style={{ fontSize: '24px', fontWeight: '700' }}>Preparing your wellness space...</div>
                </div>
            ) : filteredContent.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <h3 style={{ fontSize: '20px', color: '#9CA3AF' }}>No resources found matching your search.</h3>
                </div>
            ) : (
                <div className="pref-grid-desktop">
                    {filteredContent.map((item) => (
                        <WellnessCard
                            key={item.id}
                            item={item}
                            isPaying={currentTrack?.id === item.id && isPlaying}
                            isFavorite={favorites.includes(item.id)}
                            onPlay={(e) => handlePlay(item, e)}
                            onOpen={() => handleOpenPlayer(item)}
                            onFavorite={() => handleFavorite(item.id)}
                            isVideo={isVideo(item)}
                        />
                    ))}
                </div>
            )}

            {showPlayer && (
                <MusicPlayerOverlay
                    track={currentTrack}
                    isPlaying={isPlaying}
                    onTogglePlay={() => handlePlay(currentTrack)}
                    onClose={() => setShowPlayer(false)}
                    isFavorite={favorites.includes(currentTrack?.id)}
                    onFavorite={() => handleFavorite(currentTrack?.id)}
                    audioProgress={audioProgress}
                    onSeek={handleSeek}
                    duration={duration}
                />
            )}

            {showVideoPlayer && (
                <VideoPlayerOverlay
                    track={currentTrack}
                    onClose={() => setShowVideoPlayer(false)}
                />
            )}
        </div>
    );
}

function WellnessCard({ item, isPaying, isFavorite, onPlay, onOpen, onFavorite, isVideo }) {
    const getDisplayImage = () => {
        if (!item.imageUrl) return item.type === 'music' ? natureImage : null;
        if (item.imageUrl.startsWith('http')) return item.imageUrl;
        return ASSET_MAP[item.imageUrl] || natureImage;
    };

    const displayImage = getDisplayImage();

    const getGradient = (title) => {
        const colors = [
            'linear-gradient(135deg, #6D28D9 0%, #EC4899 100%)',
            'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
            'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)'
        ];
        const index = title.length % colors.length;
        return colors[index];
    };

    return (
        <div
            className="desktop-card wellness-card-hover"
            onClick={onOpen}
            style={{
                textAlign: 'left',
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
            }}
        >
            <div style={{ height: '200px', background: 'var(--bg-darker)', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.8,
                    background: displayImage ? `url(${displayImage})` : getGradient(item.title),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}></div>

                <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: isVideo ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    {isVideo && <Video size={12} />}
                    {item.type}
                </div>

                <button
                    className="play-button-hover"
                    onClick={onPlay}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}
                >
                    {isPaying ? <Pause fill="var(--primary)" size={24} /> : (isVideo ? <Play fill="#EF4444" size={24} /> : <Play fill="var(--primary)" size={24} />)}
                </button>
            </div>

            <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--bg-darker)', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6', marginBottom: 'auto', paddingBottom: '20px' }}>
                    {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{
                        background: isVideo ? '#EF4444' : 'var(--primary)',
                        color: 'white',
                        padding: '6px 15px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '800',
                        boxShadow: `0 4px 10px ${isVideo ? 'rgba(239, 68, 68, 0.2)' : 'rgba(109, 40, 217, 0.2)'}`
                    }}>
                        {item.duration || '5:00 min'}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavorite();
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isFavorite ? '#EF4444' : '#64748B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Heart size={24} fill={isFavorite ? '#EF4444' : 'none'} />
                    </button>
                </div>
            </div>
        </div>
    );
}
