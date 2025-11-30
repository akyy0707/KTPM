import http from "k6/http";
import { Trend } from "k6/metrics";

let loginRT = new Trend("login_response_time");

export let options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  let res = http.post(
    "http://localhost:8080/api/auth/login",
    JSON.stringify({
      username: "testuser",
      password: "Test123",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  loginRT.add(res.timings.duration);
}
