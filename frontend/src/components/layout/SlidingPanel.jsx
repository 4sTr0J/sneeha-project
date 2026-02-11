
import { Calendar, X, Clock, AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function SlidingPanel({ isOpen, onClose }) {
    const panelRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (panelRef.current && !panelRef.current.contains(event.target) && isOpen) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`panel-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            {/* Sliding Panel */}
            <div
                ref={panelRef}
                className={`sliding-panel ${isOpen ? 'open' : ''}`}
            >
                <div className="panel-header">
                    <h3>My Day</h3>
                    <button onClick={onClose} className="panel-close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="panel-content">
                    {/* Events Section */}
                    <div className="panel-section">
                        <h4 className="panel-section-title">
                            <Calendar size={18} className="text-primary" />
                            Upcoming Events
                        </h4>
                        <div className="panel-events-list">
                            <EventItem time="4:00 PM" label="Meditation Session" />
                            <EventItem time="Tomorrow" label="Cancer Survivor Meet" />
                            <EventItem time="Wed, 2:00 PM" label="Nutrition Workshop" />
                        </div>
                    </div>

                    {/* Daily Reminder Section */}
                    <div className="panel-section">
                        <h4 className="panel-section-title">
                            <AlertCircle size={18} className="text-accent" />
                            Daily Reminder
                        </h4>
                        <div className="daily-reminder-card-panel">
                            <p>
                                "Your illness doesn't define you. Your strength and resilience do. Take a deep breath."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function EventItem({ time, label }) {
    return (
        <div className="panel-event-item">
            <div className="event-time-badge">
                <Clock size={12} />
                <span>{time}</span>
            </div>
            <span className="event-label">{label}</span>
        </div>
    );
}
