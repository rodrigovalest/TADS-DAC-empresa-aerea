package org.skytads.msreserva.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.skytads.msreserva.dtos.requests.AlterarEstadoReservaRequest;
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
    private final ReservaMapper reservaMapper;

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
                .body(reservaMapper.toCriarReservaResponseDto(reserva));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CriarReservaResponseDto> obterReserva(@PathVariable Long id) {
        var reserva = reservaService.buscarPorId(id);
        return ResponseEntity.ok(reservaMapper.toCriarReservaResponseDto(reserva));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<CriarReservaResponseDto> alterarEstado(
            @PathVariable Long id,
            @RequestBody @Valid AlterarEstadoReservaRequest body) {

        var reserva = reservaService.alterarEstado(id, body.getEstado());
        return ResponseEntity.ok(reservaMapper.toCriarReservaResponseDto(reserva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirReserva(@PathVariable Long id) {
        reservaService.excluir(id);
        return ResponseEntity.ok().build();
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
