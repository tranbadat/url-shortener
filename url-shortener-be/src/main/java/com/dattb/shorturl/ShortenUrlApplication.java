package com.dattb.shorturl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class ShortenUrlApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShortenUrlApplication.class, args);
    }

}
