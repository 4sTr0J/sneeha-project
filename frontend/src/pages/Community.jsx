import { useState, useEffect } from 'react';
import { Users, UserPlus, UserCheck } from 'lucide-react';
import { communityService } from '../services/communityService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Community() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            const data = await communityService.getGroups();
            setGroups(data);
        } catch (error) {
            console.error('Failed to load groups:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinGroup = async (groupId) => {
        try {
            await communityService.toggleJoinGroup(groupId);
            loadGroups();
        } catch (error) {
            console.error('Failed to join group:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="container" style={{ maxWidth: '900px' }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: '900',
                    marginBottom: '12px',
                    textAlign: 'center'
                }} className="gradient-text">
                    Support Communities
                </h1>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    marginBottom: '40px',
                    fontSize: '16px'
                }}>
                    Connect with others who understand your journey
                </p>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p className="gradient-text" style={{ fontSize: '18px' }}>Loading...</p>
                    </div>
                ) : groups.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>No groups available</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gap: '20px'
                    }}>
                        {groups.map((group) => (
                            <GroupCard
                                key={group._id}
                                group={group}
                                onJoin={() => handleJoinGroup(group._id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function GroupCard({ group, onJoin }) {
    const illnessColors = {
        'Cancer Support': '#EC4899',
        'Chronic Illness': '#8B5CF6',
        'Caregiver Support': '#A78BFA'
    };

    const color = illnessColors[group.illnessType] || '#8B5CF6';

    return (
        <Card style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{
                background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                padding: '24px',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px'
                    }}>
                        👥
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontSize: '22px',
                            fontWeight: '700',
                            marginBottom: '4px',
                            color: 'var(--text-primary)'
                        }}>
                            {group.name}
                        </h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: color
                        }}>
                            {group.illnessType}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px' }}>
                <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                }}>
                    {group.description}
                </p>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-muted)',
                        fontSize: '14px'
                    }}>
                        <Users size={18} />
                        <span>{group.memberCount} members</span>
                    </div>

                    <Button onClick={onJoin} style={{ fontSize: '14px', padding: '10px 20px' }}>
                        <UserPlus size={16} style={{ marginRight: '6px' }} />
                        Join Group
                    </Button>
                </div>
            </div>
        </Card>
    );
}
