import express from "express";
import {
    createProduct,
    deleteAllProducts,
    deleteProductById,
    getAllActiveProducts,
    getAllProducts,
    getProductById,
    getProductsByPrice,
    updateProductActiveDiscount,
} from "../controller/productController.js";

const router = express.Router();

router.get("/api/products", getAllProducts);

router.get("/api/products/:id", getProductById);

router.post("/api/products", createProduct);

router.get("/api/products/active/is-active", getAllActiveProducts);

router.get("/api/products/filter/price", getProductsByPrice);

router.patch("/api/products/update/:id", updateProductActiveDiscount);

router.delete("/api/products/:id", deleteProductById);

router.delete("/api/products/delete/delete-all", deleteAllProducts);
export default router;
