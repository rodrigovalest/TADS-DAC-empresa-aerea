package org.skytads.msreserva.exceptions;

import org.skytads.msreserva.exceptions.SaldoMilhasInsuficienteException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(SaldoMilhasInsuficienteException.class)
    public ResponseEntity<Map<String,String>> handleSaldoInsuficiente(
            SaldoMilhasInsuficienteException ex) {

        return ResponseEntity.badRequest()
                            .body(Map.of("erro", "Saldo de milhas insuficiente"));
    }

    @ExceptionHandler(feign.FeignException.class)
    public ResponseEntity<Map<String,String>> handleFeign(feign.FeignException ex) {
        return ResponseEntity.status(502)
                            .body(Map.of("erro", "Serviço remoto indisponível"));
    }

}

