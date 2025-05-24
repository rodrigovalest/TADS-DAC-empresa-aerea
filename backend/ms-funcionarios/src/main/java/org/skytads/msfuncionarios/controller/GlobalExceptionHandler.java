package org.skytads.msfuncionarios.controller;

import lombok.extern.slf4j.Slf4j;
import org.skytads.msfuncionarios.dto.ErrorResponseDto;
import org.skytads.msfuncionarios.exception.FuncionarioConflictException;
import org.skytads.msfuncionarios.exception.FuncionarioNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

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

    @ExceptionHandler(FuncionarioConflictException.class)
    private ResponseEntity<ErrorResponseDto> funcionarioConflictExceptionHandler(
            FuncionarioConflictException e
    ) {
        log.info("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.CONFLICT, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(FuncionarioNotFoundException.class)
    private ResponseEntity<ErrorResponseDto> funcionarioNotFoundExceptionHandler(
            FuncionarioNotFoundException e
    ) {
        log.info("{} | {} | {}", String.valueOf(e.getCause()), e.getMessage(), e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }
}
