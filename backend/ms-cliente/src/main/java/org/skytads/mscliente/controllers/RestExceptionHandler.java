package org.skytads.mscliente.controllers;

import lombok.extern.slf4j.Slf4j;
import org.skytads.mscliente.dtos.responses.ErrorResponseDto;
import org.skytads.mscliente.exceptions.BadCredentialsException;
import org.skytads.mscliente.exceptions.ClienteNaoEncontradoException;
import org.springframework.dao.DataIntegrityViolationException;
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
            RuntimeException e
    ) {
        log.error("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    private ResponseEntity<ErrorResponseDto> dataIntegrityViolationExceptionHandler(
            DataIntegrityViolationException e
    ) {
        log.info("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.CONFLICT, "email or cpf already registered");
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(ClienteNaoEncontradoException.class)
    private ResponseEntity<ErrorResponseDto> clienteNaoEncontradoExceptionHandler(
            ClienteNaoEncontradoException e
    ) {
        log.info("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    private ResponseEntity<ErrorResponseDto> noResourceFoundExceptionHandler(
            NoResourceFoundException e
    ) {
        log.info("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(BadCredentialsException.class)
    private ResponseEntity<ErrorResponseDto> badCredentialsExceptionHandler(
            BadCredentialsException e
    ) {
        log.info("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.UNAUTHORIZED, "bad credentials");
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }
}
