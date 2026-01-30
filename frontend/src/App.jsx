import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Wellness from './pages/Wellness'
import Chat from './pages/Chat'
import Community from './pages/Community'

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />
                <Route path="chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            </Route>
        </Routes>
    )
}

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'var(--bg-darker)'
            }}>
                <div className="gradient-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Loading...
                </div>
            </div>
        )
    }

    return user ? children : <Navigate to="/login" replace />
}

export default App
