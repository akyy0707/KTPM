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
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    // a) Test POST /api/auth/login - Success
    @Test
    @DisplayName("POST /api/auth/login - Success")
    void testLoginSuccess() throws Exception {
        LoginRequest request = new LoginRequest("testuser", "Test123");
        LoginResponse mockResponse = new LoginResponse(true, "token123", "Success");

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                // ✅ b) Test response structure và status code
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.token").value("token123"))
                .andExpect(jsonPath("$.message").value("Success"));
    }

    // b) Test POST /api/auth/login - Failure
    @Test
    @DisplayName("POST /api/auth/login - Failure")
    void testLoginFailure() throws Exception {
        LoginRequest request = new LoginRequest("wronguser", "wrongpass");
        LoginResponse mockResponse = new LoginResponse(false, null, "Sai thông tin");

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.token").doesNotExist())
                .andExpect(jsonPath("$.message").value("Sai thông tin"));
    }

    // c) Test CORS headers
    @Test
    @DisplayName("CORS preflight request - OPTIONS")
    void testCorsPreflight() throws Exception {
        mockMvc.perform(options("/api/auth/login")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "*"))
                .andExpect(header().string("Access-Control-Allow-Methods", "POST,OPTIONS"));
    }

}
