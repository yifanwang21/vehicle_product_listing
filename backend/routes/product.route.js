import express from "express";

import { createProduct, deleteProduct, getAllProduct, getPartProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getPartProducts);

router.get("/", getAllProduct);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
