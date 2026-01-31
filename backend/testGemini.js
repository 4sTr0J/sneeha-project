require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("Error: GEMINI_API_KEY is not set in environment variables.");
        return;
    }

    console.log("GEMINI_API_KEY is present.");

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = "Hello, are you working?";
        const result = await model.generateContent(prompt);
    } catch (error) {
        console.error("Gemini API Error:", JSON.stringify(error, null, 2));
        if (error.response) {
            console.error("Response data:", await error.response.text());
        }
    }
}

testGemini();
