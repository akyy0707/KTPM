package com.flogin.service;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public LoginResponse authenticate(LoginRequest req) {
        if (req.username() == null || req.username().isBlank()) {
            return new LoginResponse(false, null, "Username khong duoc de trong");
        }
        if (req.password() == null || req.password().isBlank()) {
            return new LoginResponse(false, null, "Password khong duoc de trong");
        }

        if (req.username().equals("testuser") && req.password().equals("Test123")) {
            return new LoginResponse(true, "token_123", "Dang nhap thanh cong");
        }
        if (!req.username().equals("testuser")) {
            return new LoginResponse(false, null, "Khong tim thay nguoi dung");
        }
        return new LoginResponse(false, null, "Sai mat khau");
    }
}
