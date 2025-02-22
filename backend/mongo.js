const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const env = require("dotenv");
env.config();


const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);


const database = client.db("TradeSageData");
const products = database.collection("Cluster0");



// Query for a movie that has the product_name 'The Room'
async function callProductDatabase(product_name) {
    try {
        const query = { Product_Name: product_name };
        // Execute query
        const product_object = await products.findOne(query);
        // Print the document returned by findOne()
        console.log(product_object);
        return product_object
    } catch (error) {
        console.error("Error querying the database:", error);
    }
}

// add all the other helper functions u need here to access in other files
module.exports = { callProductDatabase };



// app.get("/user", async (req, res) => {
//     const user = await User.findOne();
//     res.json(user);
// });

// app.get("/photos", async (req, res) => {
//     const user = await User.findOne();
//     res.json(user ? user.people : []);
// });

// app.get("/places", async (req, res) => {
//     const user = await User.findOne();
//     res.json(user ? user.places : []);
// });

// app.post("/user", async (req, res) => {
//     const newUser = new User(req.body);
//     const savedUser = await newUser.save();
//     res.json(savedUser);
// });

// app.post("/photo", async (req, res) => {
//     const { name, description, images } = req.body;
//     const user = await User.findOne();
//     if (user) {
//         user.people.push({ name, description, images });
//         await user.save();
//         res.json({ success: true });
//     } else {
//         res.status(404).json({ error: "User not found" });
//     }
// });

// app.post("/approve", async (req, res) => {
//     const { name, description, relation } = req.body;
//     const user = await User.findOne();
//     if (user) {
//         for (let person of user.people) {
//             if (!person.name) {
//                 person.name = name;
//                 person.description = description;
//                 person.relation = relation;
//                 break;
//             }
//         }
//         await user.save();
//         res.json({ success: true });
//     } else {
//         res.status(404).json({ error: "User not found" });
//     }
// });

// app.post("/deny", async (req, res) => {
//     const user = await User.findOne();
//     if (user) {
//         user.people = user.people.filter(person => person.name);
//         await user.save();
//         res.json({ success: true });
//     } else {
//         res.status(404).json({ error: "User not found" });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));