package org.skytads.msfuncionarios.services;

import org.skytads.msfuncionarios.dto.FuncionarioDTO;
import org.skytads.msfuncionarios.dto.FuncionarioUpdateDTO;
import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public List<FuncionarioDTO> listarFuncionarios() {
        return funcionarioRepository.findByAtivoTrueOrderByNomeAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<FuncionarioDTO> buscarPorId(Long id) {
        return funcionarioRepository.findById(id)
                .filter(Funcionario::isAtivo)
                .map(this::convertToDTO);
    }

    @Transactional
    public FuncionarioDTO inserirFuncionario(FuncionarioDTO funcionarioDTO) {
        if (funcionarioRepository.existsByCpf(funcionarioDTO.getCpf())) {
            throw new RuntimeException("Já existe um funcionário com este CPF");
        }

        if (funcionarioRepository.existsByEmail(funcionarioDTO.getEmail())) {
            throw new RuntimeException("Já existe um funcionário com este e-mail");
        }

        Funcionario funcionario = convertToEntity(funcionarioDTO);
        funcionario.setAtivo(true);

        String senha = String.format("%04d", new Random().nextInt(10000));
        funcionario.setSenha(senha);

        System.out.println("Senha criada para o funcionário " + funcionario.getEmail() + ": " + senha);

        Funcionario savedFuncionario = funcionarioRepository.save(funcionario);
        return convertToDTO(savedFuncionario);
    }

    @Transactional
    public FuncionarioDTO atualizarFuncionario(Long id, FuncionarioUpdateDTO funcionarioUpdateDTO) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .filter(Funcionario::isAtivo)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        Optional<Funcionario> funcionarioComEmail = funcionarioRepository
                .findByEmailAndAtivoTrue(funcionarioUpdateDTO.getEmail());

        if (funcionarioComEmail.isPresent() && !funcionarioComEmail.get().getId().equals(id)) {
            throw new RuntimeException("Este e-mail já está em uso");
        }

        funcionario.setNome(funcionarioUpdateDTO.getNome());
        funcionario.setEmail(funcionarioUpdateDTO.getEmail());
        funcionario.setTelefone(funcionarioUpdateDTO.getTelefone());

        Funcionario updatedFuncionario = funcionarioRepository.save(funcionario);
        return convertToDTO(updatedFuncionario);
    }

    @Transactional
    public void removerFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .filter(Funcionario::isAtivo)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);
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
