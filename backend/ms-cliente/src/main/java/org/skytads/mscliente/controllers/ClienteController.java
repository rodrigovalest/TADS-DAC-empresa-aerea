package org.skytads.mscliente.controllers;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.requests.ComprarMilhasRequestDto;
import org.skytads.mscliente.dtos.requests.TransacaoMilhasDTO;
import org.skytads.mscliente.dtos.responses.AutocadastroResponseDto;
import org.skytads.mscliente.dtos.responses.ClienteMilhasResponseDto;
import org.skytads.mscliente.dtos.responses.ClienteResponseDto;
import org.skytads.mscliente.dtos.responses.ComprarMilhasResponseDto;
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
    
    @PutMapping("/{codigo_cliente}/milhas")
    public ResponseEntity<ComprarMilhasResponseDto> comprarMilhas(
            @PathVariable("codigo_cliente") Long codigoCliente,
            @RequestBody ComprarMilhasRequestDto requestDto
    ) {
        Long saldoMilhas = this.transacaoMilhasService.comprarMilhas(
                codigoCliente, Math.toIntExact(requestDto.getQuantidade())
        );

        return ResponseEntity.ok(
                ClienteMapper.toComprarMilhasRequestDto(codigoCliente, saldoMilhas)
        );
    }
    
//    @GetMapping("/{codigo_cliente}/milhas")
//    public ResponseEntity<ClienteMilhasResponseDto> extratoMilhas(
//            @PathVariable("codigo_cliente") Long codigoCliente
//    ) {
//        Long saldoMilhas = clienteService.buscarSaldoMilhas(codigoCliente);
//        List<?> transacoes = transacaoMilhasService.listarExtrato(codigoCliente);
//        ClienteMilhasResponseDto dto = new ClienteMilhasResponseDto(codigoCliente, saldoMilhas, transacoes);
//        return ResponseEntity.ok(dto);
//    }
}