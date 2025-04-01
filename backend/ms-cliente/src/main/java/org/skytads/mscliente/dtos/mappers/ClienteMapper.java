package org.skytads.mscliente.dtos.mappers;

import org.skytads.mscliente.dtos.requests.AutocadastroRequestDto;
import org.skytads.mscliente.dtos.responses.AutocadastroResponseDto;
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

    public static AutocadastroResponseDto toDto(Cliente novoCliente) {
        return new AutocadastroResponseDto(
                novoCliente.getId(),
                novoCliente.getCpf(),
                novoCliente.getEmail(),
                novoCliente.getNome()
        );
    }
}
