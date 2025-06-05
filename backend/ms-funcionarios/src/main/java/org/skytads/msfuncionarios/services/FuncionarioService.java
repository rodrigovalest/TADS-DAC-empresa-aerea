package org.skytads.msfuncionarios.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msfuncionarios.dto.FuncionarioDTO;
import org.skytads.msfuncionarios.dto.FuncionarioUpdateDTO;
import org.skytads.msfuncionarios.dto.CreateFuncionarioRequestDto;
import org.skytads.msfuncionarios.dto.UpdateFuncionarioRequestDto;
import org.skytads.msfuncionarios.exception.FuncionarioConflictException;
import org.skytads.msfuncionarios.exception.FuncionarioNotFoundException;
import org.skytads.msfuncionarios.messaging.RabbitMQProducer;
import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    private final RabbitMQProducer rabbitMQProducer;

    public List<Funcionario> listarFuncionarios() {
        return funcionarioRepository.findByAtivoTrueOrderByNomeAsc();
    }

    public Optional<FuncionarioDTO> buscarPorId(Long id) {
        return funcionarioRepository.findById(id)
                .filter(Funcionario::isAtivo)
                .map(this::convertToDTO);
    }

    @Transactional
    public Funcionario inserirFuncionario(Funcionario funcionario) {
        if (funcionarioRepository.existsByCpf(funcionario.getCpf())) {
            throw new FuncionarioConflictException("Já existe um funcionário com este CPF");
        }

        if (funcionarioRepository.existsByEmail(funcionario.getEmail())) {
            throw new FuncionarioConflictException("Já existe um funcionário com este e-mail");
        }

        Funcionario savedFuncionario = this.funcionarioRepository.save(funcionario);

        this.rabbitMQProducer.enviarParaCriacaoUsuario(
                savedFuncionario.getId(), savedFuncionario.getCpf(), savedFuncionario.getEmail(), savedFuncionario.getSenha()
        );

        return savedFuncionario;
    }

    @Transactional
    public Funcionario atualizarFuncionario(Long id, UpdateFuncionarioRequestDto requestDto) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new FuncionarioNotFoundException("Funcionário não encontrado"));

        if (!funcionario.isAtivo()) {
            throw new FuncionarioNotFoundException("Funcionário não encontrado");
        }

        if (!Objects.equals(funcionario.getCpf(), requestDto.getCpf()) && funcionarioRepository.existsByCpf(requestDto.getCpf())) {
            throw new FuncionarioConflictException("Já existe um funcionário com este CPF");
        }

        if (!Objects.equals(funcionario.getEmail(), requestDto.getEmail()) && funcionarioRepository.existsByEmail(requestDto.getEmail())) {
            throw new FuncionarioConflictException("Já existe um funcionário com este e-mail");
        }

        String oldEmail = funcionario.getEmail();

        funcionario.setCpf(requestDto.getCpf());
        funcionario.setNome(requestDto.getNome());
        funcionario.setEmail(requestDto.getEmail());
        funcionario.setTelefone(requestDto.getTelefone());
        funcionario.setSenha(requestDto.getSenha());

        Funcionario updatedFuncionario = funcionarioRepository.save(funcionario);
        this.rabbitMQProducer.enviarParaAtualizacaoUsuario(
                updatedFuncionario.getId(),
                oldEmail,
                updatedFuncionario.getEmail(),
                updatedFuncionario.getCpf(),
                updatedFuncionario.getSenha()
        );

        return updatedFuncionario;
    }

    @Transactional
    public Funcionario removerFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .filter(Funcionario::isAtivo)
                .orElseThrow(() -> new FuncionarioNotFoundException("Funcionário não encontrado"));

        funcionario.setAtivo(false);
        funcionario = this.funcionarioRepository.save(funcionario);
        this.rabbitMQProducer.enviarParaInativacaoUsuario(funcionario.getEmail());

        return funcionario;
    }

    private FuncionarioDTO convertToDTO(Funcionario funcionario) {
        FuncionarioDTO dto = new FuncionarioDTO();
        dto.setId(funcionario.getId());
        dto.setCpf(funcionario.getCpf());
        dto.setNome(funcionario.getNome());
        dto.setEmail(funcionario.getEmail());
        dto.setTelefone(funcionario.getTelefone());
        dto.setAtivo(funcionario.isAtivo());
        return dto;
    }

    private Funcionario convertToEntity(FuncionarioDTO dto) {
        Funcionario funcionario = new Funcionario();
        funcionario.setCpf(dto.getCpf());
        funcionario.setNome(dto.getNome());
        funcionario.setEmail(dto.getEmail());
        funcionario.setTelefone(dto.getTelefone());
        funcionario.setAtivo(dto.isAtivo());
        return funcionario;
    }
}
