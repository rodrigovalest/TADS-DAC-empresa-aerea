package org.skytads.msreserva.services;

import lombok.RequiredArgsConstructor;

import org.skytads.msreserva.dtos.responses.AeroportoResponseDto;
import org.skytads.msreserva.dtos.responses.ConsultaReservaResponseDto;
import org.skytads.msreserva.entities.AeroportoDto;
import org.skytads.msreserva.entities.HistoricoReservaEntity;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.skytads.msreserva.entities.VooDto;
import org.skytads.msreserva.enums.EstadoReservaEnum;
import org.skytads.msreserva.exceptions.ReservaNotFoundException;
import org.skytads.msreserva.integration.producer.CriarReservaProducer;
import org.skytads.msreserva.repositories.HistoricoReservaRespository;
import org.skytads.msreserva.repositories.ReservaRepository;
import org.skytads.msreserva.repositories.ReservaResumoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final HistoricoReservaRespository historicoReservaRespository;
    private final ReservaResumoService reservaResumoService;
    private final CriarReservaProducer criarReservaProducer;

    private final String msVoosBaseUrl = "http://localhost:8081";
    private final RestTemplate restTemplate = new RestTemplate();

    @Transactional
    public void criarReserva(Float valor, Long milhas, Long quantidadePoltronas, Long codigoCliente, Long codigoVoo) {
        ReservaEntity novaReserva = this.reservaRepository.save(
                new ReservaEntity(null, codigoCliente, codigoVoo, quantidadePoltronas, null, EstadoReservaEnum.CRIADA)
        );

        this.reservaResumoService.create(novaReserva.getCodigo(), valor, milhas, quantidadePoltronas, codigoCliente, codigoVoo);
        this.criarReservaProducer.sendReservarPoltronaToVoo(novaReserva.getCodigo(), codigoVoo, quantidadePoltronas);
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
    public void usarMilhasCliente(Long reservaId, Float valorPassagem) {
        ReservaResumoEntity reservaResumo = this.reservaResumoService.findByCodigoReserva(reservaId);

        float diferencaValor = valorPassagem - reservaResumo.getValor();
        long milhasNecessarias = (long) Math.round(diferencaValor / 5.0f);

        if (milhasNecessarias < 0) {
            milhasNecessarias = 0L;
        }

        this.criarReservaProducer.sendUsarMilhasToCliente(
                reservaId, reservaResumo.getCodigoCliente(), milhasNecessarias
        );

        reservaResumo.setMilhasUtilizadas(milhasNecessarias);

        this.reservaResumoService.updateReservaResumoById(reservaId, reservaResumo);
    }

    @Transactional
    public void reverterReservaPoltronasVoo(Long reservaId) {
        ReservaResumoEntity reservaResumo = this.reservaResumoService.findByCodigoReserva(reservaId);

        this.criarReservaProducer.reverterReservaToPoltronasVoo(
                reservaResumo.getCodigoReserva(), reservaResumo.getCodigoVoo(), reservaResumo.getQuantidadePoltronas()
        );
    }

    public ConsultaReservaResponseDto consultarReserva(Long reservaId) {
        ReservaEntity reserva = this.reservaRepository.findById(reservaId)
                .orElseThrow(() -> new ReservaNotFoundException("Reserva not found with id " + reservaId, reservaId));

        VooDto voo = VooDto.builder()
                           .codigo(reserva.getCodigoVoo())
                           .aeroportoOrigem(AeroportoDto.builder().codigo(getAeroportoOrigem(reserva.getCodigoVoo())).build())
                           .aeroportoDestino(AeroportoDto.builder().codigo(getAeroportoDestino(reserva.getCodigoVoo())).build())
                           .build();

        return ConsultaReservaResponseDto.builder()
                                         .codigo(reserva.getCodigo())
                                         .codigoCliente(reserva.getCodigoCliente())
                                         .estado(reserva.getEstado().name())
                                         .voo(voo)
                                         .build();
    }

    private Long getAeroportoOrigem(Long codigoVoo) {
        String aeroportoCodigo = String.valueOf(codigoVoo + 1000);
        String url = msVoosBaseUrl + "/aeroportos/" + aeroportoCodigo;
        AeroportoResponseDto response = restTemplate.getForObject(url, AeroportoResponseDto.class);
        return Long.valueOf(response.getCodigo());
    }

    private Long getAeroportoDestino(Long codigoVoo) {
        String aeroportoCodigo = String.valueOf(codigoVoo + 2000);
        String url = msVoosBaseUrl + "/aeroportos/" + aeroportoCodigo;
        AeroportoResponseDto response = restTemplate.getForObject(url, AeroportoResponseDto.class);
        return Long.valueOf(response.getCodigo());
    }
//TODO
    public void mudarEstadoReserva(Long reservaId, EstadoReservaEnum novoEstado) {
    ReservaEntity reserva = this.reservaRepository.findById(reservaId)
            .orElseThrow(() -> new ReservaNotFoundException("Reserva com id " + reservaId + " não encontrada", reservaId));

    HistoricoReservaEntity historicoReserva = new HistoricoReservaEntity(
            null, reserva, null, reserva.getEstado(), novoEstado
    );
    this.historicoReservaRespository.save(historicoReserva);

    reserva.setEstado(novoEstado);
    this.reservaRepository.save(reserva);
}
}
