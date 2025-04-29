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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/voos")
public class VooController {

    private final VooService vooService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> findByFilters(
            @RequestParam String data,
            @RequestParam Long origem,
            @RequestParam Long destino) {

        LocalDateTime dataParsed = LocalDateTime.parse(data, DateTimeFormatter.ISO_DATE_TIME);
        List<VooEntity> voos = vooService.findByFilters(dataParsed, origem, destino);

        Map<String, Object> response = new HashMap<>();
        response.put("data", data);
        response.put("origem", origem);
        response.put("destino", destino);
        response.put("voos", voos);

        return ResponseEntity.ok(response);
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
    public ResponseEntity<Optional<VooEntity>> findByCodigo(@PathVariable Long codigo) {
        Optional<VooEntity> voo = vooService.findByCodigo(codigo);
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

    @PatchMapping("/{codigo}/estado")
    public ResponseEntity<Map<String, Object>> updateEstadoVoo(
            @PathVariable Long codigo,
            @RequestBody Map<String, String> estadoRequest) {
    
        String novoEstado = estadoRequest.get("estado");
        VooEntity vooAtualizado = vooService.updateEstadoVoo(codigo, novoEstado);
    
        Map<String, Object> response = new HashMap<>();
        response.put("codigo", vooAtualizado.getCodigo());
        response.put("estado", vooAtualizado.getStatusVoo().toString());
    
        return ResponseEntity.ok(response);
    }
}
