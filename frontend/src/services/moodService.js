import api from './api';

export const moodService = {
    async getMoodHistory() {
        const response = await api.get('/moods');
        return response.data;
    },

    async saveMoodEntry(moodData) {
        const response = await api.post('/moods', moodData);
        return response.data;
    },

    async clearMoodHistory() {
        const response = await api.delete('/moods');
        return response.data;
    }
};
