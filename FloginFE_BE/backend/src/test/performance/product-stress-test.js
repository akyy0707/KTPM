import http from "k6/http";
import { check } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 4000 },
    { duration: "10s", target: 5000 },
    { duration: "10s", target: 6000 },
    { duration: "10s", target: 7000 },
    { duration: "10s", target: 8000 },
    { duration: "10s", target: 9000 },

    { duration: "20s", target: 0 },
  ],
};

export default function () {
  let res = http.get("http://localhost:8080/api/products");
  check(res, {
    "status 200": (r) => r.status === 200,
    "rt < 300ms": (r) => r.timings.duration < 300,
  });
}
