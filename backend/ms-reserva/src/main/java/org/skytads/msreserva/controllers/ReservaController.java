package org.skytads.msreserva.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.skytads.msreserva.dtos.requests.CriarReservaRequestDto;
import org.skytads.msreserva.dtos.responses.ConsultaReservaResponseDto;
import org.skytads.msreserva.dtos.responses.CriarReservaResponseDto;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    @PostMapping
    public ResponseEntity<CriarReservaResponseDto> criarReserva(@RequestBody @Valid CriarReservaRequestDto requestDto) {
        this.reservaService.criarReserva(
                requestDto.getValor(),
                requestDto.getMilhas(),
                requestDto.getQuantidadePoltronas(),
                requestDto.getCodigoCliente(),
                requestDto.getCodigoVoo()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultaReservaResponseDto> consultarReserva(@PathVariable("id") Long id) {
        ConsultaReservaResponseDto dto = reservaService.consultarReserva(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarReserva(@PathVariable("id") Long id) {
        reservaService.cancelarReserva(id);
        return ResponseEntity.ok().build();
    }
//TODO
 //   @PutMapping("/{id}/estado")
//    public ResponseEntity<Void> mudarEstadoReserva(
//            @PathVariable("id") Long id,
//            @RequestBody @Valid MudarEstadoReservaRequest request) {
//        reservaService.mudarEstadoReserva(id, request.getEstado());
//        return ResponseEntity.ok().build();
//    }
}
