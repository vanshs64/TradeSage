"use client";

import { useState } from "react";

export default function Why({ tariffCode }) {
  const [isHidden, setIsHidden] = useState(true);
  const [geminiResponse, setGeminiResponse] = useState("");

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

  return (
    <div className="card">
      <h2 className="card-title">Why This Tariff?</h2>
      <button className="btn primary" onClick={handleClick}>
        Learn More
      </button>
      <div hidden={isHidden} className="result">
        <p>{geminiResponse || "Loading..."}</p>
      </div>
    </div>
  );
}