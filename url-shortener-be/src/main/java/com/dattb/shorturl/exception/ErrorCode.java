package com.dattb.shorturl.exception;

import lombok.Getter;

/**
 * ErrorCode
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/22/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Getter
public enum ErrorCode {
    SUCCESS("00", "Success"),
    ERROR("99", "Internal server error"),
    INVALID_REQUEST("98", "Invalid request"),
    INVALID_URL("01", "Invalid URL"),
    URL_NOT_FOUND("02", "URL not found"),
    URL_ALREADY_EXISTS("03", "URL already exists"),
    URL_SHORTENING_FAILED("04", "URL shortening failed"),
    URL_DELETION_FAILED("05", "URL deletion failed"),
    URL_EXPIRATION_FAILED("06", "URL expiration failed"),
    URL_RESOLUTION_FAILED("07", "URL resolution failed"),
    SHORT_CODE_EXCEEDS_MAX_LENGTH("08", "Short code exceeds maximum length"),
    SHORT_CODE_ALREADY_EXISTS("09", "Short code already exists"),
    URL_EXPIRED("10", "URL expired"),

    ;

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
