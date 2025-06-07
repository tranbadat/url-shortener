package com.dattb.shorturl.controller;

import com.dattb.shorturl.dto.ResolveUrlResponse;
import com.dattb.shorturl.dto.ShortenerRequest;
import com.dattb.shorturl.dto.ShortenerResponse;
import com.dattb.shorturl.service.URLShortenerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * ShortUrlController
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/21/2025
 * Version: 1.0.0
 * <p>
 * Description: ShortUrlController is the class for managing the short url
 */
@RestController
@RequestMapping("/v1/short-url")
public class ShortUrlController {
    private final URLShortenerService shortenerService;

    public ShortUrlController(URLShortenerService shortenerService) {
        this.shortenerService = shortenerService;
    }

    /**
     * Shorten a long URL.
     *
     * @param request The long URL to shorten.
     * @return The ShortenerResponse object containing the short URL and expiration time.
     */
    @PostMapping("/shorten")
    ResponseEntity<ShortenerResponse> shorten(@Valid @RequestBody @NotNull ShortenerRequest request) {
        return ResponseEntity.ok(shortenerService.shortenURL(request));

    }

    /**
     * Lookup a short URL by its short code.
     *
     * @param shortCode The short code to look up.
     * @return The ShortenerResponse object containing the long URL and expiration time.
     */
    @GetMapping("/lookup/{shortCode}")
    ResponseEntity<ResolveUrlResponse> lookup(@Valid @PathVariable @NotBlank String shortCode) {
        return ResponseEntity.ok(shortenerService.resolveURL(shortCode));


    }
}
