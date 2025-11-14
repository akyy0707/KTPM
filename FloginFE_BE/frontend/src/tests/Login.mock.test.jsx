import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import * as authService from "../services/authService";
import { validateUsername, validatePassword } from "../utils/loginValidation";
//a) Mock authService.loginUser() (1 điểm)
jest.mock("../services/authService");

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
};
// b) Test với mocked successful/failed responses (1 điểm)
describe("Login Mock Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Login thành công", async () => {
    authService.loginUser.mockResolvedValue({
      success: true,
      token: "mock-token-123",
    });

    render(
      <Login
        loginUserFunc={authService.loginUser}
        validateUsernameFunc={validateUsername}
        validatePasswordFunc={validatePassword}
        toast={mockToast}
      />
    );

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Test123" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      //c) Verify mock calls (0.5 điểm)
      expect(authService.loginUser).toHaveBeenCalledWith("testuser", "Test123");
      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringMatching(/thành công/i)
      );
    });
  });

  test("Login thất bại", async () => {
    authService.loginUser.mockRejectedValue({
      message: "Invalid credentials",
    });

    render(
      <Login
        loginUserFunc={authService.loginUser}
        validateUsernameFunc={validateUsername}
        validatePasswordFunc={validatePassword}
        toast={mockToast}
      />
    );

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Wrong123" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      //c) Verify mock calls (0.5 điểm)
      expect(authService.loginUser).toHaveBeenCalledWith(
        "wronguser",
        "Wrong123"
      );
      expect(mockToast.error).toHaveBeenCalledWith(
        expect.stringMatching(/invalid credentials/i)
      );
    });
  });
});
