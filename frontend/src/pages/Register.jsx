import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <div className="auth-page" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Dynamic Background Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--primary)',
                    filter: 'blur(120px)',
                    opacity: 0.2,
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--accent)',
                    filter: 'blur(120px)',
                    opacity: 0.15,
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="auth-card"
                style={{ maxWidth: '600px', zIndex: 1 }}
            >
                <div className="auth-card-header">
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="logo-container"
                        >
                            <img src={logo} alt="Sneha Logo" style={{ height: '120px', objectFit: 'contain' }} />
                        </motion.div>
                    </Link>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--bg-darker)' }}>Create Your Account</h2>
                    <p style={{ color: '#6B7280', marginTop: '5px' }}>Start your healing journey with our supportive community</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ marginBottom: '20px' }}
                        >
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
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ marginBottom: '20px' }}
                        >
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
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginBottom: '20px' }}
                    >
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ marginBottom: '30px' }}
                    >
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Support Category</label>
                        <select
                            className="input"
                            style={{ width: '100%', appearance: 'none', background: 'white' }}
                            value={formData.supportType}
                            onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
                        >
                            <option value="Cancer Support">Cancer Support</option>
                            <option value="Chronic Illness">Chronic Illness</option>
                            <option value="Caregiver Support">Caregiver Support</option>
                        </select>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}
                    >
                        <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} required />
                        <label style={{ fontSize: '14px', color: '#6B7280' }}>
                            I agree to the <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Terms of Service</span> and <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Privacy Policy</span>
                        </label>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                        <span>Create Account</span>
                        <ChevronRight size={20} />
                    </motion.button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '35px', color: '#6B7280', fontSize: '14px' }}>
                    Already a member? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
}

