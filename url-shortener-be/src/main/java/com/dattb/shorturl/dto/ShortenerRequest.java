package com.dattb.shorturl.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * ShortenerRequest
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/10/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Getter
@Setter
public class ShortenerRequest {
    @NotBlank(message = "Long URL cannot be blank")
    private String url;
    private String shortCode;
    private long expirationTime;

    @Override
    public String toString() {
        //make sure to not include sensitive information in the log
        // store as json string
        return "ShortenerRequest{" +
                "longUrl='" + url + '\'' +
                ", shortCode='" + shortCode + '\'' +
                ", expirationTime=" + expirationTime +
                '}';
    }
}
