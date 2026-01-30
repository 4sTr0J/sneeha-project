import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
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

        try {
            await chatService.sendMessage(conversationId, userMessage, true);

            // Reload messages after a delay to get AI response
            setTimeout(() => {
                loadMessages();
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Failed to send message:', error);
            setLoading(false);
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

                {/* Messages Container */}
                <Card style={{
                    padding: '24px',
                    marginBottom: '20px',
                    minHeight: '500px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {messages.length === 0 ? (
                        <div style={{
                            flex: 1,
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
                        <div style={{ flex: 1 }}>
                            {messages.map((message, index) => (
                                <MessageBubble
                                    key={message._id || index}
                                    message={message}
                                    isOwn={!message.isAI}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </Card>

                {/* Input Form */}
                <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="input"
                        style={{ flex: 1 }}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        disabled={loading || !input.trim()}
                        style={{ padding: '14px 24px' }}
                    >
                        <Send size={18} />
                    </Button>
                </form>
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
