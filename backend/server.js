import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // allow us to use JSON data in the req.body

app.use("/api/products", productRoutes);
//Postman test

console.log(process.env.MONGO_URI);


app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

