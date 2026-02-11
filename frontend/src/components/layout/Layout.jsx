import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';

export default function Layout() {
    const { user } = useAuth();
    const location = useLocation();
    const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="app-layout">
            <Header />

            <main className="main-content" style={{ paddingTop: location.pathname.includes('/community') ? '100px' : '100px' }}>
                <Outlet />
            </main>
        </div>
    );
}
