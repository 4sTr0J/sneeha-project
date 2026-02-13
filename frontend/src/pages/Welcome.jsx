import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Welcome() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, var(--bg-darker) 0%, var(--bg-dark) 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px 20px 80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Dynamic Background Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--primary)',
                    filter: 'blur(120px)',
                    opacity: 0.2,
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--accent)',
                    filter: 'blur(120px)',
                    opacity: 0.15,
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

            {/* Top Badge */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    color: 'var(--primary-light)',
                    fontSize: '12px',
                    fontWeight: '700',
                    zIndex: 1,
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Sparkles size={14} className="animate-pulse" />
                SRI LANKA'S PREMIER WELLNESS APP
            </motion.div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ textAlign: 'center', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <motion.div
                    variants={itemVariants}
                    className="logo-container"
                    style={{ marginBottom: '40px' }}
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img src={logo} alt="Sneha Logo" style={{ width: '220px', height: '220px', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(109, 40, 217, 0.3))' }} />
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-1px' }}
                >
                    ස්නේහ <br />
                    <span style={{
                        background: 'linear-gradient(135deg, #A78BFA, #EC4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        display: 'inline-block'
                    }}>Compassionate</span> <br />
                    Healing
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto', lineHeight: '1.5', opacity: 0.8 }}
                >
                    Find peace, support, and community on your journey to wellness.
                </motion.p>
            </motion.div>

            {/* Bottom Actions */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', maxWidth: '350px', zIndex: 1 }}
            >
                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'var(--primary-light)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/login')}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: '20px',
                        borderRadius: '24px',
                        fontSize: '18px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: '0 10px 30px rgba(109, 40, 217, 0.3)',
                        marginBottom: '20px',
                        transition: 'none' // Disable CSS transition for framer-motion hover
                    }}
                >
                    Get Started
                    <ChevronRight size={22} />
                </motion.button>

                <motion.p
                    variants={itemVariants}
                    style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}
                >
                    Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'var(--primary-light)', fontWeight: '700', cursor: 'pointer' }}>Sign In</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                >
                    <span onClick={() => navigate('/home')} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>Explore our features</span>
                </motion.div>
            </motion.div>
        </div>
    );
}

