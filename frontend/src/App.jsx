import React, { useState } from 'react'
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
import CommunityDetail from './pages/CommunityDetail'
import Preloader from './components/ui/Preloader'
import Welcome from './pages/Welcome'

function App() {
    const [showIntro, setShowIntro] = useState(true);

    if (showIntro) {
        return <Preloader onComplete={() => setShowIntro(false)} />;
    }

    return (
        <div className="app-fade-in">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Welcome />} />

                <Route element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />
                    <Route path="chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                    <Route path="community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="community/groups" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="community/chats" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="community/calls" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="community/updates" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="community/:id/:type" element={<ProtectedRoute><CommunityDetail /></ProtectedRoute>} />
                </Route>
            </Routes>
        </div>
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
