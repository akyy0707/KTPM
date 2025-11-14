import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import { toast } from "react-toastify";

// Fake toast functions
const fakeToast = {
  error: jest.fn(),
  success: jest.fn(),
};

// Fake validation functions
const fakeValidate = jest.fn().mockReturnValue(null);

// Fake loginUser function
const fakeLoginUser = jest.fn();

describe("Login Component Tests without jest.mock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    fakeValidate.mockReturnValue(null);
  });

  // a) Test rendering & user interaction
  test("TC1: renders login form correctly", () => {
    render(
      <Login
        loginUserFunc={fakeLoginUser}
        validateUsernameFunc={fakeValidate}
        validatePasswordFunc={fakeValidate}
        toast={fakeToast}
      />
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng nhập/i })
    ).toBeInTheDocument();
  });

  test("TC2: user can type in input fields", () => {
    render(
      <Login
        loginUserFunc={fakeLoginUser}
        validateUsernameFunc={fakeValidate}
        validatePasswordFunc={fakeValidate}
        toast={fakeToast}
      />
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/mật khẩu/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "Test123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("Test123");
  });

  // b) Test form submission và API calls (2 điểm):
  // TC3: successful login calls API and saves token
  test("TC3: successful login calls API and saves token", async () => {
    fakeLoginUser.mockResolvedValue({ success: true, token: "token_123" });

    render(
      <Login
        loginUserFunc={fakeLoginUser}
        validateUsernameFunc={fakeValidate}
        validatePasswordFunc={fakeValidate}
        toast={fakeToast}
      />
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), {
      target: { value: "Test123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(fakeLoginUser).toHaveBeenCalledWith("testuser", "Test123");
      expect(localStorage.getItem("token")).toBe("token_123");
      expect(fakeToast.success).toHaveBeenCalledWith("Đăng nhập thành công");
    });
  });
  // c) Test error handling và success messages (1 điểm)
  // TC4: failed login shows error toast and no token saved
  test("TC4: failed login shows error toast and no token saved", async () => {
    fakeLoginUser.mockResolvedValue({
      success: false,
      message: "Sai thông tin",
    });

    render(
      <Login
        loginUserFunc={fakeLoginUser}
        validateUsernameFunc={fakeValidate}
        validatePasswordFunc={fakeValidate}
        toast={fakeToast}
      />
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      // API được gọi đúng
      expect(fakeLoginUser).toHaveBeenCalledWith("wronguser", "wrongpass");
      // hiển thị toast lỗi
      expect(fakeToast.error).toHaveBeenCalledWith("Sai thông tin");
      // token không được lưu
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  // TC5: shows validation errors when fields are empty
  test("TC5: shows validation errors when fields are empty", async () => {
    fakeValidate.mockReturnValue("Username không được để trống");

    render(
      <Login
        loginUserFunc={fakeLoginUser}
        validateUsernameFunc={fakeValidate}
        validatePasswordFunc={fakeValidate}
        toast={fakeToast}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(fakeValidate).toHaveBeenCalledWith("");
      expect(fakeToast.error).toHaveBeenCalledWith(
        "Username không được để trống"
      );
      expect(fakeLoginUser).not.toHaveBeenCalled();
    });
  });
});
