package com.dattb.shorturl.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * ShortUrlInfo
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/15/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Entity
@Table(name = "short_url_info")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ShortUrlInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "short_code", unique = true, nullable = false)
    private String shortCode;

    @Column(name = "long_url", nullable = false)
    private String longUrl;

    @Column(name = "long_url_hash", nullable = false)
    private String longUrlHash;

    @Column(name = "expiration_time", nullable = false)
    private LocalDateTime expirationTime;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private boolean isDeleted = false;

    // Getters and Setters
    @Override
    public String toString() {
        return "ShortUrlInfo{" +
                "id=" + id +
                ", shortCode='" + shortCode + '\'' +
                ", longUrl='" + longUrl + '\'' +
                ", expirationTime=" + expirationTime +
                ", createdAt=" + createdAt +
                ", userId='" + userId + '\'' +
                '}';
    }
}
