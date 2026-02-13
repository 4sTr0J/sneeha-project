import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
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

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="animate-fade-in"
        >
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '40px', color: 'var(--text-main)' }}>Settings</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }} className="settings-grid-layout">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '40px' }} className="settings-container">

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

                        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                            <motion.button
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
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
                            >
                                <LogOut size={20} />
                                Logout
                            </motion.button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ minHeight: '600px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                        <AnimatePresence mode="wait">
                            {activeSection === 'profile' && (
                                <motion.div
                                    key="profile"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', color: 'var(--text-main)' }}>Personal Profile</h2>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                background: 'var(--primary)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '40px',
                                                fontWeight: '800',
                                                color: 'white',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                boxShadow: '0 10px 20px rgba(109, 40, 217, 0.2)'
                                            }}
                                        >
                                            {user?.name?.[0]}
                                            <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.3)', padding: '4px 0', textAlign: 'center', fontSize: '10px' }}>EDIT</div>
                                        </motion.div>
                                        <div>
                                            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>{user?.name}</h3>
                                            <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
                                            <span style={{ fontSize: '12px', background: 'var(--primary-light)15', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: '700', marginTop: '8px', display: 'inline-block' }}>Premium Member</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
                                        <ProfileField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                                        <ProfileField label="Support Type" name="supportType" value={formData.supportType} onChange={handleChange} />
                                        <ProfileField label="Email Address" name="email" value={formData.email} onChange={handleChange} />
                                        <ProfileField label="Joined Date" value="January 2026" disabled />
                                    </div>

                                    <div style={{ marginTop: '40px' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn btn-primary"
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: isSaving ? 0.7 : 1 }}
                                        >
                                            <Save size={18} />
                                            {isSaving ? 'Saving...' : 'Save Profile Changes'}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'security' && (
                                <motion.div
                                    key="security"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', color: 'var(--text-main)' }}>Security & Privacy</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                        <section>
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--text-main)' }}>Authentication</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                <SettingItem
                                                    icon={<Lock size={20} color="var(--primary)" />}
                                                    title="Change Password"
                                                    description="Update your password regularly to keep your account secure"
                                                    action={<button style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Update</button>}
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
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--text-main)' }}>Privacy</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                <SettingItem
                                                    icon={<Eye size={20} color="var(--primary)" />}
                                                    title="Profile Visibility"
                                                    description="Control who can see your activity and profile details"
                                                    action={
                                                        <select
                                                            value={settings.preferences.visibility}
                                                            onChange={(e) => updatePreference('visibility', e.target.value)}
                                                            className="input"
                                                            style={{ padding: '8px 12px', borderRadius: '12px', width: 'auto', marginBottom: 0, fontSize: '14px' }}
                                                        >
                                                            <option>Everyone</option>
                                                            <option>Friends Only</option>
                                                            <option>Private</option>
                                                        </select>
                                                    }
                                                />
                                            </div>
                                        </section>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'notifications' && (
                                <motion.div
                                    key="notifications"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', color: 'var(--text-main)' }}>Notifications</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                        <section>
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--text-main)' }}>General Notifications</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                <SettingItem
                                                    icon={<Mail size={20} color="var(--primary)" />}
                                                    title="Email Notifications"
                                                    description="Receive updates and news via email"
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
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'app' && (
                                <motion.div
                                    key="app"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', color: 'var(--text-main)' }}>App Preferences</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                        <section>
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--text-main)' }}>Appearance</h3>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '20px 25px',
                                                background: 'rgba(255,255,255,0.4)',
                                                borderRadius: '24px',
                                                border: '1px solid rgba(109, 40, 217, 0.05)'
                                            }}>
                                                <div style={{ display: 'flex', gap: '15px' }}>
                                                    <div style={{ background: 'var(--primary-light)20', p: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
                                                        <Moon size={20} color="var(--primary)" />
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-main)' }}>Theme Mode</h4>
                                                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Customize app appearance</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <ThemeButton active={settings.preferences.theme === 'light'} onClick={() => updatePreference('theme', 'light')} icon={<Sun size={16} />} label="Light" />
                                                    <ThemeButton active={settings.preferences.theme === 'dark'} onClick={() => updatePreference('theme', 'dark')} icon={<Moon size={16} />} label="Dark" />
                                                    <ThemeButton active={settings.preferences.theme === 'system'} onClick={() => updatePreference('theme', 'system')} icon={<Monitor size={16} />} label="System" />
                                                </div>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'var(--text-main)' }}>Language</h3>
                                            <SettingItem
                                                icon={<Languages size={20} color="var(--primary)" />}
                                                title="App Language"
                                                description="Choose your preferred language"
                                                action={
                                                    <select
                                                        value={settings.preferences.language}
                                                        onChange={(e) => updatePreference('language', e.target.value)}
                                                        className="input"
                                                        style={{ padding: '8px 12px', borderRadius: '12px', width: 'auto', marginBottom: 0, fontSize: '14px' }}
                                                    >
                                                        <option>English</option>
                                                        <option>Spanish</option>
                                                        <option>French</option>
                                                        <option>German</option>
                                                    </select>
                                                }
                                            />
                                        </section>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SettingsNavButton({ active, onClick, icon, label }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '16px',
                border: 'none',
                background: active ? 'var(--primary)' : 'white',
                color: active ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'left',
                boxShadow: active ? '0 10px 20px rgba(109, 40, 217, 0.2)' : 'none'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{label}</span>
            </div>
            <ChevronRight size={16} style={{ opacity: active ? 1 : 0.4 }} />
        </motion.button>
    );
}

function ProfileField({ label, name, value, onChange, disabled }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
            <input
                className="input"
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={{ marginBottom: 0, borderRadius: '14px' }}
            />
        </motion.div>
    );
}

function SettingItem({ icon, title, description, action }) {
    return (
        <motion.div
            whileHover={{ scale: 1.01, background: 'rgba(255,255,255,0.6)' }}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 25px',
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '24px',
                border: '1px solid rgba(109, 40, 217, 0.05)',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary-light)15', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>{icon}</div>
                <div>
                    <h4 style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-main)', margin: 0 }}>{title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>{description}</p>
                </div>
            </div>
            <div>{action}</div>
        </motion.div>
    );
}

function Toggle({ checked, onChange }) {
    return (
        <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={onChange}
            style={{
                width: '48px',
                height: '26px',
                background: checked ? 'var(--primary)' : '#E5E7EB',
                borderRadius: '20px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            <motion.div
                animate={{ x: checked ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            />
        </motion.div>
    );
}

function ThemeButton({ active, onClick, icon, label }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                border: active ? '2px solid var(--primary)' : '1px solid #E5E7EB',
                background: active ? 'var(--primary-light)15' : 'white',
                color: active ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            {icon} {label}
        </motion.button>
    );
}


