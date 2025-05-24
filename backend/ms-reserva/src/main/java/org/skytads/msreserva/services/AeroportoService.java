package org.skytads.msreserva.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.entities.AeroportoEntity;
import org.skytads.msreserva.repositories.AeroportoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AeroportoService {

    private final AeroportoRepository aeroportoRepository;

    @Transactional
    public AeroportoEntity criarOuAtualizarCopiaAeroporto(AeroportoEntity aeroporto) {
        return this.aeroportoRepository.findById(aeroporto.getCodigo())
                .map(existente -> {
                    existente.setNome(aeroporto.getNome());
                    existente.setCidade(aeroporto.getCidade());
                    existente.setUf(aeroporto.getUf());
                    return existente;
                })
                .orElseGet(() -> aeroportoRepository.save(aeroporto));
    }
}
