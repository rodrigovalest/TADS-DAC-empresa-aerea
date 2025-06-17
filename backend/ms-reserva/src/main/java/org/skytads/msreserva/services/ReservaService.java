package org.skytads.msreserva.services;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.dtos.responses.ConsultaReservaResponseDto;
import org.skytads.msreserva.dtos.responses.ReservaResponseDto;
import org.skytads.msreserva.entities.HistoricoReservaEntity;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.skytads.msreserva.entities.VooEntity;
import org.skytads.msreserva.enums.EstadoReservaEnum;
import org.skytads.msreserva.exceptions.ReservaNotFoundException;
import org.skytads.msreserva.integration.producer.CriarReservaProducer;
import org.skytads.msreserva.mappers.ReservaMapper;
import org.skytads.msreserva.repositories.HistoricoReservaRespository;
import org.skytads.msreserva.repositories.ReservaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final HistoricoReservaRespository historicoReservaRespository;
    private final ReservaResumoService reservaResumoService;
    private final CriarReservaProducer criarReservaProducer;
    private final ReservaMapper reservaMapper;

    @Transactional
    public ReservaEntity criarReserva(Float valor, Long milhas, Long quantidadePoltronas, Long codigoCliente, VooEntity vooEntity) {
        ReservaEntity novaReserva = this.reservaRepository.save(
                new ReservaEntity(null, codigoCliente, vooEntity, quantidadePoltronas, null, EstadoReservaEnum.CRIADA)
        );

        this.reservaResumoService.create(novaReserva.getCodigo(), valor, milhas, quantidadePoltronas, codigoCliente, vooEntity.getCodigo());
        return novaReserva;
    }

    @Transactional
    public void cancelarReserva(Long reservaId) {
        ReservaEntity reserva = this.reservaRepository.findById(reservaId)
                .orElseThrow(() -> new ReservaNotFoundException("Cancelar reserva: reserva com id " + reservaId + " nao encontrado", reservaId));

        HistoricoReservaEntity historicoReserva = new HistoricoReservaEntity(
                null, reserva, null, reserva.getEstado(), EstadoReservaEnum.CANCELADA
        );
        this.historicoReservaRespository.save(historicoReserva);

        reserva.setEstado(EstadoReservaEnum.CANCELADA);
        this.reservaRepository.save(reserva);
    }

    @Transactional
    public void usarMilhasCliente(Long reservaId) {
        ReservaResumoEntity resumo = reservaResumoService.findByCodigoReserva(reservaId);

        long milhasParaDescontar = resumo.getMilhasUtilizadas();

        criarReservaProducer.sendUsarMilhasToCliente(
                reservaId,
                resumo.getCodigoCliente(),
                milhasParaDescontar
        );
    }

    @Transactional
    public void reverterReservaPoltronasVoo(Long reservaId) {
        ReservaResumoEntity reservaResumo = this.reservaResumoService.findByCodigoReserva(reservaId);

        this.criarReservaProducer.reverterReservaToPoltronasVoo(
                reservaResumo.getCodigoReserva(), reservaResumo.getCodigoVoo(), reservaResumo.getQuantidadePoltronas()
        );
    }

    public List<ConsultaReservaResponseDto> listarReservas() {
        return reservaRepository.findAll()
                                .stream()
                                .map(reservaMapper::toConsultaReservaResponseDto)
                                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelarReservaSaga(Long reservaId) {
        ReservaResumoEntity reservaResumo = this.reservaResumoService.findByCodigoReserva(reservaId);

        log.info("[SAGA cancelar reserva] Iniciando cancelamento da reserva {}", reservaId);

        this.criarReservaProducer.sendCancelarMilhasToCliente(
                reservaId,
                reservaResumo.getCodigoCliente(),
                reservaResumo.getMilhasUtilizadas()
        );

        this.criarReservaProducer.sendCancelarPoltronasToVoo(
                reservaId,
                reservaResumo.getCodigoVoo(),
                reservaResumo.getQuantidadePoltronas()
        );

        cancelarReserva(reservaId);
    }

    @Transactional(readOnly = true)
    public List<ReservaResponseDto> getReservasByCliente(Long codigoCliente) {
        return reservaRepository.findByCodigoCliente(codigoCliente)
                                .stream()
                                .map(reservaMapper::toReservaResponseDto)
                                .collect(Collectors.toList());
    }
}
