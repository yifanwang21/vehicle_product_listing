import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js"
import { getPartProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getPartProducts);

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch(error){
        console.log("error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});


router.post("/", async (req, res)=> {
    const product = req.body; //user will send this date

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please Provide all fields"});
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error){
        console.log("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});

    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"});
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    console.log("PUT /api/products/:id called");
    console.log("ID:", id);
    console.log("Request Body:", product);


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid Product ID"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
});

export default router;
