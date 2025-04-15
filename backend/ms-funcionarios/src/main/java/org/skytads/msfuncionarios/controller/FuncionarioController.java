package org.skytads.msfuncionarios.controller;

import org.skytads.msfuncionarios.dto.FuncionarioDTO;
import org.skytads.msfuncionarios.dto.FuncionarioUpdateDTO;
import org.skytads.msfuncionarios.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {
    
    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<FuncionarioDTO>> listarFuncionarios() {
        List<FuncionarioDTO> funcionarios = funcionarioService.listarFuncionarios();
        return ResponseEntity.ok(funcionarios);
    }
    
    @GetMapping("/{cpf}")
    public ResponseEntity<FuncionarioDTO> buscarPorCpf(@PathVariable String cpf) {
        return funcionarioService.buscarPorCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<FuncionarioDTO> inserirFuncionario(@Valid @RequestBody FuncionarioDTO funcionarioDTO) {
        FuncionarioDTO novoFuncionario = funcionarioService.inserirFuncionario(funcionarioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoFuncionario);
    }
    
    @PutMapping("/{cpf}")
    public ResponseEntity<FuncionarioDTO> atualizarFuncionario(
            @PathVariable String cpf,
            @Valid @RequestBody FuncionarioUpdateDTO funcionarioUpdateDTO) {
        try {
            FuncionarioDTO funcionarioAtualizado = funcionarioService.atualizarFuncionario(cpf, funcionarioUpdateDTO);
            return ResponseEntity.ok(funcionarioAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> removerFuncionario(@PathVariable String cpf) {
        try {
            funcionarioService.removerFuncionario(cpf);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}