import api from './api';

export const chatService = {
    async getConversations() {
        const response = await api.get('/chat/conversations');
        return response.data;
    },

    async getMessages(conversationId) {
        const response = await api.get(`/chat/messages/${conversationId}`);
        return response.data;
    },

    async sendMessage(conversationId, content, isAI = false) {
        const response = await api.post('/chat/messages', {
            conversationId,
            content,
            isAI
        });
        return response.data;
    }
};
