package com.flogin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@DisplayName("Login API Integration Tests")
public class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc; // MockMvc cho phép test API endpoint mà không cần chạy server thật

    @Autowired
    private ObjectMapper objectMapper; // Dùng để convert object sang JSON

    @MockBean
    private AuthService authService; // Mock service để kiểm soát dữ liệu trả về

    // ===== a) Test POST /api/auth/login endpoint =====
    @Test
    @DisplayName("POST /api/auth/login - Success")
    void testLoginSuccess() throws Exception {
        // Tạo request giả lập
        LoginRequest request = new LoginRequest("testuser", "Test123");
        // Tạo response giả lập từ service
        LoginResponse mockResponse = new LoginResponse(true, "token123", null);

        // Khi gọi authService.authenticate bất kỳ LoginRequest nào, trả về mockResponse
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login") // Gửi POST request
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))) // body JSON
                // ===== b) Test response structure và status code =====
                .andExpect(status().isOk()) // Kiểm tra status code 200 OK
                .andExpect(jsonPath("$.success").value(true)) // Kiểm tra trường success
                .andExpect(jsonPath("$.token").value("token123")) // Kiểm tra token tồn tại và đúng
                .andExpect(jsonPath("$.message").doesNotExist()); // message không tồn tại
    }

    @Test
    @DisplayName("POST /api/auth/login - Failure")
    void testLoginFailure() throws Exception {
        LoginRequest request = new LoginRequest("wronguser", "wrongpass");
        LoginResponse mockResponse = new LoginResponse(false, null, "Sai thông tin");

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                // ===== b) Test response structure và status code =====
                .andExpect(status().isUnauthorized()) // Status 401 cho thất bại
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.token").doesNotExist())
                .andExpect(jsonPath("$.message").value("Sai thông tin"));
    }

    // ===== c) Test CORS headers =====
    @Test
    @DisplayName("CORS preflight request - OPTIONS")
    void testCorsPreflight() throws Exception {
        // Gửi request OPTIONS (preflight) để kiểm tra CORS headers
        mockMvc.perform(options("/api/auth/login")
                .header("Origin", "http://localhost:3000") // Gốc gọi request
                .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isOk()) // Preflight thường trả 200 OK
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Methods", "POST"));
    }
}
