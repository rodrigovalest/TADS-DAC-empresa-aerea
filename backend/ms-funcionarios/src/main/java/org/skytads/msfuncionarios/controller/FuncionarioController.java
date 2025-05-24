package org.skytads.msfuncionarios.controller;

import lombok.RequiredArgsConstructor;
import org.skytads.msfuncionarios.dto.*;
import org.skytads.msfuncionarios.mappers.FuncionarioMapper;
import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.services.FuncionarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @PostMapping
    public ResponseEntity<FuncionarioResponseDto> inserirFuncionario(@Valid @RequestBody CreateFuncionarioRequestDto requestDto) {
        Funcionario novoFuncionario = funcionarioService.inserirFuncionario(FuncionarioMapper.toDomain(requestDto));
        return ResponseEntity.status(HttpStatus.CREATED).body(FuncionarioMapper.toFuncionarioResponseDto(novoFuncionario));
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDto>> listarFuncionarios() {
        List<Funcionario> funcionarios = funcionarioService.listarFuncionarios();
        return ResponseEntity.ok(FuncionarioMapper.toFuncionarioResponseDto(funcionarios));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> buscarPorId(
            @PathVariable("id") Long id
    ) {
        return funcionarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDto> atualizarFuncionario(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateFuncionarioRequestDto requestDto) {
        Funcionario funcionarioAtualizado = funcionarioService.atualizarFuncionario(id, requestDto);
        return ResponseEntity.ok(FuncionarioMapper.toFuncionarioResponseDto(funcionarioAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerFuncionario(
            @PathVariable("id") Long id
    ) {
        this.funcionarioService.removerFuncionario(id);
        return ResponseEntity.noContent().build();
    }
}
