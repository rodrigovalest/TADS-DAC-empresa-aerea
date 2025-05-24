package org.skytads.msreserva.controllers;

import feign.FeignException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.MDC;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.dtos.responses.ErrorResponseDto;
import org.skytads.msreserva.exceptions.ReservaNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ErrorResponseDto> methodArgumentNotValidExceptionHandler(
            MethodArgumentNotValidException e,
            BindingResult bindingResult
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.UNPROCESSABLE_ENTITY, "invalid fields", bindingResult);
        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(RuntimeException.class)
    private ResponseEntity<ErrorResponseDto> runtimeExceptionHandler(
            RuntimeException e,
            HttpServletRequest request
    ) {
        log.error("Unhandled exception occurred | method={} | path={} | exception={} | message={}",
                request.getMethod(),
                request.getRequestURI(),
                e.getClass().getSimpleName(),
                e.getMessage(),
                e
        );

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    private ResponseEntity<ErrorResponseDto> noResourceFoundExceptionHandler(
            NoResourceFoundException e,
            HttpServletRequest request
    ) {
        log.info("Resource not found | method={} | path={} | exception={} | message={}",
                request.getMethod(),
                request.getRequestURI(),
                e.getClass().getSimpleName(),
                e.getMessage()
        );

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(ReservaNotFoundException.class)
    private ResponseEntity<ErrorResponseDto> reservaNotFoundExceptionHandler(
            ReservaNotFoundException e,
            HttpServletRequest request
    ) {
        log.error("Reserva not found | method={} | path={} | exception={} | message={} | codigoReserva={}",
                request.getMethod(),
                request.getRequestURI(),
                e.getClass().getSimpleName(),
                e.getMessage(),
                e.getCodigoReserva(),
                e
        );

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(FeignException.class)
    private ResponseEntity<ErrorResponseDto> feignExceptionHandler(
            FeignException e
    ) {
        log.error("Feign exception | {}", e.getMessage());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.BAD_REQUEST, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }
}
