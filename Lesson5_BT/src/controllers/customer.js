import CustomerModel from "../models/customers.js";

const getAllCustomers = async (req, res) => {
    const customers = await CustomerModel.find();

    res.status(200).send({
        message: "Thanh cong!",
        data: customers
    })
}

const getCustomerId = async (req, res) => {
    const id = req.params.id;
    const customer = await CustomerModel.find({id: String(id)});

    if(customer) {
        return res.status(400).send({
            message: "Khach hang khong ton tai!",
            data: customer
        })
    }

    res.status(200).send({
        message: "Thanh cong!",
        data: customer
    })
}

export {getAllCustomers, getCustomerId}