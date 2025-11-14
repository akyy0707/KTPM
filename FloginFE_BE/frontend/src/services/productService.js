import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: false,
});


export async function getAllProducts() {
    const res = await api.get("/products");
    return res.data;
}

export async function getProductById(id) {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export async function createProduct(product) {
    const res = await api.post("/products", product);
    return res.data;
}

export async function updateProduct(id, product) {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
}

export async function deleteProduct(id) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
}
