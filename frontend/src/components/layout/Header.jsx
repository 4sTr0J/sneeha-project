import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Heart, Users, Phone, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
    const { user } = useAuth();
    const location = useLocation();
    const isCommunityPage = location.pathname.includes('/community');

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="desktop-nav"
            >
                <div className="nav-container">
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="logo-container"
                        >
                            <img src={logo} alt="Sneha Logo" style={{ height: '105px', objectFit: 'contain' }} />
                        </motion.div>
                    </Link>

                    <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <NavLink to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
                        <NavLink to="/wellness" icon={<Heart size={20} />} label="Wellness" />
                        <NavLink to="/community" icon={<Users size={20} />} label="Community" />
                        <NavLink to="/chat" icon={<MessageSquare size={20} />} label="AI Support" />
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--bg-darker)' }}>
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    style={{
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
                                    }}
                                >
                                    {user?.name?.[0] || 'U'}
                                </motion.div>
                                <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-main)' }}>{user?.name || 'User'}</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            {/* Community Sub-Navigation Header */}
            <AnimatePresence>
                {isCommunityPage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="sub-nav-header"
                        style={{
                            position: 'fixed',
                            top: '90px',
                            left: '50%',
                            width: 'fit-content',
                            maxWidth: '90%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(15px)',
                            border: '1px solid rgba(167, 139, 250, 0.2)',
                            borderRadius: '24px',
                            zIndex: 998,
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '8px 10px',
                            boxShadow: '0 12px 40px rgba(109, 40, 217, 0.1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', width: '100%' }}>
                            <SubNavLink to="/community/groups" label="Communities" icon={<Users size={16} />} />
                            <SubNavLink to="/community" label="Chats" icon={<MessageSquare size={16} />} exact={true} />
                            <SubNavLink to="/community/calls" label="Calls" icon={<Phone size={16} />} />
                            <SubNavLink to="/community/updates" label="Updates" icon={<Bell size={16} />} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ to, icon, label }) {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link to={to} className={`nav-tab ${isActive ? 'active' : ''}`} style={{ position: 'relative' }}>
                {icon}
                {label}
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            height: '2px',
                            background: 'var(--primary)',
                            borderRadius: '2px'
                        }}
                    />
                )}
            </Link>
        </motion.div>
    );
}

function SubNavLink({ to, label, icon, exact }) {
    const location = useLocation();
    const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to={to} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 24px',
                borderRadius: '16px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '700',
                color: isActive ? 'white' : 'var(--nav-text-inactive)',
                background: isActive ? 'var(--primary)' : 'transparent',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 8px 20px rgba(109, 40, 217, 0.2)' : 'none'
            }}>
                {icon}
                {label}
            </Link>
        </motion.div>
    );
}

