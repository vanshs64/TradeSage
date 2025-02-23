"use client";

import { useState, useEffect } from "react";
import CanadianSearch from "./canadian_search";
import Why from "./why";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [tariffCode, setTariffCode] = useState("");
  const [showLearnMore, setShowLearnMore] = useState(false); // New state

  useEffect(() => {
     if (result?.exists) {
       setTariffCode(result.data.Tariff_Code); // Fix the key to match the API response
     }
   }, [result]);
   
   useEffect(() => {
     console.log("VICKY", tariffCode); // Logs updated value when tariffCode changes
   }, [tariffCode]);
   
   
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/search?name=${query}`);
      const data = await res.json();
      setResult(data);
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
          {result.exists ? (
            <>
              <table>
                <tbody>
                  {["Product_Name", "Category", "Supplier", "Final_Price", "Quantity"].map(
                    (field) =>
                      result.data[field] && (
                        <tr key={field}>
                          <td>
                            <strong>{field === "Final_Price" ? "Price" : field}</strong>
                          </td>
                          <td>{field === "Final_Price" ? `$${Number(result.data[field]).toFixed(2)}` : result.data[field]}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p>Item not found.</p>
          )}

          {/* Pass function to handle clicking "Explore Canadian Alternatives" */}
          {result.exists && <CanadianSearch query={query} onExploreClick={() => setShowLearnMore(true)} />}

          {/* Show "Learn More" if button is clicked */}
          {showLearnMore && <Why tariffCode={tariffCode} />}
        </div>
      )}
    </div>
  );
}
