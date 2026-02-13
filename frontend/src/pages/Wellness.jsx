import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, Search, Video, Wind, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wellnessService } from '../services/wellnessService';
import MusicPlayerOverlay from '../components/wellness/MusicPlayerOverlay';
import VideoPlayerOverlay from '../components/wellness/VideoPlayerOverlay';
import natureImage from '../assets/nature_meditation.png';
import BreathingOverlay from '../components/wellness/BreathingOverlay';

const ASSET_MAP = {};

const BREATHING_EXERCISES = [
    {
        id: 'b-4-7-8',
        title: '4-7-8 Relaxing Breath',
        description: 'A rhythmic pattern to reduce anxiety and help you sleep. Inhale 4s, Hold 7s, Exhale 8s.',
        type: 'breathing',
        duration: '5 min',
        imageUrl: null,
        color: '#8B5CF6',
        pattern: { inhale: 4000, holdIn: 7000, exhale: 8000, holdOut: 0 }
    },
    {
        id: 'b-box',
        title: 'Box Breathing',
        description: 'Heighten performance and concentration while relieving stress. All phases 4 seconds.',
        type: 'breathing',
        duration: '5 min',
        imageUrl: null,
        color: '#3B82F6',
        pattern: { inhale: 4000, holdIn: 4000, exhale: 4000, holdOut: 4000 }
    },
    {
        id: 'b-coherent',
        title: 'Coherent Breathing',
        description: 'Balance your nervous system with equal inhaling and exhaling (5s each).',
        type: 'breathing',
        duration: '5 min',
        imageUrl: null,
        color: '#10B981',
        pattern: { inhale: 5000, holdIn: 0, exhale: 5000, holdOut: 0 }
    }
];

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
    const [activeExercise, setActiveExercise] = useState(null);
    const [audioProgress, setAudioProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());

    const isVideo = (item) => {
        if (!item) return false;
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
            const fetchedData = await wellnessService.getWellnessContent(filter === 'breathing' ? 'all' : (filter === 'all' ? null : filter));
            setContent(fetchedData || []);

            const favs = await wellnessService.getFavorites();
            setFavorites(favs.map(f => f.id));
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenPlayer = (item) => {
        if (item.type === 'breathing') {
            setActiveExercise(item);
            return;
        }

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

        if (item.type === 'breathing') {
            setActiveExercise(item);
            return;
        }

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
            className="animate-fade-in"
        >
            <motion.div
                variants={itemVariants}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}
            >
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--text-main)' }}>Wellness Library</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Explore curated content to support your mental and physical healing.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="search-input-wrapper"
                        style={{ position: 'relative' }}
                    >
                        <Search size={16} style={{ position: 'absolute', left: '15px', top: '12px', color: '#9CA3AF', zIndex: 1 }} />
                        <input
                            className="input"
                            placeholder="Search library..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '280px', height: '40px', paddingLeft: '40px', marginBottom: 0, position: 'relative', zIndex: 0, fontSize: '14px' }}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '10px', top: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#A1A1AA' }}>
                                <X size={16} />
                            </button>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {!showPlayer && !showVideoPlayer && (
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        gap: '15px',
                        marginBottom: '40px',
                        marginTop: '30px',
                        paddingTop: '15px',
                        overflowX: 'auto',
                        paddingBottom: '15px',
                        scrollbarWidth: 'none'
                    }}
                >
                    {filters.map((f) => (
                        <motion.button
                            key={f.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(f.value)}
                            className={`filter-tab ${filter === f.value ? 'active' : ''}`}
                        >
                            {f.label}
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="gradient-text"
                        style={{ fontSize: '24px', fontWeight: '700' }}
                    >
                        Preparing your wellness space...
                    </motion.div>
                </div>
            ) : (
                <motion.div variants={containerVariants}>
                    {/* Interactive Breathing Exercises */}
                    {(filter === 'all' || filter === 'breathing') && (
                        <motion.div variants={itemVariants} style={{ marginBottom: '50px' }}>
                            <div className="pref-grid-desktop">
                                {BREATHING_EXERCISES.map((item) => (
                                    <BreathingCard
                                        key={item.id}
                                        item={item}
                                        onClick={() => setActiveExercise(item)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Wellness Content Grid */}
                    {filter !== 'breathing' && (
                        <motion.div variants={containerVariants} className="pref-grid-desktop">
                            {filteredContent.length > 0 ? (
                                filteredContent.map((item) => (
                                    <WellnessCard
                                        key={item.id}
                                        item={item}
                                        isPaying={isPlaying && currentTrack?.id === item.id}
                                        isFavorite={favorites.includes(item.id)}
                                        onPlay={(e) => handlePlay(item, e)}
                                        onOpen={() => handleOpenPlayer(item)}
                                        onFavorite={() => handleFavorite(item.id)}
                                        isVideo={isVideo(item)}
                                    />
                                ))
                            ) : (
                                <motion.div
                                    variants={itemVariants}
                                    style={{
                                        gridColumn: '1 / -1',
                                        textAlign: 'center',
                                        padding: '60px 20px',
                                        background: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '24px',
                                        border: '1px dashed #E9D5FF'
                                    }}
                                >
                                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>No resources found</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>We couldn't find any items matching your search or category.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            )}

            <AnimatePresence>
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
            </AnimatePresence>

            <AnimatePresence>
                {showVideoPlayer && (
                    <VideoPlayerOverlay
                        track={currentTrack}
                        onClose={() => setShowVideoPlayer(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeExercise && (
                    <BreathingOverlay
                        exercise={activeExercise}
                        onClose={() => setActiveExercise(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function BreathingCard({ item, onClick }) {
    return (
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ y: -10, boxShadow: `0 20px 40px ${item.color}20` }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="glass-card wellness-card-hover"
            style={{
                padding: '25px',
                background: 'white',
                borderRadius: '24px',
                border: `1px solid ${item.color}30`,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: item.color,
                    opacity: 0.1,
                    filter: 'blur(10px)'
                }}
            />

            <div>
                <motion.div
                    whileHover={{ rotate: 10 }}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '16px',
                        background: `${item.color}20`,
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}
                >
                    <Wind size={24} />
                </motion.div>

                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
                    {item.title}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                    {item.description}
                </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: item.color,
                    background: `${item.color}10`,
                    padding: '6px 12px',
                    borderRadius: '12px'
                }}>
                    {item.duration}
                </span>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: item.color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: `0 4px 12px ${item.color}30`
                    }}
                >
                    <Play size={14} fill="white" /> Start
                </motion.button>
            </div>
        </motion.div>
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
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ y: -10 }}
            className="desktop-card wellness-card-hover"
            onClick={onOpen}
            style={{
                textAlign: 'left',
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
            }}
        >
            <div style={{ height: '180px', background: 'var(--bg-darker)', position: 'relative' }}>
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
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)'
                }}></div>

                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: isVideo ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {isVideo && <Video size={12} />}
                    {item.type}
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="play-button-hover"
                    onClick={onPlay}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        zIndex: 2
                    }}
                >
                    {isPaying ? <Pause fill="var(--primary)" size={22} /> : (isVideo ? <Play fill="#EF4444" size={22} /> : <Play fill="var(--primary)" size={22} />)}
                </motion.button>
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px', lineHeight: '1.3' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: 'auto', paddingBottom: '15px' }}>
                    {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{
                        background: isVideo ? '#EF444415' : 'var(--primary-light)15',
                        color: isVideo ? '#EF4444' : 'var(--primary)',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '800',
                    }}>
                        {item.duration || '5:00 min'}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavorite();
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isFavorite ? '#EF4444' : '#9CA3AF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Heart size={20} fill={isFavorite ? '#EF4444' : 'none'} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

