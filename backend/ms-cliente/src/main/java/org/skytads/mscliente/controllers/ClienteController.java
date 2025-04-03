package org.skytads.mscliente.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.mappers.ClienteMapper;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.requests.ValidateCredentialsRequestDto;
import org.skytads.mscliente.dtos.responses.AutocadastroResponseDto;
import org.skytads.mscliente.dtos.responses.ClienteResponseDto;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    public ResponseEntity<AutocadastroResponseDto> autocadastro(@RequestBody @Valid AutocadastroRequestDto requestDto) {
        Cliente novoCliente = this.clienteService.autocadastro(ClienteMapper.toModel(requestDto));
        return ResponseEntity.ok(ClienteMapper.toAutocadastroResponseDto(novoCliente));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ClienteResponseDto> findClienteByEmail(@PathVariable("email") String email) {
        Cliente cliente = this.clienteService.findClienteByEmail(email);
        return ResponseEntity.ok(ClienteMapper.toClienteResponseDto(cliente));
    }

    @PostMapping("/validate")
    public ResponseEntity<ClienteResponseDto> validateCredentials(@RequestBody @Valid ValidateCredentialsRequestDto requestDto) {
        Cliente cliente = this.clienteService.validateCredentials(requestDto.getEmail(), requestDto.getSenha());
        return ResponseEntity.ok(ClienteMapper.toClienteResponseDto(cliente));
    }
}
