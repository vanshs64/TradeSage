"use client";

import { useState } from "react";

export default function CanadianSearch({ query }) {
  const [canadianResult, setCanadianResult] = useState(null);

  const handleCanadianSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/search/cad?name=${query}`);
      const data = await res.json();
      setCanadianResult(data); // Store result in state
      console.log("Canadian Search Result:", data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  return (
    <div>
      <button className="btn secondary" onClick={handleCanadianSearch}>
        Explore Canadian Alternatives
      </button>

      {canadianResult && (
        <div className="result">
          <h3>Canadian Alternative:</h3>
          <pre>{JSON.stringify(canadianResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
