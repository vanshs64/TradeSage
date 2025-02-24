require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { BigQuery } = require("@google-cloud/bigquery");
const get_gemini_response = require("./gemini.js");
//import { get_gemini_response } from "./gemini.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize BigQuery Client
const bigquery = new BigQuery();



// Endpoint 0 => main
app.get("/", (req, res) => {
  console.log("here");
  res.send("Backend is running!");
});



// Endpoint1 => search
app.get("/search", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Missing grocery item name" });
  }

  console.log(`Searching for: ${name}`);

  try {
    const query = `
      SELECT * FROM \`tradesage-451715.tradesage.us_products\`
      WHERE product_name = @name
    `;

    const options = {
      query,
      params: { name },
    };

    const [rows] = await bigquery.query(options);
    console.log(rows);

    if (rows.length > 0) {
      res.json({ exists: true, data: rows[0] });
    } else {
      res.json({ exists: false, message: "Item not found" });
    }
  } catch (error) {
    console.error("BigQuery Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Endpoint2 => search/cad
app.get("/search/cad", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "Missing grocery item name" });
    }

    console.log(`Canadian Searching for: ${name}`);

    const query = `
    SELECT * FROM \`tradesage-451715.tradesage.canadian_products\`
    WHERE product_name = @name
  `;

    const options = {
      query,
      params: { name },
    };

    const [rows] = await bigquery.query(options);
    console.log("canadian", rows)

    if (rows.length > 0) {
      res.json({ exists: true, data: rows[0] });
    } else {
      res.json({ exists: false, message: "Item not found" });
    }
  } catch (error) {
    console.error("BigQuery Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/gemini", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { tariffCode, followUp } = req.body;
    if (!tariffCode) return res.status(400).json({ error: "Tariff code is required" });

    console.log("VICKY");
    const response = await get_gemini_response(tariffCode, followUp);

    res.json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Gemini response" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
