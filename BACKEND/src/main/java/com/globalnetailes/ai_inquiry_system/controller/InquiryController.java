package com.globalnetailes.ai_inquiry_system.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, Object> createInquiry(

            @RequestParam("companyName") String companyName,

            @RequestParam("name") String name,

            @RequestParam("email") String email,

            @RequestParam("category") String category,

            @RequestParam("subject") String subject,

            @RequestParam("message") String message,

            @RequestPart(value = "attachments", required = false)
            MultipartFile[] attachments

    ) {

        System.out.println("=================================");
        System.out.println("お問い合わせを受信しました！");
        System.out.println("=================================");

        System.out.println("会社名: " + companyName);
        System.out.println("お名前: " + name);
        System.out.println("メールアドレス: " + email);
        System.out.println("お問い合わせ種別: " + category);
        System.out.println("件名: " + subject);
        System.out.println("お問い合わせ内容: " + message);


        // 添付ファイル
        if (attachments != null) {

            for (MultipartFile file : attachments) {

                System.out.println("添付ファイル: " + file.getOriginalFilename());
                System.out.println("ファイルサイズ: " + file.getSize());
                System.out.println("ファイルタイプ: " + file.getContentType());

            }

        }


        return Map.of(
                "message", "お問い合わせを受け付けました。",
                "fileCount", attachments == null ? 0 : attachments.length
        );
    }
}