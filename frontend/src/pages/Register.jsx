import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        supportType: 'Cancer Support'
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card" style={{ maxWidth: '600px' }}>
                <div className="auth-card-header">
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <div className="logo-container">
                            <img src={logo} alt="Sneha Logo" className="logo-animate" style={{ height: '120px', objectFit: 'contain' }} />
                        </div>
                    </Link>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--bg-darker)' }}>Create Your Account</h2>
                    <p style={{ color: '#6B7280', marginTop: '5px' }}>Start your healing journey with our supportive community</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF' }} />
                                <input
                                    type="text"
                                    className="input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF' }} />
                                <input
                                    type="email"
                                    className="input"
                                    style={{ paddingLeft: '45px' }}
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF' }} />
                            <input
                                type="password"
                                className="input"
                                style={{ paddingLeft: '45px' }}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Support Category</label>
                        <select
                            className="input"
                            style={{ width: '100%', appearance: 'none', background: 'white' }}
                            value={formData.supportType}
                            onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
                        >
                            <option value="Cancer Support">Cancer Support1</option>
                            <option value="Chronic Illness">Chronic Illness</option>
                            <option value="Caregiver Support">Caregiver Support</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                        <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} required />
                        <label style={{ fontSize: '14px', color: '#6B7280' }}>
                            I agree to the <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Terms of Service</span> and <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Privacy Policy</span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <span>Create Account</span>
                        <ChevronRight size={20} />
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '35px', color: '#6B7280', fontSize: '14px' }}>
                    Already a member? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
}
