import api from './api';

export const wellnessService = {
    async getWellnessContent(type = null) {
        const params = type ? { type } : {};
        const response = await api.get('/wellness', { params });
        return response.data;
    },

    async getContentById(id) {
        const response = await api.get(`/wellness/${id}`);
        return response.data;
    },

    async toggleFavorite(id) {
        const response = await api.post(`/wellness/favorite/${id}`);
        return response.data;
    },

    async getFavorites() {
        const response = await api.get('/wellness/user/favorites');
        return response.data;
    }
};
