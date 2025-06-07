package com.dattb.shorturl.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import static com.dattb.shorturl.exception.ErrorCode.SUCCESS;

/**
 * ShortenerRequest
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/28/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ResolveUrlResponse extends BadResponse {
    private String originalUrl;
    private LocalDateTime expiresAt;

    public ResolveUrlResponse() {
        super(true, SUCCESS.getCode(), SUCCESS.getMessage());
    }

    @Override
    public String toString() {
        //make sure to not include sensitive information in the log
        // store as json string
        return "ResolveUrlResponse{" +
                "url='" + originalUrl + '\'' +
                ", expirationTime=" + expiresAt +
                '}';
    }
}
