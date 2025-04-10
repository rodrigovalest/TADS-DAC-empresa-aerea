package org.skytads.mscliente.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.mappers.ClienteMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
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
    
    @GetMapping
    public ResponseEntity<List<ClienteResponseDto>> findAll() {
        List<Cliente> clientes = this.clienteService.findAllClientes();
        List<ClienteResponseDto> clientesDto = clientes.stream()
                .map(ClienteMapper::toClienteResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(clientesDto);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDto> findById(@PathVariable("id") Long id) {
        Cliente cliente = this.clienteService.findClienteById(id);
        return ResponseEntity.ok(ClienteMapper.toClienteResponseDto(cliente));
    }
}
