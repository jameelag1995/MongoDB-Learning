import { Product } from "../model/productsModel.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("No such product");
        }
        res.send(product);
    } catch (error) {
        res.send("error:" + error.message);
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

export { getAllProducts, getProductById, createProduct };
