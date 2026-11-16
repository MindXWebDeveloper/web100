import express from "express"
import { customers, orders, products } from "./data.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Start Application!")
})

/*
    1. Viết API để lấy toàn bộ danh sách khách hàng.
    GET /customers
    Trả về danh sách toàn bộ khách hàng
    Cho phép lọc khách hàng, sắp xếp theo tuổi tăng dần

*/
app.get("/customers", (req, res) => {
    const {name, age} = req.query;

    let data = customers;

    if(name) {
        data = data.filter(item => item.name.includes(name));
    }

    if(age) {
         data = data.filter(item => item.age <= age);
    }

    data = data.sort((a, b) => a.age - b.age)
    res.status(200).send({
        message: "Thanh cong!",
        data: data
    });
})

/*
2. Lấy thông tin chi tiết của một khách hàng
Viết API để lấy thông tin chi tiết của một khách hàng dựa trên id.
Endpoint: GET /customers/:id
Ví dụ:
 /customers/1  -> trả về thông tin customer có id là 1
/customers/2   -> trả về thông tin customer có id là 2
:id sẽ đại diện như một biến trên url
Yêu cầu: Trả về thông tin của một khách hàng cụ thể dựa trên id được truyền vào URL

*/

app.get("/customers/:id", (req, res) => {
    const { id } = req.params;

    const customer = customers.find(item => String(item.id) === String(id));
    if(!customer) {
        res.status(404).send({
            message: "Khong tim thay khach hang!",
            data: null
        })
        return;
    }

     res.status(200).send({
            message: "Thanh cong!",
            data: customer
        })
});

/*
    5. Lọc danh sách sản phẩm theo khoảng giá
    Viết API để lọc danh sách sản phẩm dựa trên khoảng giá minPrice và maxPrice được truyền vào thông qua query parameters, Nếu không có 1 trong 2, thì trả về toàn bộ danh sách product API có dạng như sau:
    GET /products?minPrice=?&maxPrice=?

    Ví dụ: GET /products?minPrice=5000000&maxPrice=10000000 sẽ trả về danh sách sản phẩm có giá từ 5 triệu đến 10 triệu.


*/

app.get("/products", (req, res) => {
    const {minPrice, maxPrice} = req.query;
    let result;
    if(!minPrice || !maxPrice) {
        result = products;
        res.status(200).send({
            message: "Thanh cong!",
            data: result
        });
        return;
    }

    result = products.filter(item => item.price <= Number(maxPrice) && item.price >= Number(minPrice));
     res.status(200).send({
            message: "Thanh cong!",
            data: result
        });

})

app.listen(5000, () => {
    console.log("Server is running port 5000!")
});