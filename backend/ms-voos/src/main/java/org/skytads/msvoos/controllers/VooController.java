package org.skytads.msvoos.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.dtos.requests.AlterarEstadoVooRequestDto;
import org.skytads.msvoos.dtos.requests.CriarVooRequestDto;
import org.skytads.msvoos.dtos.responses.CriarVooResponseDto;
import org.skytads.msvoos.dtos.responses.VooResponseDto;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.mappers.AeroportoMapper;
import org.skytads.msvoos.mappers.VooMapper;
import org.skytads.msvoos.services.VooService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/voos")
public class VooController {

    private final VooService vooService;

    @PostMapping
    public ResponseEntity<CriarVooResponseDto> criarVoo(@RequestBody @Valid CriarVooRequestDto requestDto) {
        VooEntity voo = this.vooService.inserirVoo(
                OffsetDateTime.parse(requestDto.getData()).toLocalDateTime(),
                requestDto.getValorPassagem(),
                requestDto.getQuantidadePoltronasTotal(),
                requestDto.getQuantidadePoltronasOcupadas(),
                requestDto.getCodigoAeroportoOrigem(),
                requestDto.getCodigoAeroportoDestino()
        );
        return ResponseEntity.ok(VooMapper.toCriarVooResponseDto(voo));
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<VooResponseDto> findByCodigo(
            @PathVariable("codigo") Long codigo
    ) {
        VooEntity voo = vooService.findById(codigo);
        return ResponseEntity.ok(VooMapper.toVooResponseDto(voo));
    }

    @PatchMapping("/{codigo}/estado")
    public ResponseEntity<?> updateEstadoVoo(
            @PathVariable("codigo") Long codigo,
            @RequestBody @Valid AlterarEstadoVooRequestDto requestDto
    ) {
        VooEntity vooAtualizado = vooService.updateEstadoVoo(codigo, requestDto.getEstado());
        return ResponseEntity.ok(vooAtualizado);
    }

    @GetMapping("/origem/{aeroportoOrigemCodigo}")
    public ResponseEntity<List<VooEntity>> findByAeroportoOrigem(@PathVariable String aeroportoOrigemCodigo) {
        List<VooEntity> voos = vooService.findByAeroportoOrigem(aeroportoOrigemCodigo);
        return ResponseEntity.ok(voos);
    }

    @GetMapping("/destino/{aeroportoDestinoCodigo}")
    public ResponseEntity<List<VooEntity>> findByAeroportoDestino(@PathVariable String aeroportoDestinoCodigo) {
        List<VooEntity> voos = vooService.findByAeroportoDestino(aeroportoDestinoCodigo);
        return ResponseEntity.ok(voos);
    }
}
