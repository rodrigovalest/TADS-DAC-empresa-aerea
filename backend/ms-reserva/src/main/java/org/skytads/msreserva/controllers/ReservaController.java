package org.skytads.msreserva.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.dtos.requests.CriarReservaRequestDto;
import org.skytads.msreserva.dtos.responses.CriarReservaResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @PostMapping
    public ResponseEntity<CriarReservaResponseDto> criarReserva(@RequestBody @Valid CriarReservaRequestDto requestDto) {
        return null;
    }
}
