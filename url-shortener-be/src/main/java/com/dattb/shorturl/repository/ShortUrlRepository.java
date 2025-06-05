package com.dattb.shorturl.repository;

import com.dattb.shorturl.entity.ShortUrlInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * ShortUrlRepository
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/15/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
public interface ShortUrlRepository extends JpaRepository<ShortUrlInfo, String> {
    /**
     * Find a ShortUrl by its short code.
     *
     * @param shortCode The short code to search for.
     * @return The ShortUrl object if found, otherwise null.
     */
    Optional<ShortUrlInfo> findByShortCode(String shortCode);

    /**
     * Find a ShortUrl by its long URL.
     *
     * @param longUrl The long URL to search for.
     * @return The ShortUrl object if found, otherwise null.
     */
    Optional<ShortUrlInfo> findByLongUrl(String longUrl);

    /**
     * Check existence of a ShortUrl by its short code.
     *
     * @param shortCode The short code to check.
     * @return true if exists, otherwise false.
     */
    boolean existsByShortCode(String shortCode);

    /**
     * Check existence of a ShortUrl by its long URL.
     *
     * @param longUrl The long URL to check.
     * @return true if exists, otherwise false.
     */
    boolean existsByLongUrlHash(String longUrl);
}
