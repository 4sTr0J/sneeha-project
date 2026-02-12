import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
    User, Shield, Bell, Volume2, Save, ChevronRight, LogOut,
    Lock, Smartphone, Mail, Globe, Moon, Sun, Monitor,
    Languages, Eye, EyeOff, CheckCircle2
} from 'lucide-react';

export default function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        supportType: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    // Initial settings from localStorage or defaults
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('user_settings');
        return saved ? JSON.parse(saved) : {
            notifications: {
                email: true,
                push: true,
                reminders: true,
                dailyQuote: false
            },
            security: {
                twoFactor: false,
                loginAlerts: true
            },
            preferences: {
                theme: 'light',
                language: 'English',
                highContrast: false,
                visibility: 'Everyone'
            }
        };
    });

    // Handle Theme Switching
    useEffect(() => {
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark-mode');
            } else if (theme === 'light') {
                document.documentElement.classList.remove('dark-mode');
            } else if (theme === 'system') {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDark) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
            }
        };

        applyTheme(settings.preferences.theme);
        localStorage.setItem('user_settings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                supportType: user.supportType || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile(formData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const toggleSetting = (category, setting) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: !prev[category][setting]
            }
        }));
    };

    const updatePreference = (key, value) => {
        setSettings(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
    };

    const handleAction = (message) => {
        alert(message);
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '40px', color: 'var(--bg-darker)' }}>Settings</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }} className="settings-grid-layout">
                {/* Responsive Grid Wrapper */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '40px' }} className="settings-container">

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

                        <div style={{ marginTop: '20px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                            <button
                                onClick={logout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '16px 20px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left',
                                    width: '100%',
                                    fontSize: '15px',
                                    fontWeight: '700'
                                }}
                                className="hover-scale"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="glass-card" style={{ minHeight: '600px' }}>
                        {activeSection === 'profile' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px' }}>Personal Profile</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
                                    <div
                                        onClick={() => handleAction('Photo upload coming soon!')}
                                        style={{ width: '100px', height: '100px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: '800', color: 'white', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                                    >
                                        {user?.name?.[0]}
                                        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.3)', padding: '4px 0', textAlign: 'center', fontSize: '10px' }}>EDIT</div>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: '800' }}>{user?.name}</h3>
                                        <p style={{ color: '#6B7280' }}>{user?.email}</p>
                                        <span style={{ fontSize: '12px', background: 'rgba(109, 40, 217, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: '700', marginTop: '8px', display: 'inline-block' }}>Premium Member</span>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px' }}>
                                    <ProfileField
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <ProfileField
                                        label="Support Type"
                                        name="supportType"
                                        value={formData.supportType}
                                        onChange={handleChange}
                                    />
                                    <ProfileField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <ProfileField
                                        label="Joined Date"
                                        value="January 2026"
                                        disabled
                                    />
                                </div>

                                <div style={{ marginTop: '40px' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: isSaving ? 0.7 : 1 }}
                                    >
                                        <Save size={18} />
                                        {isSaving ? 'Saving...' : 'Save Profile Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px' }}>Security & Privacy</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    <section>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--bg-darker)' }}>Authentication</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <SettingItem
                                                icon={<Lock size={20} color="var(--primary)" />}
                                                title="Change Password"
                                                description="Update your password regularly to keep your account secure"
                                                action={<button onClick={() => handleAction('Security link sent to your email!')} style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Update</button>}
                                            />
                                            <SettingItem
                                                icon={<Smartphone size={20} color="var(--primary)" />}
                                                title="Two-Factor Authentication"
                                                description="Add an extra layer of security to your account"
                                                action={<Toggle checked={settings.security.twoFactor} onChange={() => toggleSetting('security', 'twoFactor')} />}
                                            />
                                        </div>
                                    </section>

                                    <section>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--bg-darker)' }}>Privacy</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <SettingItem
                                                icon={<Eye size={20} color="var(--primary)" />}
                                                title="Profile Visibility"
                                                description="Control who can see your activity and profile details"
                                                action={
                                                    <select
                                                        value={settings.preferences.visibility}
                                                        onChange={(e) => updatePreference('visibility', e.target.value)}
                                                        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white' }}
                                                    >
                                                        <option>Everyone</option>
                                                        <option>Friends Only</option>
                                                        <option>Private</option>
                                                    </select>
                                                }
                                            />
                                            <SettingItem
                                                icon={<Shield size={20} color="var(--primary)" />}
                                                title="Data Usage"
                                                description="Manage how your data is used for personalized experiences"
                                                action={<div onClick={() => handleAction('Data management console opening...')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Manage</div>}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notifications' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px' }}>Notifications</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    <section>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--bg-darker)' }}>General Notifications</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <SettingItem
                                                icon={<Mail size={20} color="var(--primary)" />}
                                                title="Email Notifications"
                                                description="Receive updates, news and newsletters via email"
                                                action={<Toggle checked={settings.notifications.email} onChange={() => toggleSetting('notifications', 'email')} />}
                                            />
                                            <SettingItem
                                                icon={<Bell size={20} color="var(--primary)" />}
                                                title="Push Notifications"
                                                description="Receive real-time alerts on your device"
                                                action={<Toggle checked={settings.notifications.push} onChange={() => toggleSetting('notifications', 'push')} />}
                                            />
                                        </div>
                                    </section>

                                    <section>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--bg-darker)' }}>Wellness Reminders</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <SettingItem
                                                icon={<CheckCircle2 size={20} color="var(--primary)" />}
                                                title="Daily Check-in Reminders"
                                                description="Stay on track with your mental wellness goals"
                                                action={<Toggle checked={settings.notifications.reminders} onChange={() => toggleSetting('notifications', 'reminders')} />}
                                            />
                                            <SettingItem
                                                icon={<Monitor size={20} color="var(--primary)" />}
                                                title="Daily Inspirational Quotes"
                                                description="Get a daily dose of motivation"
                                                action={<Toggle checked={settings.notifications.dailyQuote} onChange={() => toggleSetting('notifications', 'dailyQuote')} />}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeSection === 'app' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px' }}>App Preferences</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    <section>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--bg-darker)' }}>Appearance</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '16px 20px',
                                                background: 'rgba(255,255,255,0.4)',
                                                borderRadius: '16px',
                                                border: '1px solid rgba(109, 40, 217, 0.05)'
                                            }}>
                                                <div style={{ display: 'flex', gap: '15px' }}>
                                                    <Moon size={20} color="var(--primary)" />
                                                    <div>
                                                        <h4 style={{ fontWeight: '700', fontSize: '15px' }}>Theme</h4>
                                                        <p style={{ fontSize: '13px', color: '#6B7280' }}>Customize how the app looks</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <ThemeButton active={settings.preferences.theme === 'light'} onClick={() => updatePreference('theme', 'light')} icon={<Sun size={16} />} label="Light" />
                                                    <ThemeButton active={settings.preferences.theme === 'dark'} onClick={() => updatePreference('theme', 'dark')} icon={<Moon size={16} />} label="Dark" />
                                                    <ThemeButton active={settings.preferences.theme === 'system'} onClick={() => updatePreference('theme', 'system')} icon={<Monitor size={16} />} label="System" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--bg-darker)' }}>Language & Accessibility</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <SettingItem
                                                icon={<Languages size={20} color="var(--primary)" />}
                                                title="Language"
                                                description="Choose your preferred language"
                                                action={
                                                    <select
                                                        value={settings.preferences.language}
                                                        onChange={(e) => updatePreference('language', e.target.value)}
                                                        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white' }}
                                                    >
                                                        <option>English</option>
                                                        <option>Spanish</option>
                                                        <option>French</option>
                                                        <option>German</option>
                                                    </select>
                                                }
                                            />
                                            <SettingItem
                                                icon={<Globe size={20} color="var(--primary)" />}
                                                title="Region"
                                                description="Select your geographical region"
                                                action={<span onClick={() => handleAction('Region settings locked to account location.')} style={{ fontWeight: '600', cursor: 'pointer' }}>United States</span>}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
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
            className="hover-scale"
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {icon}
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{label}</span>
            </div>
            <ChevronRight size={16} />
        </button>
    );
}

function ProfileField({ label, name, value, onChange, disabled }) {
    return (
        <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#9CA3AF', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</label>
            <input
                className="input"
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={{ marginBottom: 0 }}
            />
        </div>
    );
}

function SettingItem({ icon, title, description, action }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.4)',
            borderRadius: '16px',
            border: '1px solid rgba(109, 40, 217, 0.05)'
        }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '2px' }}>{icon}</div>
                <div>
                    <h4 style={{ fontWeight: '700', fontSize: '15px', color: 'var(--bg-darker)' }}>{title}</h4>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>{description}</p>
                </div>
            </div>
            <div>{action}</div>
        </div>
    );
}

function Toggle({ checked, onChange }) {
    return (
        <div
            onClick={onChange}
            style={{
                width: '44px',
                height: '24px',
                background: checked ? 'var(--primary)' : '#E5E7EB',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
            }}
        >
            <div style={{
                width: '18px',
                height: '18px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: checked ? '23px' : '3px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
        </div>
    );
}

function ThemeButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: active ? '1px solid var(--primary)' : '1px solid #E5E7EB',
                background: active ? 'rgba(109, 40, 217, 0.1)' : 'white',
                color: active ? 'var(--primary)' : '#6B7280',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
            }}
        >
            {icon} {label}
        </button>
    );
}

