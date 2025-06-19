package org.skytads.msreserva.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.skytads.msreserva.dtos.requests.AlterarEstadoReservaRequestDto;
import org.skytads.msreserva.dtos.requests.CriarReservaRequestDto;
import org.skytads.msreserva.dtos.responses.ConsultaReservaResponseDto;
import org.skytads.msreserva.dtos.responses.CriarReservaResponseDto;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.skytads.msreserva.mappers.ReservaMapper;
import org.skytads.msreserva.services.ReservaResumoService;
import org.skytads.msreserva.services.ReservaService;
import org.skytads.msreserva.usecases.AlterarEstadoReservaUseCase;
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
    private final ReservaResumoService reservaResumoService;
    private final AlterarEstadoReservaUseCase alterarEstadoReservaUseCase;

    @PostMapping
    public ResponseEntity<CriarReservaResponseDto> criarReserva(@RequestBody @Valid CriarReservaRequestDto requestDto) {
        ReservaEntity reserva = this.criarReservaUseCase.execute(
                requestDto.getValor(),
                requestDto.getMilhas(),
                requestDto.getQuantidadePoltronas(),
                requestDto.getCodigoCliente(),
                requestDto.getCodigoVoo()
        );

        ReservaResumoEntity resumo = this.reservaResumoService.findByCodigoReserva(reserva.getCodigo());

        return ResponseEntity
                .created(URI.create("/reservas/" + reserva.getCodigo()))
                .body(reservaMapper.toCriarReservaResponseDto(reserva, resumo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CriarReservaResponseDto> obterReserva(
            @PathVariable("id") Long id
    ) {
        ReservaEntity reserva = this.reservaService.buscarPorCodigo(id);
        ReservaResumoEntity resumo = this.reservaResumoService.findByCodigoReserva(reserva.getCodigo());
        return ResponseEntity.ok(reservaMapper.toCriarReservaResponseDto(reserva, resumo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CriarReservaResponseDto> excluirReserva(@PathVariable("id") Long id) {
        ReservaEntity reserva = this.reservaService.cancelarReservaSaga(id);
        ReservaResumoEntity resumo = this.reservaResumoService.findByCodigoReserva(reserva.getCodigo());
        return ResponseEntity.ok(reservaMapper.toCriarReservaResponseDto(reserva, resumo));
    }

    @GetMapping
    public ResponseEntity<List<ConsultaReservaResponseDto>> listarReservas() {
        List<ConsultaReservaResponseDto> reservas = reservaService.listarReservas();
        return ResponseEntity.ok(reservas);
    }

    @PostMapping("/{reservaId}/cancelar")
    public ResponseEntity<Void> cancelarReserva(@PathVariable("id") Long reservaId) {
        ReservaEntity reserva = this.reservaService.cancelarReservaSaga(reservaId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<CriarReservaResponseDto> alterarEstado(
            @PathVariable("id") Long id,
            @RequestBody @Valid AlterarEstadoReservaRequestDto dto
    ) {
        ReservaEntity reserva = this.alterarEstadoReservaUseCase.execute(id, dto.getEstado());
        ReservaResumoEntity resumo = this.reservaResumoService.findByCodigoReserva(reserva.getCodigo());
        return ResponseEntity.ok(reservaMapper.toCriarReservaResponseDto(reserva, resumo));
    }
}
