import React, { useState } from "react";
import { ToastContainer, toast as defaultToast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({
  loginUserFunc,
  validateUsernameFunc,
  validatePasswordFunc,
  toast = defaultToast,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cypress override
    const finalValidateUsername =
      window.__test_validateUsernameFunc || validateUsernameFunc;
    const finalValidatePassword =
      window.__test_validatePasswordFunc || validatePasswordFunc;
    const finalLoginUserFunc = window.__test_loginUserFunc || loginUserFunc;

    const uErr = finalValidateUsername(username);
    if (uErr) return toast.error(uErr);

    const pErr = finalValidatePassword(password);
    if (pErr) return toast.error(pErr);

    try {
      const res = await finalLoginUserFunc(username, password);
      if (res.success) {
        localStorage.setItem("token", res.token);
        toast.success(res.message || "Đăng nhập thành công");
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
                data-testid="username-input"
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
                data-testid="password-input"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              data-testid="login-button"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide} // ✔ FIX QUAN TRỌNG
        newestOnTop={true}
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        data-testid="toast-container"
      />
    </div>
  );
}

Login.defaultProps = {
  validateUsernameFunc: () => null,
  validatePasswordFunc: () => null,
  loginUserFunc: async () => ({
    success: true,
    token: "token_123",
    message: "Đăng nhập thành công",
  }),
  toast: defaultToast,
};
