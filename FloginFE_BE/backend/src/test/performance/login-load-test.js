import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  scenarios: {
    load_100: {
      executor: "constant-vus",
      vus: 100,
      duration: "30s",
      exec: "loginTest",
    },
    load_500: {
      executor: "constant-vus",
      vus: 500,
      duration: "30s",
      exec: "loginTest",
      startTime: "35s",
    },
    load_1000: {
      executor: "constant-vus",
      vus: 1000,
      duration: "30s",
      exec: "loginTest",
      startTime: "70s",
    },
  },
};

export function loginTest() {
  let payload = JSON.stringify({
    username: "testuser",
    password: "Test123",
  });

  let params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post("http://localhost:8080/api/auth/login", payload, params);

  check(res, {
    "status == 200 or 401": (r) => r.status === 200 || r.status === 401,
  });

  sleep(1);
}
