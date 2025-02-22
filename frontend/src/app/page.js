"use client"

import React, { useState } from "react"
import "./styles.css" // Import external stylesheet

export default function TradingAssistant() {
  return (
    <div className="container">
      <div className="content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <img src="/maple-leaf.png" alt="Government of Canada" className="logo" />
            <div>
              <h1 className="title">Crypto Trading Assistant</h1>
              <span className="subtitle">Government of Canada • Gouvernement du Canada</span>
            </div>
          </div>
          <div className="header-buttons">
            <button className="btn secondary">FR</button>
            <button className="btn secondary">Help</button>
          </div>
        </div>

        {/* Search Section */}
        <div className="card highlight">
          <h2 className="card-title">Search Cryptocurrencies</h2>
          <form className="search-form">
            <input type="text" placeholder="Enter cryptocurrency name..." className="input" />
            <button className="btn primary">Search</button>
          </form>
          <div className="button-group">
            <button className="btn secondary">Market Overview</button>
            <button className="btn secondary">Trading Volume</button>
            <button className="btn secondary">Popular Cryptos</button>
          </div>
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="card-title">Cryptocurrency Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3 className="info-key">Price</h3>
              <p className="info-value">$45,000</p>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="card">
          <h2 className="card-title">Chat with Assistant</h2>
          <div className="chat-box">
            <div className="chat-message user">Hello</div>
            <div className="chat-message assistant">How can I assist you?</div>
          </div>
          <form className="chat-form">
            <input type="text" className="input" placeholder="Ask about crypto markets..." />
            <button className="btn primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
