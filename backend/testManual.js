require('dotenv').config();

async function testManual() {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log(`Testing URL: https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=HIDDEN`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Hello"
                    }]
                }]
            })
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
        } else {
            const data = await response.json();
            console.log("Success:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testManual();
