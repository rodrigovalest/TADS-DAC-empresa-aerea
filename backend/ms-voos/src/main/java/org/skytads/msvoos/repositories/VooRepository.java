package org.skytads.msvoos.repositories;

import org.skytads.msvoos.entities.VooEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VooRepository extends JpaRepository<VooEntity, String> {
}
