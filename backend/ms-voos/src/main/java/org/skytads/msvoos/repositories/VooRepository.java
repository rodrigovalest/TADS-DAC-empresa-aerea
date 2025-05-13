package org.skytads.msvoos.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.skytads.msvoos.entities.VooEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VooRepository extends JpaRepository<VooEntity, Long> {

    List<VooEntity> findByAeroportoOrigemCodigo(String aeroportoOrigemCodigo);

    List<VooEntity> findByAeroportoDestinoCodigo(String aeroportoDestinoCodigo);

    Optional<VooEntity> findByCodigo(Long codigo);

//    List<VooEntity> findByData (
//        LocalDateTime data, Long aeroportoOrigemCodigo, Long aeroportoDestinoCodigo
//    );

}
