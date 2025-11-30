import http from "k6/http";
import { check } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 6000 },
    { duration: "10s", target: 7000 },
    { duration: "10s", target: 8000 },
    { duration: "10s", target: 9000 },
    { duration: "10s", target: 10000 },
    { duration: "20s", target: 0 },
  ],
};

export default function () {
  let payload = JSON.stringify({
    username: "testuser",
    password: "Test123",
  });

  let params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post("http://localhost:8080/api/auth/login", payload, params);

  check(res, {
    "status is valid": (r) => r.status === 200 || r.status === 401,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
}
