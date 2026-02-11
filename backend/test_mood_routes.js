const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const API_URL = 'http://localhost:5000/api';
let token = '';

const testMoodRoutes = async () => {
    try {
        console.log('--- Testing Mood Routes ---');

        // 1. Register/Login to get token
        console.log('Registering/Logging in...');
        const uniqueEmail = `test_${Date.now()}@example.com`;
        const registerRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test User',
            email: uniqueEmail,
            password: 'password123',
            supportType: 'cancer'
        });
        token = registerRes.data.token;
        console.log('Registered and logged in successfully!');

        // 2. Create a mood entry
        console.log('Creating mood entry...');
        const entryRes = await axios.post(`${API_URL}/moods`, {
            mood: 'happy',
            note: 'Verification test note',
            date: 'Today',
            time: '12:00 PM'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Mood entry created:', entryRes.data.id);

        // 3. Get mood history
        console.log('Fetching mood history...');
        const historyRes = await axios.get(`${API_URL}/moods`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Mood history count:', historyRes.data.length);

        const found = historyRes.data.find(m => m.id === entryRes.data.id);
        if (found) {
            console.log('✅ Verification Successful: Mood entry persisted!');
        } else {
            console.log('❌ Verification Failed: Mood entry not found in history.');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.response?.status === 400 && error.response?.data?.message === 'Invalid credentials') {
            console.log('Tip: Make sure the test user exists or register first.');
        }
    }
};

testMoodRoutes();
