package org.skytads.mscliente.mappers;

import org.skytads.mscliente.dtos.messages.CriarClienteMessageDto;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.requests.ComprarMilhasRequestDto;
import org.skytads.mscliente.dtos.responses.*;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.models.TransacaoMilhas;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class ClienteMapper {
    public static Cliente toModel(AutocadastroRequestDto requestDto) {
        return new Cliente(
                null,
                requestDto.getCpf(),
                requestDto.getNome(),
                requestDto.getEmail(),
                null,
                requestDto.getSaldoMilhas() != null ? requestDto.getSaldoMilhas() : 0L,
                requestDto.getEndereco().getCep(),
                requestDto.getEndereco().getUf(),
                requestDto.getEndereco().getCidade(),
                requestDto.getEndereco().getBairro(),
                requestDto.getEndereco().getRua(),
                requestDto.getEndereco().getNumero(),
                requestDto.getEndereco().getComplemento(),
                null,
                null
        );
    }

    public static AutocadastroResponseDto toAutocadastroResponseDto(Cliente cliente) {
        return new AutocadastroResponseDto(
                cliente.getId(),
                cliente.getCpf(),
                cliente.getEmail(),
                cliente.getNome()
        );
    }

    public static ClienteResponseDto toClienteResponseDto(Cliente cliente) {
        EnderecoResponseDto endereco = new EnderecoResponseDto(
                cliente.getCep(),
                cliente.getUf(),
                cliente.getCidade(),
                cliente.getBairro(),
                cliente.getRua(),
                cliente.getNumero(),
                cliente.getComplemento()
        );

        return new ClienteResponseDto(
                cliente.getId(),
                cliente.getCpf(),
                cliente.getEmail(),
                cliente.getNome(),
                cliente.getSaldoMilhas(),
                endereco
        );
    }

    public static CriarClienteMessageDto toCriarClienteMessageDto(Cliente cliente) {
        return new CriarClienteMessageDto(
                cliente.getId().toString(),
                cliente.getCpf(),
                cliente.getEmail(),
                cliente.getSenha()
        );
    }

    public static ComprarMilhasResponseDto toComprarMilhasRequestDto(Long codigoCliente, Long quantidadeMilhas) {
        return new ComprarMilhasResponseDto(
            codigoCliente, quantidadeMilhas
        );
    }

    public static ExtratoMilhasResponseDto toClienteMilhasResponseDto(Cliente cliente, List<TransacaoMilhas> transacoes) {
        List<TransacaoMilhaResponseDto> transacoesDto = transacoes.stream().map(transacao ->
                new TransacaoMilhaResponseDto(
                        OffsetDateTime.of(transacao.getDataHora(), ZoneOffset.of("-03:00")).toString(),
                        transacao.getValorEmReais() != null ? transacao.getValorEmReais().floatValue() : null,
                        transacao.getQuantidadeMilhas().longValue(),
                        transacao.getDescricao(),
                        transacao.getCodigoReserva() != null ? Long.valueOf(transacao.getCodigoReserva()) : null,
                        transacao.getTipo()
                )
        ).collect(Collectors.toList());

        return new ExtratoMilhasResponseDto(
                cliente.getId(),
                cliente.getSaldoMilhas(),
                transacoesDto
        );
    }
}
