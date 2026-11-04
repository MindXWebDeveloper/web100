import http from "http"
import { customers, orders, products } from "./data.js";
const app = http.createServer((request, response) => {
    let url    = request.url;
    let method = request.method;

    switch (true) {
        case (url.startsWith("/customers") && method === "GET"):
            let array = url.trim().split("/");
            if (array.length === 2 && array[1] === 'customers'){
                response.end(JSON.stringify(customers));
                break;
            }else if(array.length === 3){
                const customerId = array[2];
                const customer = customers.find(item => item.id === customerId)
                response.end(JSON.stringify(customer));
                break;
            }else if(array.length === 4 && array[3] === 'orders') {
                const customerId = array[2];
                const customerOrder = orders.find(item => item.customerId === customerId)
                response.end(JSON.stringify(customerOrder));
                break;
            }
            break;
        case (url.startsWith("/orders") && method === "GET"):
            array = url.trim().split("/");
            if(array.length === 2 && array[1] === 'orders'){
                response.end(JSON.stringify(orders));
                break;               
            }else if(array.length === 3 && array[2] === 'highvalue') {
                const order = orders.filter(item => item.totalPrice > 10000000);
                response.end(JSON.stringify(order));
                break;
            }
            break;
        case (url.startsWith("/products") && method === "GET"):
            const parsedUrl = new URL(request.url, "http://localhost");
            const minPrice = parsedUrl.searchParams.get("minPrice");
            const maxPrice = parsedUrl.searchParams.get("maxPrice");
            if(minPrice !== null && maxPrice !== null) {
                 let result = products.filter(product =>
                                            product.price >= Number(minPrice) &&
                                            product.price <= Number(maxPrice)
                                        );
                response.end(JSON.stringify(result));
                break
            }
            else {
                response.end(JSON.stringify(products));
                break
            }
        default:
            response.end("Khong tim thay api!");
            break;
    }
});

app.listen(3000, () => {
    console.log("Server is running port 3000!")
})