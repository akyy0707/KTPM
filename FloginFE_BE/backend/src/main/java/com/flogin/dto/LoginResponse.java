package com.flogin.dto;

public record LoginResponse(boolean success, String token, String message) {
}
