package org.skytads.msreserva.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.dtos.requests.CriarReservaRequestDto;
import org.skytads.msreserva.dtos.responses.CriarReservaResponseDto;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.mappers.ReservaMapper;
import org.skytads.msreserva.usecases.CriarReservaUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final CriarReservaUseCase criarReservaUseCase;

    @PostMapping
    public ResponseEntity<CriarReservaResponseDto> criarReserva(@RequestBody @Valid CriarReservaRequestDto requestDto) {
        ReservaEntity reserva = this.criarReservaUseCase.execute(
                requestDto.getValor(),
                requestDto.getMilhas(),
                requestDto.getQuantidadePoltronas(),
                requestDto.getCodigoCliente(),
                requestDto.getCodigoVoo()
        );

        return ResponseEntity
                .created(URI.create("/reservas/" + reserva.getCodigo()))
                .body(ReservaMapper.toCriarReservaResponseDto(reserva));
    }
}
