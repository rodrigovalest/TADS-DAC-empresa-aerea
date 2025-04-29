package org.skytads.msvoos.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.dtos.requests.CriarVooRequestDto;
import org.skytads.msvoos.entities.VooEntity;
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
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/voos")
public class VooController {

    private final VooService vooService;

@GetMapping
    public ResponseEntity<List<VooEntity>> findAll() {
        List<VooEntity> voos = vooService.findAll();
        return ResponseEntity.ok(voos);
    }

    @GetMapping("/origem/{aeroportoOrigemCodigo}")
    public ResponseEntity<List<VooEntity>> findByAeroportoOrigem(@PathVariable Long aeroportoOrigemCodigo) {
        List<VooEntity> voos = vooService.findByAeroportoOrigem(aeroportoOrigemCodigo);
        return ResponseEntity.ok(voos);
    }

    @GetMapping("/destino/{aeroportoDestinoCodigo}")
    public ResponseEntity<List<VooEntity>> findByAeroportoDestino(@PathVariable Long aeroportoDestinoCodigo) {
        List<VooEntity> voos = vooService.findByAeroportoDestino(aeroportoDestinoCodigo);
        return ResponseEntity.ok(voos);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<VooEntity> findByCodigo(@PathVariable Long codigo) {
        VooEntity voo = vooService.findByCodigo(codigo);
        return ResponseEntity.ok(voo);
    }

    @PostMapping
    public ResponseEntity<Void> criarVoo(@RequestBody @Valid CriarVooRequestDto requestDto) {
        this.vooService.inserirVoo(
                OffsetDateTime.parse(requestDto.getData()).toLocalDateTime(),
                requestDto.getValorPassagem(),
                requestDto.getQuantidadePoltronasTotal(),
                requestDto.getQuantidadePoltronasOcupadas(),
                requestDto.getCodigoAeroportoOrigem(),
                requestDto.getCodigoAeroportoDestino()
        );
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{codigo}/cancelar")
    public ResponseEntity<Void> cancelarVoo(@PathVariable Long codigo) {
        vooService.updateStatusToCancelado(codigo);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{codigo}/realizar")
    public ResponseEntity<Void> realizarVoo(@PathVariable Long codigo) {
        vooService.updateStatusToRealizado(codigo);
        return ResponseEntity.ok().build();
    }
}
