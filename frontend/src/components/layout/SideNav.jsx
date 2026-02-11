
import { Sparkles, Video, Wallet, Book, BookOpen, Plus, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideNav({ isOpen, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: <Sparkles size={24} />, path: '/chat', label: 'AI Support' },
        { icon: <Video size={24} />, path: '/community', label: 'Meetups' },
        { icon: <Wallet size={24} />, path: '/subscription', label: 'Subscription' },
        { icon: <Book size={24} />, path: '/wellness', label: 'Resources' },
        { icon: <BookOpen size={24} />, path: '/stories', label: 'Stories' },
        { icon: <Plus size={24} />, path: '/create', label: 'Create' },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`sidenav-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            {/* Side Navigation Bar */}
            <div className={`side-nav ${isOpen ? 'open' : ''}`}>
                <div className="sidenav-header">
                    <button onClick={onClose} className="sidenav-close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="sidenav-items">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <div
                                key={index}
                                className={`sidenav-item ${isActive ? 'active' : ''}`}
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                                title={item.label}
                            >
                                {item.icon}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
