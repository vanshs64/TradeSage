"use client";

import { useState } from "react";

export default function CanadianSearch({ query, onExploreClick }) {
  const [canadianResult, setCanadianResult] = useState(null);

  const selectedFields = ["Product_Name", "Category", "Supplier", "Price", "Quantity"];

  const formatSupplierName = (name) => name.replace(/([A-Z])/g, " $1").trim();
  const formatValue = (field, value) => {
    if (field === "Supplier") return formatSupplierName(value);
    if (field === "Price") return `$${Number(value).toFixed(2)}`;
    return String(value);
  };

  const handleCanadianSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/search/cad?name=${query}`);
      const data = await res.json();
      setCanadianResult(data);
      console.log("Canadian Search Result:", data);

      if (data.exists) {
        onExploreClick();
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Canadian Alternatives</h2>
      <button className="btn secondary" onClick={handleCanadianSearch}>
        Explore Canadian Options
      </button>

      {canadianResult && (
        <div className="result">
          {canadianResult.exists ? (
            <table>
              <tbody>
                {selectedFields.map(
                  (field) =>
                    canadianResult.data[field] && (
                      <tr key={field}>
                        <th>{field}</th>
                        <td>{formatValue(field, canadianResult.data[field])}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          ) : (
            <p>No Canadian alternative available.</p>
          )}
        </div>
      )}
    </div>
  );
}