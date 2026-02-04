import { useLocation } from 'react-router-dom';
import GroupsView from './community/GroupsView';
import ChatsView from './community/ChatsView';
import CallsView from './community/CallsView';

export default function Community() {
    const location = useLocation();

    // Determine which view to show based on the path
    const isGroups = location.pathname.includes('/community/groups');
    const isCalls = location.pathname.includes('/community/calls');
    const isUpdates = location.pathname.includes('/community/updates');

    // Default to ChatsView if no specific sub-route or just /community (which maps to Chats in this design)
    // Actually, per Layout.jsx:
    // /community -> Chats
    // /community/groups -> Groups
    // /community/calls -> Calls

    if (isGroups) {
        return <GroupsView />;
    }

    if (isCalls) {
        return <CallsView />;
    }

    if (isUpdates) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <h2>Updates</h2>
                <p>No new updates Available.</p>
            </div>
        );
    }

    // Default view (Chats)
    return <ChatsView />;
}

