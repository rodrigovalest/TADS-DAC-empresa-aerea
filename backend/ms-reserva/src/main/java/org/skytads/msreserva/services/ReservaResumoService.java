package org.skytads.msreserva.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.skytads.msreserva.exceptions.ReservaNotFoundException;
import org.skytads.msreserva.repositories.ReservaResumoRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReservaResumoService {

    private final ReservaResumoRepository reservaResumoRepository;

    public ReservaResumoEntity findByCodigoReserva(Long codigoReserva) {
       return this.reservaResumoRepository.findById(codigoReserva)
                .orElseThrow(() -> new ReservaNotFoundException("Find reserva resumo by codigo " + codigoReserva + " not found"));
    }

    public void create(Long codigoReserva, Float valor, Long milhas, Long quantidadePoltronas, Long codigoCliente, Long codigoVoo) {
        this.reservaResumoRepository.save(
                new ReservaResumoEntity(codigoReserva, codigoCliente, codigoVoo, quantidadePoltronas, valor, milhas)
        );
    }
}
