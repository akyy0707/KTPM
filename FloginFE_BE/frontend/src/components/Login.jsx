import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({
  loginUserFunc,
  validateUsernameFunc,
  validatePasswordFunc,
  toast,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const uErr = validateUsernameFunc(username);
    if (uErr) return toast.error(uErr);

    const pErr = validatePasswordFunc(password);
    if (pErr) return toast.error(pErr);

    try {
      const res = await loginUserFunc(username, password);
      if (res.success) {
        localStorage.setItem("token", res.token);
        toast.success("Đăng nhập thành công");
      } else {
        toast.error(res.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      toast.error(err.message || "Lỗi hệ thống");
    }
  };

  return (
    <div className="login-container">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow p-4"
          style={{ width: "350px", borderRadius: "1rem" }}
        >
          <h3 className="text-center mb-4">Đăng nhập</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Nhập username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
