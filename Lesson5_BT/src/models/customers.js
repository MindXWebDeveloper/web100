import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    age: Number
});

const CustomerModel = mongoose.model("customers", customersSchema);

export default CustomerModel;