package org.skytads.msreserva.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.entities.VooEntity;
import org.skytads.msreserva.repositories.VooRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VooService {

    private final VooRepository vooRepository;

    @Transactional
    public VooEntity criarOuAtualizarCopiaVoo(VooEntity voo) {
        Optional<VooEntity> optionalVoo = this.vooRepository.findById(voo.getCodigo());

        if (optionalVoo.isEmpty()) {
            return this.vooRepository.save(voo);
        }

        VooEntity savedVoo = optionalVoo.get();
        savedVoo.setQuantidadePoltronasOcupadas(voo.getQuantidadePoltronasOcupadas());
        return this.vooRepository.save(savedVoo);
    }
}
