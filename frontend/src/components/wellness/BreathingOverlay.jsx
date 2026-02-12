import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RefreshCw, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BreathingOverlay({ exercise, onClose }) {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('ready'); // ready, inhale, holdIn, exhale, holdOut
    const [instruction, setInstruction] = useState('Press Play to Start');
    const [progress, setProgress] = useState(0); // 0 to 1 scale for circle size
    const [cycles, setCycles] = useState(0);
    const timerRef = useRef(null);

    const { pattern, name, description, color } = exercise;
    // pattern example: { inhale: 4000, holdIn: 7000, exhale: 8000, holdOut: 0 }

    const activeRef = useRef(false);

    useEffect(() => {
        return () => stopExercise();
    }, []);

    const startExercise = () => {
        setIsActive(true);
        activeRef.current = true;
        setCycles(0);
        runPhase('inhale');
    };

    const stopExercise = () => {
        setIsActive(false);
        activeRef.current = false;
        setPhase('ready');
        setInstruction('Press Play to Start');
        setProgress(0);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const runPhase = (currentPhase) => {
        // We must Check ref here because this function is called via setTimeout from a stale closure
        if (!activeRef.current && currentPhase !== 'inhale') return;

        setPhase(currentPhase);

        let duration = 0;
        let nextPhase = '';

        switch (currentPhase) {
            case 'inhale':
                duration = pattern.inhale;
                setInstruction('Inhale...');
                nextPhase = pattern.holdIn > 0 ? 'holdIn' : 'exhale';
                break;
            case 'holdIn':
                duration = pattern.holdIn;
                setInstruction('Hold...');
                nextPhase = 'exhale';
                break;
            case 'exhale':
                duration = pattern.exhale;
                setInstruction('Exhale...');
                nextPhase = pattern.holdOut > 0 ? 'holdOut' : 'inhale';
                break;
            case 'holdOut':
                duration = pattern.holdOut;
                setInstruction('Hold...');
                nextPhase = 'inhale';
                break;
            default:
                break;
        }

        // Cycle counting
        if (currentPhase === 'inhale') {
            setCycles(c => c + 1);
        }

        timerRef.current = setTimeout(() => {
            runPhase(nextPhase);
        }, duration);
    };

    const togglePlay = () => {
        if (isActive) {
            stopExercise();
        } else {
            startExercise();
        }
    };

    // Calculate animation properties based on phase
    const getTransition = () => {
        let duration = 0;
        switch (phase) {
            case 'inhale': duration = pattern.inhale / 1000; break;
            case 'holdIn': duration = pattern.holdIn / 1000; break;
            case 'exhale': duration = pattern.exhale / 1000; break;
            case 'holdOut': duration = pattern.holdOut / 1000; break;
            default: duration = 0.8;
        }
        // Using "easeInOut" for more natural, organic movement
        return {
            duration: duration,
            ease: "easeInOut",
            // Optimization for high refresh rate displays (120fps+)
            velocity: 2
        };
    };

    const getScale = () => {
        switch (phase) {
            case 'inhale': return 1.5;
            case 'holdIn': return 1.5;
            case 'exhale': return 1;
            case 'holdOut': return 1;
            default: return 1;
        }
    };

    const getOpacity = () => {
        switch (phase) {
            case 'inhale': return 0.8;
            case 'holdIn': return 0.8;
            case 'exhale': return 0.4;
            case 'holdOut': return 0.4;
            default: return 0.3;
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F5F3FF 100%)',
                backdropFilter: 'blur(30px)',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--bg-darker)',
                overflow: 'hidden'
            }}
        >
            {/* Decorative Background Bubbles */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.03, filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', background: color, opacity: 0.05, filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', top: '40%', right: '20%', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--secondary)', opacity: 0.04, filter: 'blur(50px)' }} />

            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    background: 'white',
                    border: '1px solid rgba(109, 40, 217, 0.1)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    color: '#64748B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                    e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                    e.currentTarget.style.color = '#64748B';
                }}
            >
                <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px', color: 'var(--bg-darker)', letterSpacing: '-0.5px' }}>{name}</h2>
                <div style={{ width: '40px', height: '3px', background: color, margin: '0 auto 15px', borderRadius: '2px', opacity: 0.5 }} />
                <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '450px', margin: '0 auto', lineHeight: '1.6' }}>
                    {description}
                </p>
            </div>

            <div style={{
                position: 'relative',
                width: '340px',
                height: '340px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '60px',
            }}>
                {/* Multi-layered Outer Rings */}
                <div style={{ position: 'absolute', width: '340px', height: '340px', borderRadius: '50%', border: '1px solid rgba(109, 40, 217, 0.05)', willChange: 'transform' }} />
                <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(109, 40, 217, 0.08)', willChange: 'transform' }} />

                {/* Guide Circle (Dashed) */}
                <div style={{
                    position: 'absolute',
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    border: `2px dashed ${color}`,
                    opacity: 0.15,
                    willChange: 'transform'
                }} />

                {/* Main Animated Circle */}
                <motion.div
                    animate={{
                        scale: getScale(),
                        opacity: getOpacity(),
                        boxShadow: isActive ? `0 0 80px ${color}30` : `0 0 20px ${color}10`
                    }}
                    transition={getTransition()}
                    style={{
                        position: 'absolute',
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        willChange: 'transform' // Lock to 120fps via GPU layer
                    }}
                >
                    <Wind size={44} color="white" opacity={0.6} />
                </motion.div>

                {/* Internal Glow for Circle */}
                <motion.div
                    animate={{ scale: getScale() * 0.85 }}
                    transition={getTransition()}
                    style={{
                        position: 'absolute',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: 'white',
                        opacity: 0.05,
                        filter: 'blur(40px)',
                        zIndex: 1,
                        willChange: 'transform'
                    }}
                />

                {/* Instruction Text below circle */}
                <div style={{ position: 'absolute', bottom: '-45px', width: '100%', textAlign: 'center' }}>
                    <motion.div
                        key={instruction}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '22px', fontWeight: '800', color: 'var(--bg-darker)', letterSpacing: '-0.5px' }}
                    >
                        {instruction}
                    </motion.div>
                </div>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <button
                    onClick={togglePlay}
                    style={{
                        background: 'white',
                        color: 'var(--primary)',
                        border: '2px solid rgba(109, 40, 217, 0.1)',
                        borderRadius: '16px',
                        padding: '12px 32px',
                        fontSize: '16px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 8px 20px rgba(109, 40, 217, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.border = '2px solid rgba(109, 40, 217, 0.3)';
                        e.currentTarget.style.boxShadow = '0 12px 25px rgba(109, 40, 217, 0.12)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.border = '2px solid rgba(109, 40, 217, 0.1)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(109, 40, 217, 0.08)';
                    }}
                >
                    {isActive ? <><Pause size={18} fill="var(--primary)" /> Pause</> : <><Play size={18} fill="var(--primary)" /> Start Session</>}
                </button>

                {isActive ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        style={{ fontSize: '14px', fontWeight: '700', color: '#64748B' }}
                    >
                        Cycle {cycles} in progress
                    </motion.div>
                ) : (
                    <div style={{ height: '21px' }} />
                )}
            </div>
        </motion.div>
    );
}

