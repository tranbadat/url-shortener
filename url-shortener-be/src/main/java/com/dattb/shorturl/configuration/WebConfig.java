package com.dattb.shorturl.configuration;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/22/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Configuration
@RequiredArgsConstructor
public class WebConfig {
    private final CorsRegistryProperties corsRegistryProperties;
    /**
     * Configure CORS settings for the application.
     *
     * @return WebMvcConfigurer instance with CORS configuration.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Allow all endpoints
                        .allowedOrigins(StringUtils.split(corsRegistryProperties.getAllowedOrigins(),",")) // Allow only this origin
                        .allowedMethods(StringUtils.split(corsRegistryProperties.getAllowedMethods(),",")) // Allow specific HTTP methods
                        .allowedHeaders(StringUtils.split(corsRegistryProperties.getAllowedHeaders(),",")) // Allow all headers
                        .allowCredentials(true); // Allow credentials (e.g., cookies)
            }
        };
    }
}
