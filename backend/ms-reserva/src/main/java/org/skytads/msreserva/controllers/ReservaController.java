package org.skytads.msreserva.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.dtos.requests.CriarReservaRequestDto;
import org.skytads.msreserva.dtos.responses.ConsultaReservaResponseDto;
import org.skytads.msreserva.dtos.responses.CriarReservaResponseDto;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.mappers.ReservaMapper;
import org.skytads.msreserva.services.ReservaService;
import org.skytads.msreserva.usecases.CriarReservaUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final CriarReservaUseCase criarReservaUseCase;
    private final ReservaService reservaService;

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

    @GetMapping
    public ResponseEntity<List<ConsultaReservaResponseDto>> listarReservas() {
        List<ConsultaReservaResponseDto> reservas = reservaService.listarReservas();
        return ResponseEntity.ok(reservas);
    }

    @PostMapping("/{reservaId}/cancelar")
    public ResponseEntity<Void> cancelarReserva(@PathVariable Long reservaId) {
        this.reservaService.cancelarReservaSaga(reservaId);
        return ResponseEntity.noContent().build();
    }
}
