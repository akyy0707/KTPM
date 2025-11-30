import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  scenarios: {
    load_100: {
      executor: "constant-vus",
      vus: 100,
      duration: "30s",
      exec: "productTest",
    },
    load_500: {
      executor: "constant-vus",
      vus: 500,
      duration: "30s",
      exec: "productTest",
      startTime: "35s",
    },
    load_1000: {
      executor: "constant-vus",
      vus: 1000,
      duration: "30s",
      exec: "productTest",
      startTime: "70s",
    },
  },
};

export function productTest() {
  let res1 = http.get("http://localhost:8080/api/products");
  check(res1, { "GET ALL status 200": (r) => r.status === 200 });

  let res2 = http.post(
    "http://localhost:8080/api/products",
    JSON.stringify({
      name: "Test Product",
      price: 100,
      quantity: 20,
      category: "test",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
  check(res2, { "POST status 201": (r) => r.status === 201 });

  let id = res2.json().id;

  let res3 = http.get(`http://localhost:8080/api/products/${id}`);
  check(res3, {
    "GET BY ID status 200": (r) => r.status === 200,
  });

  let res4 = http.put(
    `http://localhost:8080/api/products/${id}`,
    JSON.stringify({
      name: "Updated Product",
      price: 150,
      quantity: 10,
      category: "updated",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
  check(res4, {
    "PUT status 200": (r) => r.status === 200,
  });

  let res5 = http.del(`http://localhost:8080/api/products/${id}`);
  check(res5, {
    "DELETE status 204": (r) => r.status === 204,
  });

  sleep(1);
}
