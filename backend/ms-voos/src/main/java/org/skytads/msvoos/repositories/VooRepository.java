package org.skytads.msvoos.repositories;

import java.util.List;

import org.skytads.msvoos.entities.VooEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VooRepository extends JpaRepository<VooEntity, String> {

    List<VooEntity> findByAeroportoOrigemCodigo(Long aeroportoOrigemCodigo);

    List<VooEntity> findByAeroportoDestinoCodigo(Long aeroportoDestinoCodigo);

    VooEntity findByCodigo(Long codigo);

}
