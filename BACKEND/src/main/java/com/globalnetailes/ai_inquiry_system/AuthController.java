package com.globalnetailes.ai_inquiry_system;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/api/auth/me")
    public Map<String, Object> getCurrentUser(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return Map.of(
                "authenticated", false
            );
        }

        return Map.of(
            "authenticated", true,
            "username", authentication.getName()
        );
    }
}