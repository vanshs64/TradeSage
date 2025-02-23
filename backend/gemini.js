require('dotenv').config();


async function get_gemini_response(tariff_code_input) {
    const GEMINI_KEY = process.env.GEMINI_KEY;

    // https://ai.google.dev/api/all-methods
    const url = 'https://ai.google.dev/api/all-methods#rest-resource:-v1beta.models'; // Replace with the actual Gemini API endpoint

    
    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        
        const genAI = new GoogleGenerativeAI(GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        console.log(GEMINI_KEY)
        
        // what the model should receive as a prompt
        const message = `Given a tariff code that represents a tariff imposed by the U.S. on an imported food item, explain what tariff the tariff code represents in a simple one-line response starting with "Tariff Code: ...represents". Here is the tariff code ${tariff_code_input}`;

        // what the model returns (ai generated response)
        const result = await model.generateContent(message);

        console.log(result.response.text());

        // can change it to return text() or just `.data`
        return result.response.data;

    } catch (error) {
        console.log('Error calling Gemini API:', error);
        throw error;
    }
}

module.exports = get_gemini_response(test_tariff_code);