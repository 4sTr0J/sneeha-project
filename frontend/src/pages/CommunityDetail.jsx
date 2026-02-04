import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Inbox } from 'lucide-react';
import Button from '../components/ui/Button';

export default function CommunityDetail() {
    const navigate = useNavigate();
    const { id, type } = useParams();

    return (
        <div className="page-container" style={{ background: '#F8F9FE', minHeight: '100vh', padding: '0' }}>
            {/* Header */}
            <div style={{
                padding: '16px 20px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderBottom: '1px solid #eee',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#56247E',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#333', margin: 0 }}>
                    {type === 'announcements' ? 'Announcements' : 'Program Schedule'}
                </h1>
            </div>

            <div className="container" style={{
                maxWidth: '600px',
                height: 'calc(100vh - 60px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px'
            }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: '#56247E10',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    <Inbox size={60} color="#56247E" strokeWidth={1.5} />
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#333', marginBottom: '12px' }}>
                    No content yet
                </h2>

                <p style={{ color: '#666', fontSize: '16px', maxWidth: '300px', margin: '0 auto 32px auto', lineHeight: '1.5' }}>
                    There's currently no information available in this section. Please check back later!
                </p>

                <Button onClick={() => navigate('/community')} style={{ padding: '12px 32px' }}>
                    Go Back
                </Button>
            </div>
        </div>
    );
}
