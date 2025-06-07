package com.dattb.shorturl.exception;

import com.dattb.shorturl.dto.BadResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * BusinessExceptionHandler
 * <p>
 * Author: Tran Ba Dat - <a href="https://econtract.dattb.com">Live demo</a>
 * Created: 4/22/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@ControllerAdvice
@Slf4j
public class BusinessExceptionHandler {

    @ExceptionHandler(ShortenerException.class)
    public ResponseEntity<BadResponse> handleShortenerException(ShortenerException e) {
        log.error("ShortenerException: {}", e.getMessage(), e);
        BadResponse badResponse = BadResponse.builder()
                .success(false)
                .code(e.getCode())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(badResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BadResponse> handleException(Exception e) {
        BadResponse badResponse = BadResponse.builder()
                .code(ErrorCode.ERROR.getCode())
                .message(ErrorCode.ERROR.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(badResponse);
    }
}
