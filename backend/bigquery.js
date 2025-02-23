require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { BigQuery } = require("@google-cloud/bigquery");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize BigQuery Client with service account key file
const bigquery = new BigQuery({
  keyFilename: "./service-account.json"
});

app.get("/", (req, res) => {
  console.log("here");
  res.send("Backend is running!");
});

// Search endpoint to check if grocery item exists
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
      res.json({ exists: false, message: "404: Item not found" });
    }
  } catch (error) {
    console.error("BigQuery Error:", error);
    res.status(500).json({ error: "500: Internal Server Error" });
  }
});

app.get("/search/cad", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "404: Product not found by name search" });
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});