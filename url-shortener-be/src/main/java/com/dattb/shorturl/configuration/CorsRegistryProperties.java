package com.dattb.shorturl.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * CorsRegistryProperties
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/27/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "cors")
public class CorsRegistryProperties {
    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private String exposedHeaders;
    private boolean allowCredentials;
}
