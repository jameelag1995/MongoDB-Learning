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

const getAllActiveProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.send(products);
        if (!products) {
            res.status(404);
            throw new Error("no such products");
        }
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

const getProductsByPrice = async (req, res) => {
    try {
        const { min, max } = req.query;
        const products = await Product.find({
            "details.price": { $gte: min, $lte: max },
        });
        if (!products) {
            res.status(404);
            throw new Error("no such products");
        }
        res.send(products);
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

const updateProductActiveDiscount = async (req, res) => {
    try {
        const id = req.params.id;
        const { isActive, discount } = req.body;
        const product = await Product.findByIdAndUpdate(
            { _id: id },
            { isActive, "details.discount": discount },
            { new: true }
        );
        if (!product) {
            res.status(404);
            throw new Error("no such product");
        }
        res.send(product);
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete({ _id: id });
        res.send([product, `product with id: ${id} was deleted`]);
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

const deleteAllProducts = async (req, res) => {
    try {
        const productsCount = await Product.deleteMany({});
        res.send(productsCount);
    } catch (error) {
        res.status(500).send("error:" + error.message);
    }
};

export {
    getAllProducts,
    getProductById,
    createProduct,
    getAllActiveProducts,
    getProductsByPrice,
    updateProductActiveDiscount,
    deleteProductById,
    deleteAllProducts,
};
