package org.skytads.msvoos.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.dtos.requests.AlterarEstadoVooRequestDto;
import org.skytads.msvoos.dtos.requests.CriarReservaVooRequestDto;
import org.skytads.msvoos.dtos.requests.CriarVooRequestDto;
import org.skytads.msvoos.dtos.requests.ListarVooParamsRequestDto;
import org.skytads.msvoos.dtos.responses.CriarReservaVooResponseDto;
import org.skytads.msvoos.dtos.responses.CriarVooResponseDto;
import org.skytads.msvoos.dtos.responses.ListarVoosPorParamsResponseDto;
import org.skytads.msvoos.dtos.responses.VooResponseDto;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.mappers.VooMapper;
import org.skytads.msvoos.services.VooService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(VooMapper.toCriarVooResponseDto(voo));
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

    @PutMapping("/{codigo}/reservar-poltronas")
    public ResponseEntity<CriarReservaVooResponseDto> criarReservaReservarPoltronasVoo(
            @PathVariable("codigo") Long codigo,
            @RequestBody @Valid CriarReservaVooRequestDto dto
    ) {
        VooEntity voo = this.vooService.reservarPoltronas(codigo, dto.getQuantidadePoltronas());
        return ResponseEntity.ok(VooMapper.toCriarReservaVooResponseDto(voo));
    }

    @GetMapping
    public ResponseEntity<ListarVoosPorParamsResponseDto> listarVoosPorParametros(
           ListarVooParamsRequestDto params
    ) {
        List<VooEntity> voos = this.vooService.buscarVoosPorParametros(
                params.getOrigem(),
                params.getDestino(),
                params.getData(),
                params.getInicio(),
                params.getFim()
        );

        return ResponseEntity.ok(VooMapper.toListarVooPorParamsResponseDto(
                params.getOrigem(),
                params.getDestino(),
                params.getInicio(),
                params.getFim(),
                params.getData(),
                voos
        ));
    }
}
