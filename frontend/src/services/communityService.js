import api from './api';

export const communityService = {
    async getGroups() {
        const response = await api.get('/community/groups');
        return response.data;
    },

    async getGroupById(id) {
        const response = await api.get(`/community/groups/${id}`);
        return response.data;
    },

    async toggleJoinGroup(id) {
        const response = await api.post(`/community/groups/${id}/join`);
        return response.data;
    },

    async getGroupMembers(id) {
        const response = await api.get(`/community/groups/${id}/members`);
        return response.data;
    }
};
