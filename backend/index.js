require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {callProductDatabase} = require("./mongo");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/:product_name", async (req, res) => {
 // currently "sneakers" but will receive inputu from frontend form for "productname"
  database_objects = await callProductDatabase(req.query.product_name, req.query.tariff_code);
  res.send(database_objects);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
