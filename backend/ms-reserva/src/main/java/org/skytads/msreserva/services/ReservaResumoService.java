package org.skytads.msreserva.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.skytads.msreserva.exceptions.ReservaNotFoundException;
import org.skytads.msreserva.repositories.ReservaResumoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReservaResumoService {

    private final ReservaResumoRepository reservaResumoRepository;

    @Transactional
    public ReservaResumoEntity findByCodigoReserva(Long codigoReserva) {
       return this.reservaResumoRepository.findById(codigoReserva)
                .orElseThrow(() -> new ReservaNotFoundException("Find reserva resumo by codigo " + codigoReserva + " not found"));
    }

    @Transactional
    public void create(Long codigoReserva, Float valor, Long milhas, Long quantidadePoltronas, Long codigoCliente, Long codigoVoo) {
        this.reservaResumoRepository.save(
                new ReservaResumoEntity(codigoReserva, codigoCliente, codigoVoo, quantidadePoltronas, valor, milhas)
        );
    }

    @Transactional
    public void updateReservaResumoById(Long codigoReserva, ReservaResumoEntity reservaResumo) {
        ReservaResumoEntity persistedReservaResumo = this.reservaResumoRepository.findById(codigoReserva)
                .orElseThrow(() -> new ReservaNotFoundException("Find reserva resumo by codigo " + codigoReserva + " not found"));

        persistedReservaResumo.setCodigoCliente(reservaResumo.getCodigoCliente());
        persistedReservaResumo.setValor(reservaResumo.getValor());
        persistedReservaResumo.setMilhasUtilizadas(reservaResumo.getMilhasUtilizadas());
        persistedReservaResumo.setCodigoVoo(reservaResumo.getCodigoVoo());
        persistedReservaResumo.setQuantidadePoltronas(reservaResumo.getQuantidadePoltronas());

        this.reservaResumoRepository.save(persistedReservaResumo);
    }

    @Transactional
    public void finalizarCriarReserva(Long reservaId) {
        this.reservaResumoRepository.deleteById(reservaId);
    }
}
