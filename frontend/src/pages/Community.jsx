import { useLocation } from 'react-router-dom';
import GroupsView from './community/GroupsView';
import ChatsView from './community/ChatsView';
import CallsView from './community/CallsView';
import UpdatesView from './community/UpdatesView';

export default function Community() {
    const location = useLocation();

    // Determine which view to show based on the path
    const isGroups = location.pathname.includes('/community/groups');
    const isCalls = location.pathname.includes('/community/calls');
    const isUpdates = location.pathname.includes('/community/updates');

    if (isGroups) {
        return <GroupsView />;
    }

    if (isCalls) {
        return <CallsView />;
    }

    if (isUpdates) {
        return <UpdatesView />;
    }

    // Default view (Chats)
    return <ChatsView />;
}

