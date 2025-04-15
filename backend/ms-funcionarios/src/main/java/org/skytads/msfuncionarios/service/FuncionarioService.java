package org.skytads.msfuncionarios.service;

import org.skytads.msfuncionarios.dto.FuncionarioDTO;
import org.skytads.msfuncionarios.dto.FuncionarioUpdateDTO;
import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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
    
    public Optional<FuncionarioDTO> buscarPorCpf(String cpf) {
        return funcionarioRepository.findById(cpf)
                .filter(Funcionario::isAtivo)
                .map(this::convertToDTO);
    }
    
    @Transactional
    public FuncionarioDTO inserirFuncionario(FuncionarioDTO funcionarioDTO) {
        if (funcionarioRepository.existsById(funcionarioDTO.getCpf())) {
            throw new RuntimeException("Já existe um funcionário com este CPF");
        }
        if (funcionarioRepository.existsByEmail(funcionarioDTO.getEmail())) {
            throw new RuntimeException("Já existe um funcionário com este e-mail");
        }
        Funcionario funcionario = convertToEntity(funcionarioDTO);
        funcionario.setAtivo(true);

        Funcionario savedFuncionario = funcionarioRepository.save(funcionario);
        
        return convertToDTO(savedFuncionario);
    }
    @Transactional
    public FuncionarioDTO atualizarFuncionario(String cpf, FuncionarioUpdateDTO funcionarioUpdateDTO) {
        Funcionario funcionario = funcionarioRepository.findById(cpf)
                .filter(Funcionario::isAtivo)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        
        Optional<Funcionario> funcionarioComEmail = funcionarioRepository.findByEmailAndAtivoTrue(funcionarioUpdateDTO.getEmail());
        if (funcionarioComEmail.isPresent() && !funcionarioComEmail.get().getCpf().equals(cpf)) {
            throw new RuntimeException("Este e-mail já está em uso");
        }
        funcionario.setNome(funcionarioUpdateDTO.getNome());
        funcionario.setEmail(funcionarioUpdateDTO.getEmail());
        funcionario.setTelefone(funcionarioUpdateDTO.getTelefone());
        
        Funcionario updatedFuncionario = funcionarioRepository.save(funcionario);
        return convertToDTO(updatedFuncionario);
    }
    
    @Transactional
    public void removerFuncionario(String cpf) {
        Funcionario funcionario = funcionarioRepository.findById(cpf)
                .filter(Funcionario::isAtivo)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        
        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);
        
    }
    
    private FuncionarioDTO convertToDTO(Funcionario funcionario) {
        FuncionarioDTO dto = new FuncionarioDTO();
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