package org.skytads.msvoos.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.exceptions.EntityNotFoundException;
import org.skytads.msvoos.repositories.AeroportoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AeroportoService {

    private final AeroportoRepository aeroportoRepository;

    @Transactional
    public List<AeroportoEntity> findAll() {
        return this.aeroportoRepository.findAll();
    }

    @Transactional
    public AeroportoEntity findByCodigo(String codigo) {
        return this.aeroportoRepository.findById(codigo)
                .orElseThrow(() -> new EntityNotFoundException("Aeroporto não encontrado"));
    }
}
