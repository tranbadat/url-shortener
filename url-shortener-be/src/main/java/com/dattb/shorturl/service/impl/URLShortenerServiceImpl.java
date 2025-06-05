package com.dattb.shorturl.service.impl;

import com.dattb.shorturl.configuration.ShortenerProperties;
import com.dattb.shorturl.context.UserContext;
import com.dattb.shorturl.dto.ResolveUrlResponse;
import com.dattb.shorturl.dto.ShortenerRequest;
import com.dattb.shorturl.dto.ShortenerResponse;
import com.dattb.shorturl.entity.ShortUrlInfo;
import com.dattb.shorturl.exception.ErrorCode;
import com.dattb.shorturl.exception.ShortenerException;
import com.dattb.shorturl.repository.ShortUrlRepository;
import com.dattb.shorturl.service.URLShortenerService;
import com.dattb.shorturl.utils.Base62Encoder;
import com.dattb.shorturl.utils.UrlHasher;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import static java.util.Objects.isNull;

/**
 * URLShortenerService
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/10/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Service
@Slf4j
public class URLShortenerServiceImpl implements URLShortenerService {

    private final ShortenerProperties shortenerProperties;
    private final ShortUrlRepository shortUrlRepository;

    public URLShortenerServiceImpl(ShortenerProperties shortenerProperties, ShortUrlRepository shortUrlRepository) {
        this.shortenerProperties = shortenerProperties;
        this.shortUrlRepository = shortUrlRepository;
    }

    @Override
    public ShortenerResponse shortenURL(ShortenerRequest request) {
        log.info("Shortening URL with request: {}", request);
        if (isNull(request) || StringUtils.isBlank(request.getUrl())) {
            log.warn("Request is null or long URL is blank");
            throw new ShortenerException(ErrorCode.INVALID_REQUEST, "Request is null or long URL is blank");
        }

        if (!shortenerProperties.isEnabled() || shortenerProperties.getExpireDays() <= 0) {
            log.warn("URL shortening is disabled in properties or expiration time is not set");
            throw new ShortenerException(ErrorCode.INVALID_REQUEST,
                    "URL shortening is disabled in properties or expiration time is not set");
        }

        if (StringUtils.isBlank(UserContext.getCurrentUser())) {
            log.warn("User context is not set");
            return shortenURL(request.getUrl());
        }

        log.info("User context is set: {}", UserContext.getCurrentUser());
        return shortenURL(request.getUrl(), request.getShortCode(), request.getExpirationTime());

    }

    @Override
    public ShortenerResponse shortenURL(String longUrl) {
        log.info("Shortening URL: {}", longUrl);
        // Implementation for shortening a URL
        return shortenURL(longUrl, Strings.EMPTY, shortenerProperties.getExpireDays());
    }

    @Override
    public ShortenerResponse shortenURL(String longUrl, String shortCode, long expirationTime) {
        log.info("Shortening URL: {} with custom code: {} and expiration time: {}", longUrl, shortCode, expirationTime);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expirationDateTime = now.plusDays(expirationTime);
        String currentUser = UserContext.getCurrentUser();

        //check if the long URL already exists in the database
        String hashedLongUrl = UrlHasher.hashUrl(longUrl);
        boolean longUrlExists = shortUrlRepository.existsByLongUrlHash(hashedLongUrl);
        if (longUrlExists) {
            log.warn("Long URL already exists: {}", longUrl);
            throw new ShortenerException(ErrorCode.URL_ALREADY_EXISTS, "Long URL already exists");
        }

        ShortUrlInfo shortUrlInfo = ShortUrlInfo.builder()
                .longUrl(longUrl)
                .longUrlHash(hashedLongUrl)
                .shortCode(StringUtils.isBlank(shortCode) ? null : shortCode)
                .expirationTime(expirationDateTime)
                .createdAt(now)
                .updatedAt(now)
                .userId(currentUser)
                .isDeleted(false)
                .build();

        long nowMillis = now.toInstant(ZoneOffset.UTC).toEpochMilli();
        ShortUrlInfo savedShortUrlInfo = shortUrlRepository.save(shortUrlInfo);
        if (StringUtils.isBlank(shortCode)) {
            log.info("Short code is blank, generating a new one");
            log.info("Generated milli second: {}", nowMillis);
            int randomNumber = RandomUtils.secureStrong().randomInt();
            shortCode = Base62Encoder.encode(savedShortUrlInfo.getId() +
                    shortenerProperties.getSecretKey() + randomNumber);
        }
        log.info("Generated short code: {}", shortCode);
        // Check if the short code is valid
        if (StringUtils.isBlank(shortCode) || shortCode.length() > shortenerProperties.getMaxLength()) {
            log.warn("Short code is invalid or exceeds maximum length");
            throw new ShortenerException(ErrorCode.SHORT_CODE_EXCEEDS_MAX_LENGTH, "Short code is invalid or exceeds maximum length");
        }

        // Check if the short code already exists in the database
        boolean exists = shortUrlRepository.existsByShortCode(shortCode);
        if (exists) {
            log.warn("Short code already exists: {}", shortCode);
            throw new ShortenerException(ErrorCode.SHORT_CODE_ALREADY_EXISTS, "Short code already exists");
        }

        // If it doesn't exist, save the long URL and short code to the database
        // Create a new ShortUrlInfo object
        savedShortUrlInfo.setShortCode(shortCode);
        // Save the ShortUrlInfo object to the database
        shortUrlRepository.save(shortUrlInfo);
        log.info("Short URL saved to database: {}", shortUrlInfo);
        ShortenerResponse response = new ShortenerResponse();
        response.setShortUrl(shortenerProperties.getDomain() + shortCode);
        response.setExpiresAt(expirationDateTime);

        return response;
    }

    @Override
    public ResolveUrlResponse resolveURL(String shortCode) {
        // Implementation for resolving a shortened URL back to its original long URL
        log.info("Resolving URL for shortCode: {}", shortCode);
        if (StringUtils.isBlank(shortCode)) {
            log.warn("Short code is not provided");
            throw new ShortenerException(ErrorCode.INVALID_REQUEST, "Short code is not provided");
        }
        // This is a placeholder implementation. Replace with actual decoding logic.
        Optional<ShortUrlInfo> shortUrlInfoOptional = shortUrlRepository.findByShortCode(shortCode);
        if (shortUrlInfoOptional.isEmpty()) {
            log.warn("Short URL not found: {}", shortCode);
            throw new ShortenerException(ErrorCode.URL_NOT_FOUND, "Short URL not found");
        }

        ShortUrlInfo shortUrlInfo = shortUrlInfoOptional.get();
        LocalDateTime now = LocalDateTime.now();
        if (shortUrlInfo.getExpirationTime().isBefore(now)) {
            log.warn("Short URL has expired: {}", shortCode);
            throw new ShortenerException(ErrorCode.URL_EXPIRED, "Short URL has expired");
        }

        log.info("Short URL found: {}", shortUrlInfo);
        ResolveUrlResponse response = new ResolveUrlResponse();
        response.setOriginalUrl(shortUrlInfo.getLongUrl());
        response.setExpiresAt(shortUrlInfo.getExpirationTime());
        return response;
    }
}
