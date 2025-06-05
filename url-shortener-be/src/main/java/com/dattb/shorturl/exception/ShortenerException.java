package com.dattb.shorturl.exception;

import lombok.Getter;

/**
 * ShortenerException
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/22/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Getter
public class ShortenerException extends RuntimeException {
    private final String code;
    private final String message;

    public ShortenerException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
        this.message = message;
    }

}
