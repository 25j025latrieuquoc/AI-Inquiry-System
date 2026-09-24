package com.globalnetailes.ai_inquiry_system.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    @PostMapping
    public Map<String, String> createInquiry(
            @RequestBody Map<String, String> inquiry) {

        System.out.println("お問い合わせを受信しました！");
        System.out.println(inquiry);

        return Map.of(
                "message", "お問い合わせを受け付けました。"
        );
    }
}