package com.flogin.service;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Login Service Unit Tests")
class AuthServiceTest {

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService();
    }

    @Test
    @DisplayName("TC1: Login thanh cong voi credentials hop le")
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse response = authService.authenticate(request);

        assertTrue(response.success());
        assertEquals("Dang nhap thanh cong", response.message());
        assertNotNull(response.token());
    }

    @Test
    @DisplayName("TC2: Login that bai voi username khong ton tai")
    void testLoginUserNotFound() {
        LoginRequest request = new LoginRequest("wronguser", "Test123");
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.success());
        assertEquals("Khong tim thay nguoi dung", response.message());
        assertNull(response.token());
    }

    @Test
    @DisplayName("TC3: Login that bai voi password sai")
    void testLoginWrongPassword() {
        LoginRequest request = new LoginRequest("testuser", "Wrong123");
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.success());
        assertEquals("Sai mat khau", response.message());
        assertNull(response.token());
    }

    @Test
    @DisplayName("TC4: Login that bai khi username rong")
    void testUsernameEmpty() {
        LoginRequest request = new LoginRequest("", "Test123");
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.success());
        assertEquals("Username khong duoc de trong", response.message());
    }

    @Test
    @DisplayName("TC5: Login that bai khi password rong")
    void testPasswordEmpty() {
        LoginRequest request = new LoginRequest("testuser", "");
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.success());
        assertEquals("Password khong duoc de trong", response.message());
    }
}
