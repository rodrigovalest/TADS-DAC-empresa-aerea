package org.skytads.msfuncionarios.mappers;

import org.skytads.msfuncionarios.dto.CreateFuncionarioRequestDto;
import org.skytads.msfuncionarios.dto.FuncionarioResponseDto;
import org.skytads.msfuncionarios.model.Funcionario;

import java.util.List;

public class FuncionarioMapper {
    public static FuncionarioResponseDto toFuncionarioResponseDto(Funcionario funcionario) {
        return new FuncionarioResponseDto(
                funcionario.getId(), funcionario.getCpf(), funcionario.getEmail(), funcionario.getNome(), funcionario.getTelefone()
        );
    }

    public static List<FuncionarioResponseDto> toFuncionarioResponseDto(List<Funcionario> funcionarios) {
        return funcionarios.stream()
                .map(FuncionarioMapper::toFuncionarioResponseDto)
                .toList();
    }

    public static Funcionario toDomain(CreateFuncionarioRequestDto requestDto) {
        Funcionario funcionario = new Funcionario(
                requestDto.getCpf(), requestDto.getEmail(), requestDto.getNome(), requestDto.getTelefone(), requestDto.getSenha()
        );
        funcionario.setAtivo(true);
        return funcionario;
    }
}
