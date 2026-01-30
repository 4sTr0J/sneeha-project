import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Shield, Bell, Volume2, Languages, Save, ChevronRight } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '40px', color: 'var(--bg-darker)' }}>Settings</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
                {/* Side Navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <SettingsNavButton
                        active={activeSection === 'profile'}
                        onClick={() => setActiveSection('profile')}
                        icon={<User size={20} />}
                        label="Personal Profile"
                    />
                    <SettingsNavButton
                        active={activeSection === 'security'}
                        onClick={() => setActiveSection('security')}
                        icon={<Shield size={20} />}
                        label="Security & Privacy"
                    />
                    <SettingsNavButton
                        active={activeSection === 'notifications'}
                        onClick={() => setActiveSection('notifications')}
                        icon={<Bell size={20} />}
                        label="Notifications"
                    />
                    <SettingsNavButton
                        active={activeSection === 'app'}
                        onClick={() => setActiveSection('app')}
                        icon={<Volume2 size={20} />}
                        label="App Preferences"
                    />
                </div>

                {/* Content Area */}
                <div className="glass-card">
                    {activeSection === 'profile' && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
                                <div style={{ width: '100px', height: '100px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: '800', color: 'white' }}>
                                    {user?.name?.[0]}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{user?.name}</h2>
                                    <p style={{ color: '#6B7280' }}>{user?.email}</p>
                                    <button style={{ marginTop: '10px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Change Avatar</button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                <ProfileField label="Full Name" value={user?.name} />
                                <ProfileField label="Support Type" value={user?.supportType} />
                                <ProfileField label="Email" value={user?.email} />
                                <ProfileField label="Joined Date" value="January 2026" />
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Save size={18} />
                                    Save Profile Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection !== 'profile' && (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#E5E7EB' }}>
                                {activeSection.toUpperCase()} SETTINGS COMING SOON
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SettingsNavButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '16px',
                border: 'none',
                background: active ? 'var(--primary)' : 'white',
                color: active ? 'white' : '#6B7280',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {icon}
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{label}</span>
            </div>
            <ChevronRight size={16} />
        </button>
    );
}

function ProfileField({ label, value }) {
    return (
        <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#9CA3AF', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</label>
            <input className="input" defaultValue={value} />
        </div>
    );
}
