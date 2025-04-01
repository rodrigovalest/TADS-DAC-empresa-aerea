package org.skytads.mscliente.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.dtos.mappers.ClienteMapper;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.responses.AutocadastroResponseDto;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping("/clientes")
    public ResponseEntity<AutocadastroResponseDto> autocadastro(@RequestBody @Valid AutocadastroRequestDto requestDto) {
        Cliente novoCliente = this.clienteService.autocadastro(ClienteMapper.toModel(requestDto));
        return ResponseEntity.ok(ClienteMapper.toDto(novoCliente));
    }
}
