package com.dattb.shorturl.dto;

import com.dattb.shorturl.exception.ErrorCode;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * BadResponse
 * <p>
 * Author: Tran Ba Dat - <a href="https://shorturl.tranbadat.vn">Live demo</a>
 * Created: 4/22/2025
 * Version: 1.0.0
 * <p>
 * Description:
 */
@Data
@Builder
public class BadResponse {
    @Builder.Default
    private boolean success = true;
    @Builder.Default
    private String code = ErrorCode.SUCCESS.getCode();
    @Builder.Default
    private String message = ErrorCode.SUCCESS.getMessage();
}