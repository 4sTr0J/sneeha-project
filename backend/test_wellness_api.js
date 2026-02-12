async function testApi() {
    try {
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'hh@example.com',
                password: 'password123'
            })
        });
        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log('Login successful');

        const types = ['all', 'meditation', 'music', 'affirmation'];
        for (const type of types) {
            const url = `http://localhost:5000/api/wellness${type === 'all' ? '' : '?type=' + type}`;
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            console.log(`Type: ${type}, Count: ${data.length}`);
            if (data.length > 0) {
                console.log(`First item title: ${data[0].title}`);
            }
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

testApi();
