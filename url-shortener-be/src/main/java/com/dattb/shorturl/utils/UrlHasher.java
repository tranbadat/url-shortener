package com.dattb.shorturl.utils;

import lombok.experimental.UtilityClass;

import java.security.MessageDigest;
import java.util.Base64;

/**
 * UrlHasher
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/24/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@UtilityClass
public class UrlHasher {
    public static String hashUrl(String url) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(url.getBytes("UTF-8"));
            return Base64.getEncoder().encodeToString(hashBytes); // or Hex
        } catch (Exception e) {
            throw new RuntimeException("Hashing error", e);
        }
    }
}
