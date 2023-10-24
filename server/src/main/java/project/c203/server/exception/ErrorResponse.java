package project.c203.server.exception;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ErrorResponse {
    private String message;
    private List<String> details;
    private String errorCode;
}
