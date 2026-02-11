import { useState, useEffect, useRef } from 'react';
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
    const conversationId = 'ai-chat'; // Static conversation ID for AI chat

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

        const forceStayOpen = { active: true }; // Flag to prevent onend from resetting state early

        recognition.onstart = () => {
            setIsListening(true);
            isListeningRef.current = true;

            // Clear any existing timer
            if (timerRef.current) clearTimeout(timerRef.current);

            // Set the 10s auto-stop
            timerRef.current = setTimeout(() => {
                forceStayOpen.active = false;
                stopListening();
            }, 10000);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setInput(prev => (prev ? prev + ' ' : '') + transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            // Don't stop everything on error, let onend handle it
        };

        recognition.onend = () => {
            // If it ended but we still want it open (10s not up and not manually stopped)
            if (forceStayOpen.active && isListeningRef.current) {
                try {
                    recognition.start();
                } catch (e) {
                    console.error('Failed to restart recognition:', e);
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
            console.error('Failed to start recognition:', error);
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
            // Unset onend before stopping to prevent the restart logic
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

        // Optimistically add user message
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
            // Re-fetch messages to get the AI response (which was saved by backend)
            await loadMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
            // Optionally add error feedback here
        } finally {
            setLoading(false);
            // Auto-focus input after AI responds
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleClearChat = async () => {
        if (!window.confirm('Are you sure you want to clear your chat history? This cannot be undone.')) {
            return;
        }

        try {
            await chatService.clearMessages(conversationId);
            setMessages([]);
        } catch (error) {
            console.error('Failed to clear messages:', error);
            alert('Failed to clear chat history');
        }
    };

    return (
        <div className="page-container" style={{ paddingBottom: '20px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 16px',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '36px'
                    }} className="animate-pulse-slow">
                        💜
                    </div>
                    <h1 className="gradient-text" style={{
                        fontSize: '32px',
                        fontWeight: '900',
                        marginBottom: '8px'
                    }}>
                        Sneha AI Companion
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Your healing companion is here to listen and support you
                    </p>
                </div>

                {/* Clear Chat Button */}
                {messages.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <button
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
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        >
                            <Trash size={16} />
                            Clear Chat
                        </button>
                    </div>
                )}

                {/* Messages Container */}
                <Card style={{
                    padding: '24px',
                    marginBottom: '20px',
                    height: '600px', // Fixed height for total container
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        marginBottom: '20px',
                        paddingRight: '10px' // Space for scrollbar
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
                                {isListening ? (
                                    <div className="animate-fade-in">
                                        <img
                                            src={brandingGif}
                                            alt="Listening..."
                                            style={{
                                                width: '280px',
                                                height: '280px',
                                                objectFit: 'contain',
                                                marginBottom: '20px'
                                            }}
                                        />
                                        <p style={{
                                            color: 'var(--primary)',
                                            fontWeight: '700',
                                            fontSize: '18px',
                                            opacity: 0.7
                                        }}>
                                            Listening<span className="loading-dots"></span>
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <Sparkles size={48} style={{ marginBottom: '16px', color: 'var(--primary-light)' }} />
                                        <p>Start a conversation with Sneha AI</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {messages.map((message, index) => (
                                    <MessageBubble
                                        key={message.id || index}
                                        message={message}
                                        isOwn={!message.isAI}
                                    />
                                ))}
                                {loading && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '16px'
                                    }}>
                                        <div style={{
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            background: 'rgba(139, 92, 246, 0.1)',
                                            border: '1px solid var(--glass-border)',
                                            color: 'var(--text-secondary)',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <Sparkles size={14} className="animate-pulse" />
                                            <span className="loading-dots">Thinking</span>
                                        </div>
                                    </div>
                                )}
                                {isListening && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '20px',
                                        animation: 'fadeIn 0.3s ease-out',
                                        marginTop: '20px'
                                    }}>
                                        <img
                                            src={brandingGif}
                                            alt="Listening..."
                                            style={{
                                                width: '180px',
                                                height: '180px',
                                                objectFit: 'contain',
                                                marginBottom: '10px'
                                            }}
                                        />
                                        <p style={{
                                            color: 'var(--primary)',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            opacity: 0.7
                                        }}>
                                            Listening<span className="loading-dots"></span>
                                        </p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Form moved inside Card */}
                    <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', marginTop: 'auto', alignItems: 'flex-end' }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="input"
                            style={{ flex: 1, marginBottom: 0 }}
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={handleVoiceInput}
                            disabled={loading}
                            style={{
                                background: isListening ? '#ef4444' : 'rgba(139, 92, 246, 0.1)',
                                border: `1px solid ${isListening ? '#ef4444' : 'var(--glass-border)'}`,
                                color: isListening ? 'white' : 'var(--primary)',
                                padding: '14px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                            title={isListening ? "Stop Listening" : "Voice Input"}
                        >
                            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                        <Button
                            type="submit"
                            disabled={loading || !input.trim()}
                            style={{ padding: '14px 24px' }}
                        >
                            {loading ? <div className="loader-dots">...</div> : <Send size={18} />}
                        </Button>
                    </form>
                </Card>

            </div>
        </div>
    );
}

function MessageBubble({ message, isOwn }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
            marginBottom: '16px'
        }}>
            <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '16px',
                background: isOwn
                    ? 'linear-gradient(135deg, var(--primary), var(--primary-light))'
                    : 'rgba(139, 92, 246, 0.1)',
                border: isOwn ? 'none' : '1px solid var(--glass-border)',
                color: isOwn ? 'white' : 'var(--text-primary)'
            }}>
                <p style={{
                    fontSize: '15px',
                    lineHeight: '1.5',
                    margin: 0
                }}>
                    {message.content}
                </p>
                <p style={{
                    fontSize: '11px',
                    marginTop: '6px',
                    opacity: 0.7
                }}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>
        </div>
    );
}
