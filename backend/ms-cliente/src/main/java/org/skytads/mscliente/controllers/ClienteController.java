package org.skytads.mscliente.controllers;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.responses.AutocadastroResponseDto;
import org.skytads.mscliente.dtos.responses.ClienteMilhasResponseDto;
import org.skytads.mscliente.dtos.responses.ClienteResponseDto;
import org.skytads.mscliente.mappers.ClienteMapper;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.services.ClienteService;
import org.skytads.mscliente.services.TransacaoMilhasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final TransacaoMilhasService transacaoMilhasService;
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
    
    @PutMapping("/{codigo}/milhas")
    public ResponseEntity<ClienteMilhasResponseDto> comprarMilhas(@PathVariable String codigo, @RequestBody Map<String, Integer> body) {
        Integer quantidade = body.get("quantidade");
        transacaoMilhasService.comprarMilhas(codigo, quantidade);
        Long saldoMilhas = clienteService.buscarSaldoMilhas(codigo);
        List<?> transacoes = transacaoMilhasService.listarExtrato(codigo);
        ClienteMilhasResponseDto dto = new ClienteMilhasResponseDto(codigo, saldoMilhas, transacoes);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/{codigo}/milhas")
    public ResponseEntity<ClienteMilhasResponseDto> extratoMilhas(@PathVariable String codigo) {
        Long saldoMilhas = clienteService.buscarSaldoMilhas(codigo);
        List<?> transacoes = transacaoMilhasService.listarExtrato(codigo);
        ClienteMilhasResponseDto dto = new ClienteMilhasResponseDto(codigo, saldoMilhas, transacoes);
        return ResponseEntity.ok(dto);
    }
}