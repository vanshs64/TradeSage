require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function get_gemini_response(tariff_code_input) {
  console.log("JAY");
  const GEMINI_KEY = process.env.GEMINI_KEY;

  // https://ai.google.dev/api/all-methods
  const url =
    "https://ai.google.dev/api/all-methods#rest-resource:-v1beta.models"; // Replace with the actual Gemini API endpoint

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // what the model should receive as a prompt
    const message = `Given a tariff code that represents a tariff imposed by the U.S. on an imported food item, explain what tariff the tariff code represents in a simple one-line response starting with "Tariff Code: ...represents". Here is the tariff code ${tariff_code_input}`;

    // what the model returns (ai generated response)
    const result = await model.generateContent(message);

    console.log(result.response.text());

    // can change it to return text() or just `.data`
    return result.response.text();
  } catch (error) {
    console.log("Error calling Gemini API:", error);
    throw error;
  }
}

//export default get_gemini_response;
module.exports = get_gemini_response;
//module.exports = get_gemini_response("0809.10.00");

