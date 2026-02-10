import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Home, MessageSquare, Heart, Users, LogOut, Phone, Bell, ChevronLeft, Menu } from 'lucide-react';
import { useState } from 'react';
import SlidingPanel from './SlidingPanel';
import SideNav from './SideNav';
import logo from '../../assets/logo.png';

export default function Layout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="app-layout">
            <header className="desktop-nav">
                <div className="nav-container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <div className="logo-container">
                                <img src={logo} alt="Sneha Logo" className="logo-animate" style={{ height: '80px', objectFit: 'contain' }} />
                            </div>
                        </Link>
                    </div>

                    <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                        <NavLink to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
                        <NavLink to="/wellness" icon={<Heart size={20} />} label="Wellness" />

                        <NavLink to="/community" icon={<Users size={20} />} label="Community" />

                        <NavLink to="/chat" icon={<MessageSquare size={20} />} label="AI Support" />
                    </nav>

                    {/* Community Floating Sub-Nav - Moved to fixed position */}
                    {location.pathname.includes('/community') && (
                        <>


                            <div className="floating-nav-pill" style={{
                                position: 'fixed',
                                top: '85px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'white', // Default, overridden by CSS in dark mode
                                padding: '6px 6px',
                                borderRadius: '50px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                display: 'flex',
                                gap: '5px',
                                zIndex: 1000,
                                border: '1px solid #E9D5FF',
                                minWidth: 'max-content'
                            }}>
                                <SubNavLink to="/community/groups" label="Communities" icon={<Users size={18} />} />
                                <SubNavLink to="/community" label="Chats" icon={<MessageSquare size={18} />} exact={true} />
                                <SubNavLink to="/community/calls" label="Calls" icon={<Phone size={18} />} />
                                <SubNavLink to="/community/updates" label="Updates" icon={<Bell size={18} />} />
                            </div>
                        </>
                    )}

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
                </div >
            </header >

            {!isSideNavOpen && !isPanelOpen && (
                <button
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="nav-icon-btn"
                    title="My Day"
                    style={{
                        position: 'fixed',
                        top: '100px',
                        right: '0',
                        transform: isPanelOpen ? 'translateX(-380px) rotate(180deg)' : 'translateX(0) rotate(0deg)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        background: 'var(--primary)',
                        color: 'white',
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '0',
                        borderBottomRightRadius: '0',
                        width: '40px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '-4px 4px 15px rgba(109, 40, 217, 0.25)',
                        zIndex: 1003,
                        paddingLeft: '5px'
                    }}
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
            <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />

            {/* Sub-Nav moved inside header for alignment */}

            < main className="main-content" style={{ paddingTop: location.pathname.includes('/community') ? '160px' : '100px' }
            }>
                <Outlet />
            </main >
        </div >
    );
}

function NavIcon({ icon, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--nav-text-inactive)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.2s'
            }}
            className="nav-icon-hover"
        >
            {icon}
        </button>
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
            padding: '12px 28px',
            borderRadius: '40px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '700',
            color: isActive ? 'var(--nav-text-active)' : 'var(--nav-text-inactive)',
            background: isActive ? 'rgba(109, 40, 217, 0.08)' : 'transparent',
            transition: 'all 0.2s ease',
            boxShadow: 'none'
        }}>
            {icon}
            {label}
        </Link>
    );
}

function NavLink({ to, icon, label }) {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={`nav-link-item ${isActive ? 'active' : ''}`}
        >
            {icon}
            {label}
        </Link>
    );
}
