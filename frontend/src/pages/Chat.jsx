import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Trash, Mic, MicOff } from 'lucide-react';
import { chatService } from '../services/chatService';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import brandingGif from '../assets/branding.gif';

export default function Chat() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
    const timerRef = useRef(null);
    const conversationId = 'ai-chat';

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async () => {
        try {
            const data = await chatService.getMessages(conversationId);
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const isListeningRef = useRef(false);

    const handleVoiceInput = () => {
        if (isListeningRef.current) {
            stopListening();
            return;
        }

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice input is not supported in this browser.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        const forceStayOpen = { active: true };

        recognition.onstart = () => {
            setIsListening(true);
            isListeningRef.current = true;
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                forceStayOpen.active = false;
                stopListening();
            }, 10000);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setInput(prev => (prev ? prev + ' ' : '') + transcript);
        };

        recognition.onend = () => {
            if (forceStayOpen.active && isListeningRef.current) {
                try {
                    recognition.start();
                } catch (e) {
                    setIsListening(false);
                    isListeningRef.current = false;
                }
            } else {
                setIsListening(false);
                isListeningRef.current = false;
            }
        };

        try {
            recognition.start();
        } catch (error) {
            setIsListening(false);
            isListeningRef.current = false;
        }
    };

    const stopListening = () => {
        setIsListening(false);
        isListeningRef.current = false;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (recognitionRef.current) {
            recognitionRef.current.onend = null;
            recognitionRef.current.stop();
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setLoading(true);

        const tempUserMsg = {
            id: Date.now(),
            content: userMessage,
            sender: user.id,
            isAI: false,
            createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempUserMsg]);

        try {
            await chatService.sendMessage(conversationId, userMessage, true);
            await loadMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleClearChat = async () => {
        if (!window.confirm('Are you sure you want to clear your chat history?')) return;
        try {
            await chatService.clearMessages(conversationId);
            setMessages([]);
        } catch (error) {
            alert('Failed to clear chat history');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
            style={{ paddingBottom: '20px' }}
        >
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '24px' }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 16px',
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '36px',
                            boxShadow: '0 10px 20px rgba(109, 40, 217, 0.2)'
                        }}
                        className="animate-pulse-slow"
                    >
                        💜
                    </motion.div>
                    <h1 className="gradient-text" style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>
                        Sneha AI Companion
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Your healing companion is here to listen and support you
                    </p>
                </motion.div>

                {messages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, background: 'rgba(239, 68, 68, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClearChat}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#ef4444',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Trash size={16} />
                            Clear Chat
                        </motion.button>
                    </motion.div>
                )}

                <Card style={{
                    padding: '24px',
                    marginBottom: '20px',
                    height: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        marginBottom: '20px',
                        paddingRight: '10px'
                    }}>
                        {messages.length === 0 ? (
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: 'var(--text-muted)'
                            }}>
                                <AnimatePresence mode="wait">
                                    {isListening ? (
                                        <motion.div
                                            key="listening"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        >
                                            <img
                                                src={brandingGif}
                                                alt="Listening..."
                                                style={{ width: '280px', height: '280px', objectFit: 'contain', marginBottom: '20px' }}
                                            />
                                            <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '18px', opacity: 0.7 }}>
                                                Listening<span className="loading-dots"></span>
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="static"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <Sparkles size={48} style={{ marginBottom: '16px', color: 'var(--primary-light)' }} />
                                            <p>Start a conversation with Sneha AI</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <AnimatePresence initial={false}>
                                    {messages.map((message, index) => (
                                        <MessageBubble
                                            key={message.id || index}
                                            message={message}
                                            isOwn={!message.isAI}
                                        />
                                    ))}
                                </AnimatePresence>

                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}
                                    >
                                        <div style={{
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            background: 'rgba(139, 92, 246, 0.1)',
                                            border: '1px solid var(--glass-border)',
                                            color: 'var(--text-secondary)',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <Sparkles size={14} className="animate-pulse" color="var(--primary)" />
                                            <span className="loading-dots">Thinking</span>
                                        </div>
                                    </motion.div>
                                )}

                                <AnimatePresence>
                                    {isListening && messages.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '20px',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <img
                                                src={brandingGif}
                                                alt="Listening..."
                                                style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                                            />
                                            <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px', opacity: 0.7 }}>
                                                Listening<span className="loading-dots"></span>
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    <motion.form
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSend}
                        style={{ display: 'flex', gap: '12px', marginTop: 'auto', alignItems: 'flex-end', padding: '4px' }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="input"
                            style={{ flex: 1, marginBottom: 0, borderRadius: '16px', padding: '14px 20px' }}
                            disabled={loading}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={handleVoiceInput}
                            disabled={loading}
                            style={{
                                background: isListening ? '#ef4444' : 'rgba(139, 92, 246, 0.1)',
                                border: `1px solid ${isListening ? '#ef4444' : 'var(--glass-border)'}`,
                                color: isListening ? 'white' : 'var(--primary)',
                                padding: '14px',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                boxShadow: isListening ? '0 0 20px rgba(239, 68, 68, 0.3)' : 'none'
                            }}
                            title={isListening ? "Stop Listening" : "Voice Input"}
                        >
                            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="btn btn-primary"
                            style={{ padding: '14px 24px', borderRadius: '14px', minWidth: '60px' }}
                        >
                            {loading ? <div className="loader-dots">...</div> : <Send size={20} />}
                        </motion.button>
                    </motion.form>
                </Card>
            </div>
        </motion.div>
    );
}

function MessageBubble({ message, isOwn }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, x: isOwn ? 20 : -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: 'flex',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                marginBottom: '16px'
            }}
        >
            <motion.div
                layout
                style={{
                    maxWidth: '75%',
                    padding: '14px 18px',
                    borderRadius: isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    background: isOwn
                        ? 'linear-gradient(135deg, var(--primary), var(--primary-light))'
                        : 'rgba(139, 92, 246, 0.08)',
                    border: isOwn ? 'none' : '1px solid rgba(139, 92, 246, 0.1)',
                    color: isOwn ? 'white' : 'var(--text-primary)',
                    boxShadow: isOwn ? '0 4px 15px rgba(109, 40, 217, 0.15)' : 'none'
                }}
            >
                <p style={{ fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    {message.content}
                </p>
                <p style={{ fontSize: '10px', marginTop: '8px', opacity: 0.6, textAlign: isOwn ? 'right' : 'left', fontWeight: '600' }}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </motion.div>
        </motion.div>
    );
}

