"use client"

import React, { useState } from "react"
import "./styles.css" // Import external stylesheet

export default function TradeSage() {
  const [productName, setProductName] = useState("");

  const get_data = () => {
    console.log("The button was pressed");
    // Additional functionality can be implemented here later
  };

  return (
    <div className="container">
      <div className="content">
        {/* Header */}
        <div className="header">
          <h1 className="title">TradeSage</h1>
        </div>

        {/* Search Section */}
        <div className="card highlight">
          <h2 className="card-title">Find Supply Chain Solutions</h2>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              id="search" 
              type="text" 
              placeholder="Enter product name..." 
              className="input" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <button className="btn primary" onClick={get_data}>Search</button>
          </form>
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="card-title">Product Information</h2>
          <div className="info-grid">
            {/* Placeholder for product information */}
          </div>
        </div>

        {/* Chat Section */}
        <div className="card">
          <h2 className="card-title">Chat with TradeSage Assistant</h2>
          <div className="chat-box">
            <div className="chat-message user">Hello</div>
            <div className="chat-message assistant">How can I assist you with your supply chain needs?</div>
          </div>
          <form className="chat-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="input" placeholder="Ask about tariffs or products..." />
            <button className="btn primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}