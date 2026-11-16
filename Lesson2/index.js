import express from "express";
import { customers, orders, products } from "./data.js";

// khoi tao ung dung voi express
const app = express();
app.use(express.json());

// api mac dinh khi goi den server
app.get("/", (request, response) => {
    response.send({
        message: "Hello Web100!"
    })
});

// lay danh sach khach hang
app.get("/customers", (req, res) => {
    const { ageLte } = req.query; // ket qua tra ve 1 objet
    if (isNaN(ageLte)) {
            res.send({
            messages: "Tuoi khong hop le",
            data: null
        });
        return;
    }
    const listCustomers = customers.filter(item => item.age <= ageLte);
    res.send({
        messages: "Thanh cong!",
        data: listCustomers
    });
});

//lay theo id customer
//params laf cach de truyen du lieu tren url
app.get("/customers/:id", (req, res) => {
    const { id } = req.params;
    const currentCustomer = customers.find(item => item.id === id);

    if(!currentCustomer) {
        res.send({
            message: "Khong tim thay khach hang!",
            data: null
        });
    }else{
        res.send({
            message: "Thanh cong!",
            data: currentCustomer
        });
    }
})

//them du lieu
app.post("/customers", (req, res) => {
    const { name, email, age } = req.body;
    if(!name || !email || !age){
        res.send({
            message: "Thieu thong tin khach hang!",
            data: null
        });
        return
    }else {
        const newCustomer = {
            id: "123",
            name: name,
            email: email,
            age: age
        };

        customers.push(newCustomer);
         res.send({
            message: "Thanh cong!",
            data: newCustomer
        });
    }
});

app.put("/customers/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    let data = customers.find(item => item.id === id);
    if(!data) {
        res.send({
            message: "Khong tim thay khach hang!",
            data: null
        });
        return
    }

    if(name){
        data.name = name;
    }

    if(age) {
        data.age = age;
    }

    if(email) {
        data.email = email;
    }

    res.send({
            message: "Thanh cong!",
            data: data
        });
});

// xoa
app.delete("/customers/:id", (req, res) => {
    const { id } = req.params;

    let index = customers.findIndex(item => item.id === id);

    if (index < 0) {
        res.send({
            message: "Khong tim thay khach hang!",
            data: null
        });
        return
    }

    customers.splice(index, 1);
    res.send({
            message: "Thanh cong!",
            data: customers
    });
})

// giup cho chuong trinh lien tuc chay o cong 3000
app.listen(3000, () => {
    console.log("Server is running port 3000!")
});