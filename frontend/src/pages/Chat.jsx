import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Trash } from 'lucide-react';
import { chatService } from '../services/chatService';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Chat() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
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
                                <div>
                                    <Sparkles size={48} style={{ marginBottom: '16px', color: 'var(--primary-light)' }} />
                                    <p>Start a conversation with Sneha AI</p>
                                </div>
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
