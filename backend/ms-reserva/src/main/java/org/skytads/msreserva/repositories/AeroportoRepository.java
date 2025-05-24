package org.skytads.msreserva.repositories;

import org.skytads.msreserva.entities.AeroportoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AeroportoRepository extends JpaRepository<AeroportoEntity, String> {
}

