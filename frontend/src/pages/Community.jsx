import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

    const renderView = () => {
        if (isGroups) return <GroupsView />;
        if (isCalls) return <CallsView />;
        if (isUpdates) return <UpdatesView />;
        return <ChatsView />;
    };

    return (
        <div className="main-content" style={{ paddingTop: '0px', minHeight: '100vh' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {renderView()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

