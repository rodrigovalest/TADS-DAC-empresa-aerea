package org.skytads.msvoos.controllers;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.dtos.responses.AeroportoResponseDto;
import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.mappers.AeroportoMapper;
import org.skytads.msvoos.services.AeroportoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/aeroportos")
public class AeroportoController {

    private final AeroportoService aeroportoService;

    @GetMapping
    public ResponseEntity<List<AeroportoResponseDto>> findAll() {
        List<AeroportoEntity> aeroportoEntityList = this.aeroportoService.findAll();
        return ResponseEntity.ok(AeroportoMapper.toAeroportoResponseDto(aeroportoEntityList));
    }
}
