package org.skytads.msfuncionarios.repository;

import org.skytads.msfuncionarios.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, String> {
    
    List<Funcionario> findByAtivoTrueOrderByNomeAsc();
    
    Optional<Funcionario> findByEmailAndAtivoTrue(String email);
    
    boolean existsByEmail(String email);
}