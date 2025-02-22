"use client";

import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const [canadianResult, setCanadianResult] = useState(null);

  const handleCanadianSearch = async (e) => {
    e.preventDefault(); // Prevent full page reload

    try {
      const res = await fetch(`http://localhost:5000/search/cad?name=${query}`);
      const data = await res.json();
      setCanadianResult(data); // Store result in state
      console.log("Canadian Search Result:", data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent full page reload

    try {
      const res = await fetch(`http://localhost:5000/search?name=${query}`);
      const data = await res.json();
      setResult(data); // Store result in state
      console.log("Search Result:", data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          id="search"
          type="text"
          placeholder="Enter grocery item..."
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn primary" type="submit">
          Search
        </button>
      </form>
      {result && (


      <div className="result">
        <h3>Search Result:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>

        {result.exists && (
          <button className="btn secondary" onClick={handleCanadianSearch}>
            Explore Canadian Alternatives
          </button>
        )}

        {canadianResult && (
          <div className="result">
            <h3>Canadian Alternative:</h3>
            <pre>{JSON.stringify(canadianResult, null, 2)}</pre>
          </div>
        )}
      </div>
    )}
    </div>
  );
}
