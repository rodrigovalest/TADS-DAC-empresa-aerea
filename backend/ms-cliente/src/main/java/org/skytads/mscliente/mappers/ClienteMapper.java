package org.skytads.mscliente.mappers;

import org.skytads.mscliente.dtos.messages.CriarClienteMessageDto;
import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.requests.ComprarMilhasRequestDto;
import org.skytads.mscliente.dtos.responses.AutocadastroResponseDto;
import org.skytads.mscliente.dtos.responses.ClienteResponseDto;
import org.skytads.mscliente.dtos.responses.ComprarMilhasResponseDto;
import org.skytads.mscliente.dtos.responses.EnderecoResponseDto;
import org.skytads.mscliente.models.Cliente;

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
                cliente.getId().toString(),
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
}
