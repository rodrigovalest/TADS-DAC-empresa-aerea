package org.skytads.mscliente.controllers;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.requests.ComprarMilhasRequestDto;
import org.skytads.mscliente.dtos.responses.*;
import org.skytads.mscliente.mappers.ClienteMapper;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.models.TransacaoMilhas;
import org.skytads.mscliente.services.ClienteService;
import org.skytads.mscliente.services.TransacaoMilhasService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
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
        AutocadastroResponseDto response = ClienteMapper.toAutocadastroResponseDto(novoCliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

    @GetMapping("/{codigo_cliente}/milhas")
    public ResponseEntity<ExtratoMilhasResponseDto> extratoMilhas(
            @PathVariable("codigo_cliente") Long codigoCliente
    ) {
        Cliente cliente = this.clienteService.findClienteById(codigoCliente);
        List<TransacaoMilhas> transacoes = this.transacaoMilhasService.findAllTransacaoMilhasByClienteId(codigoCliente);
        return ResponseEntity.ok(ClienteMapper.toClienteMilhasResponseDto(cliente, transacoes));
    }


    @GetMapping("/{codigo_cliente}/reservas")
    public ResponseEntity<List<ReservaResponseDto>> getReservasByCliente(@PathVariable("codigo_cliente") Long codigoCliente) {
        List<ReservaResponseDto> reservas = clienteService.getReservasByCliente(codigoCliente);

        if (reservas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(reservas);
    }
}
