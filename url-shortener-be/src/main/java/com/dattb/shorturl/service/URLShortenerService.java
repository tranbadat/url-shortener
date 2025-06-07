package com.dattb.shorturl.service;

import com.dattb.shorturl.dto.ResolveUrlResponse;
import com.dattb.shorturl.dto.ShortenerRequest;
import com.dattb.shorturl.dto.ShortenerResponse;

/**
 * URLShortenerService
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/10/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
public interface URLShortenerService {
    /**
     * Shortens a long URL to a shorter version.
     *
     * @param request The request containing the long URL and optional parameters.
     * @return The ShortenerResponse containing the shortened URL and expiration time.
     */
    ShortenerResponse shortenURL(ShortenerRequest request);

    /**
     * Shortens a long URL to a shorter version.
     *
     * @param longUrl The original long URL.
     * @return The shortened URL.
     */
    ShortenerResponse shortenURL(String longUrl);

    /**
     * Shortens a long URL to a shorter version with a custom code and expiration time.
     *
     * @param longUrl        The original long URL.
     * @param shortCode      The custom shortened URL code.
     * @param expirationTime The expiration time in milliseconds.
     * @return The shortened URL.
     */
    ShortenerResponse shortenURL(String longUrl, String shortCode, long expirationTime);

    /**
     * Resolves a shortened URL back to its original long URL.
     *
     * @param shortCode The shortened URL code.
     * @return The original long URL or a message indicating it was not found.
     */
    ResolveUrlResponse resolveURL(String shortCode);
}
