package org.skytads.msreserva.repositories;

import org.skytads.msreserva.entities.VooEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VooRepository extends JpaRepository<VooEntity, Long> {
    List<VooEntity> findByAeroportoOrigemCodigo(String aeroportoOrigemCodigo);

    List<VooEntity> findByAeroportoDestinoCodigo(String aeroportoDestinoCodigo);
}
