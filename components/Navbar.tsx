"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, ChatDots, UserCircle, GearSix } from '@phosphor-icons/react';
import { clsx } from 'clsx';

export default function Navbar() {
    const pathname = usePathname();

    // Hide on authentication pages
    const hideOnPaths = ['/login', '/register'];
    if (hideOnPaths.includes(pathname)) return null;

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[420px] bg-[#4c1d95] p-2 rounded-[32px] flex justify-around items-center shadow-2xl z-50">
            <NavLink href="/dashboard" icon={<House weight={pathname === '/dashboard' ? 'fill' : 'regular'} size={24} />} label="Home" active={pathname === '/dashboard'} />
            <NavLink href="/chat" icon={<ChatDots weight={pathname === '/chat' ? 'fill' : 'regular'} size={24} />} label="Chat" active={pathname === '/chat'} />
            <NavLink href="/profile" icon={<UserCircle weight={pathname === '/profile' ? 'fill' : 'regular'} size={24} />} label="Profile" active={pathname === '/profile'} />
            <NavLink href="/settings" icon={<GearSix weight={pathname === '/settings' ? 'fill' : 'regular'} size={24} />} label="Settings" active={pathname === '/settings'} />
        </nav>
    );
}

function NavLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link href={href} className={clsx(
            "bottom-nav-item",
            active ? "active" : "inactive"
        )}>
            <div className="p-2 rounded-2xl">
                {icon}
            </div>
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
        </Link>
    );
}

