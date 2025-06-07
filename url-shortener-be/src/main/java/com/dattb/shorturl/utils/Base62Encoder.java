package com.dattb.shorturl.utils;

/**
 * Base62Encoder
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/10/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
public class Base62Encoder {
    private Base62Encoder() {
        // Private constructor to prevent instantiation
        throw new UnsupportedOperationException("Utility class");
    }

    private static final String CHAR_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Encode long number to Base62
    public static String encode(long num) {
        if (num == 0) return String.valueOf(CHAR_SET.charAt(0));

        StringBuilder encoded = new StringBuilder();
        while (num > 0) {
            int remainder = (int) (num % 62);
            encoded.append(CHAR_SET.charAt(remainder));
            num /= 62;
        }

        return encoded.reverse().toString();
    }

    // Decode Base62 string back to long
    public static long decode(String base62) {
        long num = 0;
        for (char c : base62.toCharArray()) {
            num = num * 62 + CHAR_SET.indexOf(c);
        }
        return num;
    }
}
