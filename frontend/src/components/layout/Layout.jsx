import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Home, MessageSquare, Heart, Users, LogOut, Phone, Bell } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Layout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="app-layout">
            <header className="desktop-nav">
                <div className="nav-container">
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <div className="logo-container">
                            <img src={logo} alt="Sneha Logo" className="logo-animate" style={{ height: '100px', objectFit: 'contain' }} />
                        </div>
                    </Link>

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
                                <SubNavLink to="/community/groups" label="Communities" icon={<Users size={14} />} />
                                <SubNavLink to="/community" label="Chats" icon={<MessageSquare size={14} />} exact={true} />
                                <SubNavLink to="/community/calls" label="Calls" icon={<Phone size={14} />} />
                                <SubNavLink to="/community/updates" label="Updates" icon={<Bell size={14} />} />
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
                        <button onClick={logout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} className="hover-scale">
                            <LogOut size={22} />
                        </button>
                    </div>
                </div >
            </header >

            {/* Sub-Nav moved inside header for alignment */}

            < main className="main-content" style={{ paddingTop: location.pathname.includes('/community') ? '120px' : '120px' }
            }>
                <Outlet />
            </main >
        </div >
    );
}

function SubNavLink({ to, label, icon, exact }) {
    const location = useLocation();
    const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

    return (
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '40px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
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
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: isActive ? 'var(--nav-text-active)' : 'var(--nav-text-inactive)',
            fontWeight: isActive ? '800' : '600',
            fontSize: '15px',
            padding: '8px 16px',
            borderRadius: '12px',
            background: isActive ? 'rgba(109, 40, 217, 0.08)' : 'transparent',
            transition: 'all 0.2s'
        }}>
            {icon}
            {label}
        </Link>
    );
}
