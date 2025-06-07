package com.dattb.shorturl.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * ShortenerProperties
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/10/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "shortener")
public class ShortenerProperties {

    // Getters and Setters
    private String domain;
    private int expireDays;
    private boolean enabled;
    private int maxLength;
    private int secretKey;

}
