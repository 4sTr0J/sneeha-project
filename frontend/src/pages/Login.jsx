import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Facebook, Mail, Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-card-header">
                    <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '32px', display: 'block', marginBottom: '10px' }}>
                        ස්නේහ
                    </Link>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--bg-darker)' }}>Welcome Back</h2>
                    <p style={{ color: '#6B7280', marginTop: '5px' }}>Login to access your safe space</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF' }} />
                            <input
                                type="email"
                                className="input"
                                style={{ paddingLeft: '45px' }}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#9CA3AF' }} />
                            <input
                                type="password"
                                className="input"
                                style={{ paddingLeft: '45px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
                        <a href="#" style={{ color: 'var(--primary)', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>Forgot password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                        Sign In
                    </button>
                </form>

                <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <p style={{ fontSize: '14px', color: '#9CA3AF', position: 'relative' }}>
                        <span style={{ background: '#FFF', padding: '0 10px', position: 'relative', zIndex: 1 }}>Or continue with</span>
                        <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#E5E7EB', zIndex: 0 }}></span>
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', cursor: 'pointer' }}>
                        <Facebook size={20} color="#1877F2" />
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>Facebook</span>
                    </button>
                    <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', cursor: 'pointer' }}>
                        <div style={{ fontWeight: '900', color: '#4285F4', fontSize: '18px' }}>G</div>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>Google</span>
                    </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '35px', color: '#6B7280', fontSize: '14px' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Create one</Link>
                </p>
            </div>
        </div>
    );
}
