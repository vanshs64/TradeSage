require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function get_gemini_response(tariff_code_input, followUp = "") {
  console.log("JAY");
  const GEMINI_KEY = process.env.GEMINI_KEY;

  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let message;

  if (followUp) {
    // Prompt for follow-up question
    message = `You previously provided information about tariff code ${tariff_code_input}. Now, please respond to this follow-up question: "${followUp}" Provide a concise answer related to the tariff code, its application, or its context.`;
  } else {
    // Initial prompt for tariff code
    message = `Given a tariff code representing a tariff imposed by the U.S. on an imported food item, provide a simple one-line explanation starting with "Tariff Code: ...represents" that describes the tariff, but only if you are confident in the tariff’s details. If known, include the typical percentage or dollar amount charged by this tariff; otherwise, omit it. Then, briefly explain the tariff’s historical context or origin in 2-3 sentences. Here is the tariff code ${tariff_code_input}. Use the tariff examples below as a reference if the code matches, paraphrasing where appropriate, but feel free to draw on additional knowledge beyond these examples.

    0809.10.00: Customs Tariff Schedule code for edible fruit and nuts.
    0802.52.00: Harmonized Tariff Schedule (HTS) code for shelled pistachios, fresh or dried, or other nuts, fresh or dried, whether or not shelled or peeled.
    2202.10.00: Harmonized Tariff Schedule (HTS) code for sweetened or flavored waters, including mineral and aerated waters with added sweetening agents.
    2611.00.60: Harmonized Tariff Schedule (HTS) code for tungsten ores and concentrates.`;
  }

  try {
    const result = await model.generateContent(message);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log("Error calling Gemini API:", error);
    throw error;
  }
}

module.exports = get_gemini_response;