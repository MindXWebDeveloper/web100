import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: Number
});

const ProductModel = mongoose.model("products", productsSchema);

export default ProductModel;