import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Heart, Users, Phone, Bell } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
    const { user } = useAuth();
    const location = useLocation();
    const isCommunityPage = location.pathname.includes('/community');

    return (
        <>
            <header className="desktop-nav">
                <div className="nav-container">
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <div className="logo-container">
                            <img src={logo} alt="Sneha Logo" className="logo-animate" style={{ height: '105px', objectFit: 'contain' }} />
                        </div>
                    </Link>

                    <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                        <NavLink to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
                        <NavLink to="/wellness" icon={<Heart size={20} />} label="Wellness" />
                        <NavLink to="/community" icon={<Users size={20} />} label="Community" />
                        <NavLink to="/chat" icon={<MessageSquare size={20} />} label="AI Support" />
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--bg-darker)' }}>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                background: 'linear-gradient(135deg, var(--primary-light), var(--primary))',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(109, 40, 217, 0.2)'
                            }}>
                                {user?.name?.[0] || 'U'}
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '15px' }}>{user?.name || 'User'}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Community Sub-Navigation Header - Floating Island style */}
            {isCommunityPage && (
                <div className="sub-nav-header" style={{
                    position: 'fixed',
                    top: '90px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'fit-content',
                    maxWidth: '90%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #E9D5FF',
                    borderRadius: '20px',
                    zIndex: 998,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px 10px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%'
                    }}>
                        <SubNavLink to="/community/groups" label="Communities" icon={<Users size={16} />} />
                        <SubNavLink to="/community" label="Chats" icon={<MessageSquare size={16} />} exact={true} />
                        <SubNavLink to="/community/calls" label="Calls" icon={<Phone size={16} />} />
                        <SubNavLink to="/community/updates" label="Updates" icon={<Bell size={16} />} />
                    </div>
                </div>
            )}
        </>
    );
}

function NavLink({ to, icon, label }) {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link to={to} className={`nav-tab ${isActive ? 'active' : ''}`}>
            {icon}
            {label}
        </Link>
    );
}

function SubNavLink({ to, label, icon, exact }) {
    const location = useLocation();
    const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

    return (
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            color: isActive ? 'white' : 'var(--nav-text-inactive)',
            background: isActive ? 'var(--primary)' : 'transparent',
            transition: 'all 0.2s ease',
            boxShadow: isActive ? '0 4px 12px rgba(109, 40, 217, 0.2)' : 'none'
        }}>
            {icon}
            {label}
        </Link>
    );
}
