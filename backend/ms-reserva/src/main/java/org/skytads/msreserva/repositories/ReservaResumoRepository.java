package org.skytads.msreserva.repositories;

import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservaResumoRepository  extends JpaRepository<ReservaResumoEntity, Long> {
    Optional<ReservaResumoEntity> findByCodigoReserva(Long codigoReserva);
}
