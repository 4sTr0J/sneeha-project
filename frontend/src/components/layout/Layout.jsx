import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Home, MessageSquare, Heart, Users, LogOut } from 'lucide-react';
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
                        <img src={logo} alt="Sneha Logo" style={{ height: '60px', objectFit: 'contain' }} />
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
                        <button onClick={logout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} className="hover-scale">
                            <LogOut size={22} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

function NavLink({ to, icon, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: isActive ? 'var(--primary)' : '#64748b',
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
