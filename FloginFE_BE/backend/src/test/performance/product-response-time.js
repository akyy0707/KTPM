import http from "k6/http";
import { Trend } from "k6/metrics";

let getAllRT = new Trend("get_all_rt");
let getByIdRT = new Trend("get_by_id_rt");
let createRT = new Trend("create_rt");
let updateRT = new Trend("update_rt");
let deleteRT = new Trend("delete_rt");

export let options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  let resGetAll = http.get("http://localhost:8080/api/products");
  getAllRT.add(resGetAll.timings.duration);

  let resCreate = http.post(
    "http://localhost:8080/api/products",
    JSON.stringify({
      name: "Test",
      price: 10,
      quantity: 5,
      category: "test",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
  createRT.add(resCreate.timings.duration);

  let createdProduct = {};
  try {
    createdProduct = JSON.parse(resCreate.body);
  } catch (e) {}

  let id = createdProduct.id;

  if (!id) {
    console.error("Không lấy được ID từ POST → bỏ qua update/delete");
    return;
  }

  let resGetById = http.get(`http://localhost:8080/api/products/${id}`);
  getByIdRT.add(resGetById.timings.duration);

  let resUpdate = http.put(
    `http://localhost:8080/api/products/${id}`,
    JSON.stringify({
      name: "Updated Test",
      price: 20,
      quantity: 2,
      category: "updated",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
  updateRT.add(resUpdate.timings.duration);

  let resDelete = http.del(`http://localhost:8080/api/products/${id}`);
  deleteRT.add(resDelete.timings.duration);
}
