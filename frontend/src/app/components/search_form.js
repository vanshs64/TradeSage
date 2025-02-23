"use client";

import { useState, useEffect } from "react";
import CanadianSearch from "./canadian_search";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [tariffCode, setTariffCode] = useState(undefined)

  // Define the fields we want to display
  const selectedFields = ["Product_Name", "Category", "Supplier", "Final_Price", "Quantity"];

  // Format field names and values
  const formatFieldName = (field) => (field === "Final_Price" ? "Price" : field);

  const formatValue = (field, value) => (field === "Final_Price" ? `$${Number(value).toFixed(2)}` : String(value));

  useEffect(() => {
       if (result?.exists) {
         console.log("VICKY");
      setTariffCode(result.data.tariffCode || undefined); // Update tariffCode when result changes
    }
  }, [result]);

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
                  {selectedFields.map(
                    (field) =>
                      result.data[field] && (
                        <tr key={field}>
                          <td>
                            <strong>{formatFieldName(field)}</strong>
                          </td>
                          <td>{formatValue(field, result.data[field])}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p>Item not found.</p>
          )}

          {result.exists && <CanadianSearch query={query} />}
        </div>
      )}
    </div>
  );
}