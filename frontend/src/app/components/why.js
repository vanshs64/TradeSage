"use client";

import { useState } from "react";

export default function Why({ tariffCode }) {
  const [isHidden, setIsHidden] = useState(true);
  const [geminiResponse, setGeminiResponse] = useState(""); // Initial response
  const [followUpQuestion, setFollowUpQuestion] = useState(""); // Follow-up input
  const [followUpMessages, setFollowUpMessages] = useState([]); // Array to store follow-up Q&A pairs

  // Initial "Learn More" button handler
  const handleClick = async () => {
    setIsHidden(false);
    console.log("Tariff Code:", tariffCode);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tariffCode }),
      });
      const data = await res.json();
      console.log(data);
      setGeminiResponse(data.message || "No response from Gemini.");
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setGeminiResponse("Error fetching data.");
    }
  };

  // Handler for follow-up question submission
  const handleFollowUpSubmit = async () => {
    if (!followUpQuestion.trim()) return; // Prevent empty submissions

    const newQuestion = followUpQuestion; // Store question before clearing input
    setFollowUpQuestion(""); // Clear input immediately after submission

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tariffCode, followUp: newQuestion }), // Send tariffCode and follow-up
      });
      const data = await res.json();
      const newResponse = data.message || "No follow-up response from Gemini.";

      // Add new Q&A pair to the array
      setFollowUpMessages((prev) => [
        ...prev,
        { question: newQuestion, response: newResponse },
      ]);
    } catch (error) {
      console.error("Error fetching follow-up response:", error);
      setFollowUpMessages((prev) => [
        ...prev,
        { question: newQuestion, response: "Error fetching follow-up data." },
      ]);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Why This Tariff?</h2>
      <button className="btn primary" onClick={handleClick}>
        Learn More
      </button>
      <div hidden={isHidden} className="result">
        <div id="gemini-response">
          <p>{geminiResponse || "Loading..."}</p>
        </div>

        {/* Display follow-up messages above input */}
        {followUpMessages.length > 0 && (
          <div id="conversation-bubble" className="follow-up-messages">
            {followUpMessages.map((msg, index) => (
              <div id="gemini-response" key={index} className="follow-up-message">
                <p>
                  <strong id="who-is">You:</strong> {msg.question}
                </p>
                <p>
                  <strong id="who-is">Assistant:</strong> {msg.response}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Follow-up input and button */}
        <div className="follow-up-section">
          <input
            type="text"
            id="follow-up-bar"
            value={followUpQuestion}
            onChange={(e) => setFollowUpQuestion(e.target.value)}
            placeholder="Still confused? Ask a follow-up question 😉"
            className="follow-up-input"
          />
          <button className="btn secondary" onClick={handleFollowUpSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}