import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, MessageSquare, Shield, ChevronRight, Play } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Home() {
    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--bg-darker) 0%, var(--bg-dark) 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden'
        }}>

            {/* Hero Section */}
            <main style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 80px 120px'
            }}>
                <div style={{
                    maxWidth: '1300px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '55% 45%',
                    gap: '60px',
                    alignItems: 'center'
                }}>
                    <div style={{ zIndex: 2, transform: 'translateY(-120px)' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(139, 92, 246, 0.1)',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            color: 'var(--primary-light)',
                            fontSize: '14px',
                            fontWeight: '700',
                            marginBottom: '30px'
                        }}>
                            <Sparkles size={16} />
                            SRI LANKA'S #1 SUPPORT PLATFORM
                        </div>
                        <h1 style={{ fontSize: '80px', fontWeight: '900', lineHeight: '1.05', marginBottom: '30px', letterSpacing: '-2px' }}>
                            Healing through <br />
                            <span style={{
                                background: 'linear-gradient(135deg, #A78BFA, #EC4899)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block'
                            }}>Compassion</span>
                        </h1>
                        <p style={{ fontSize: '22px', color: 'var(--text-secondary)', marginBottom: '45px', lineHeight: '1.6', maxWidth: '600px', opacity: 0.9 }}>
                            Empowering patients and caregivers with dedicated support groups,
                            AI healing companions, and curated wellness resources.
                        </p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {/* Buttons removed as per user request */}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', transform: 'translateY(-120px)' }}>
                        {/* Logo Visual (Hexagon & Glow removed) */}
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div className="logo-container" style={{ display: 'inline-block' }}>
                                    <img src={logo} alt="Sneha Main Logo" style={{ width: '600px', transition: 'transform 0.5s ease' }} className="hover-scale-subtle" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Section */}
            <section style={{
                padding: '100px 80px',
                background: 'rgba(0,0,0,0.2)',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                    <FeatureBox icon={<Sparkles size={32} />} title="AI Compassion" desc="24/7 Emotional Support" />
                    <FeatureBox icon={<Heart size={32} />} title="Music Healing" desc="Soundscapes for Peace" />
                    <FeatureBox icon={<MessageSquare size={32} />} title="Peer Groups" desc="Shared Journey Support" />
                    <FeatureBox icon={<Shield size={32} />} title="Safe & Private" desc="End-to-End Encryption" />
                </div>
            </section>
        </div>
    );
}

function FeatureBox({ icon, title, desc }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.1))',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-light)',
                margin: '0 auto 25px',
                border: '1px solid rgba(139,92,246,0.1)'
            }}>{icon}</div>
            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{title}</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{desc}</p>
        </div>
    );
}
