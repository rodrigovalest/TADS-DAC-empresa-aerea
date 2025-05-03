package org.skytads.msreserva.repositories;

import org.skytads.msreserva.entities.HistoricoReservaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoReservaRespository extends JpaRepository<HistoricoReservaEntity, Long> {
}
