package com.flogin.controller;

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
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerMockTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Test
    @DisplayName("Mock: Controller với mocked service success")
    void testLoginWithMockedServiceSuccess() throws Exception {
        LoginResponse mockResponse = new LoginResponse(true, "mock-token", "Success");

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"test\",\"password\":\"Pass123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.token").value("mock-token"))
                .andExpect(jsonPath("$.message").value("Success"));

        verify(authService, times(1)).authenticate(any(LoginRequest.class));
    }

    @Test
    @DisplayName("Mock: Controller với mocked service failure")
    void testLoginWithMockedServiceFailure() throws Exception {
        LoginResponse mockResponse = new LoginResponse(false, null, "Invalid credentials");

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"wrong\",\"password\":\"Wrong123\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.token").isEmpty())
                .andExpect(jsonPath("$.message").value("Invalid credentials"));

        verify(authService, times(1)).authenticate(any(LoginRequest.class));
    }
}
