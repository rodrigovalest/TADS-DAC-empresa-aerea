package org.skytads.mscliente.repositories;

import org.skytads.mscliente.models.TransacaoMilhas;
import org.skytads.mscliente.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransacaoMilhasRepository extends JpaRepository<TransacaoMilhas, Long> {
    List<TransacaoMilhas> findByClienteOrderByDataHoraDesc(Cliente cliente);
    List<TransacaoMilhas> findByClienteCpfOrderByDataHoraDesc(String cpf);
}