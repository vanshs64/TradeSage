"use client";

import { useState, useEffect } from "react";
import CanadianSearch from "./canadian_search";
import Why from "./why";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [tariffCode, setTariffCode] = useState("");
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    if (result?.exists) {
      setTariffCode(result.data.Tariff_Code);
    }
  }, [result]);

  useEffect(() => {
    console.log("Tariff Code Updated:", tariffCode);
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
    <div className="container">
      <div className="content">
        <div className="header">
          <div className="header-left">
            <img src="/logo.png" alt="TradeSage Logo" /> {/* Add your logo */}
            <div>
              <h1 className="title">TradeSage</h1>
              <p className="subtitle">Find local alternatives with Ease</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Search for Products</h2>
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
              <h3>Search Result</h3>
              {result.exists ? (
                <table>
                  <tbody>
                    {["Product_Name", "Category", "Supplier", "Final_Price", "Quantity"].map(
                      (field) =>
                        result.data[field] && (
                          <tr key={field}>
                            <th>{field === "Final_Price" ? "Price" : field}</th>
                            <td>
                              {field === "Final_Price"
                                ? `$${Number(result.data[field]).toFixed(2)}`
                                : result.data[field]}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              ) : (
                <p>No item found.</p>
              )}

              {result.exists && (
                <CanadianSearch query={query} onExploreClick={() => setShowLearnMore(true)} />
              )}

              {showLearnMore && <Why tariffCode={tariffCode} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}