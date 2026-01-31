require('dotenv').config();
const fs = require('fs');

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    console.log("Listing models...");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            console.error(await response.text());
        } else {
            const data = await response.json();
            const names = data.models.map(m => m.name);
            fs.writeFileSync('available_models.txt', names.join('\n'));
            console.log("Written models to available_models.txt");
            console.log("Count:", names.length);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

listModels();
