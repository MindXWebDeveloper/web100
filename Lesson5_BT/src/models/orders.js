import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    id: String,
    customerId: String,
    productId: String,
    quantity: Number,
    totalPrice: Number
});

const OrderModel = mongoose.model("orders", ordersSchema);

export default OrderModel;