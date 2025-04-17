package org.skytads.msvoos.repositories;

import org.skytads.msvoos.entities.AeroportoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AeroportoRepository extends JpaRepository<AeroportoEntity, String> {
}

