package org.skytads.msreserva.repositories;

import org.skytads.msreserva.entities.ReservaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<ReservaEntity, Long> {
    List<ReservaEntity> findByCodigoCliente(Long codigoCliente);

    Optional<ReservaEntity> findByCodigo(Long codigo);
}
