import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Welcome() {
    const navigate = useNavigate();

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
            {/* Background Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: 'var(--primary)',
                filter: 'blur(100px)',
                opacity: 0.2,
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-10%',
                width: '300px',
                height: '300px',
                background: 'var(--accent)',
                filter: 'blur(100px)',
                opacity: 0.15,
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Top Badge */}
            <div style={{
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
                zIndex: 1
            }}>
                <Sparkles size={14} />
                SRI LANKA'S PREMIER WELLNESS APP
            </div>

            {/* Main Content */}
            <div style={{ textAlign: 'center', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="logo-container" style={{ marginBottom: '40px' }}>
                    <img src={logo} alt="Sneha Logo" className="logo-animate" style={{ width: '220px', height: '220px', objectFit: 'contain' }} />
                </div>
                <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-1px' }}>
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
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto', lineHeight: '1.5', opacity: 0.8 }}>
                    Find peace, support, and community on your journey to wellness.
                </p>
            </div>

            {/* Bottom Actions */}
            <div style={{ width: '100%', maxWidth: '350px', zIndex: 1 }}>
                <button
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
                        marginBottom: '20px'
                    }}
                >
                    Get Started
                    <ChevronRight size={22} />
                </button>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                    Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'var(--primary-light)', fontWeight: '700', cursor: 'pointer' }}>Sign In</span>
                </p>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <span onClick={() => navigate('/home')} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>Explore our features</span>
                </div>
            </div>
        </div>
    );
}
