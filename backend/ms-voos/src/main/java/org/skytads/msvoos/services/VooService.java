package org.skytads.msvoos.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.exceptions.EntityNotFoundException;
import org.skytads.msvoos.exceptions.QuantidadePoltronasInsuficientesException;
import org.skytads.msvoos.exceptions.StatusVooInvalidoException;
import org.skytads.msvoos.repositories.VooRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VooService {

    private final VooRepository vooRepository;
    private final AeroportoService aeroportoService;

    public void inserirVoo(
            LocalDateTime data,
            Float valorPassagem,
            Long quantidadePoltronasTotal,
            Long quantidadePoltronasOcupadas,
            String codigoAeroportoOrigem,
            String codigoAeroportoDestino
    ) {
        AeroportoEntity aeroportoOrigem = this.aeroportoService.findByCodigo(codigoAeroportoOrigem);
        AeroportoEntity aeroportoDestino = this.aeroportoService.findByCodigo(codigoAeroportoDestino);

        VooEntity voo = new VooEntity(
                data,
                aeroportoOrigem,
                aeroportoDestino,
                valorPassagem,
                quantidadePoltronasTotal,
                quantidadePoltronasOcupadas,
                StatusVooEnum.CONFIRMADO
        );
        this.vooRepository.save(voo);
    }

    public List<VooEntity> findAll() {
        return vooRepository.findAll();
    }

//    public List<VooEntity> findByFilters(LocalDateTime data, Long origem, Long destino) {
//        return vooRepository.findByData(data, origem, destino);
//    }

    public List<VooEntity> findByAeroportoOrigem(String aeroportoOrigemCodigo) {
        return vooRepository.findByAeroportoOrigemCodigo(aeroportoOrigemCodigo);
    }

    public List<VooEntity> findByAeroportoDestino(String aeroportoDestinoCodigo) {
        return vooRepository.findByAeroportoDestinoCodigo(aeroportoDestinoCodigo);
    }

    public Optional<VooEntity> findByCodigo(Long codigo) {
        return vooRepository.findByCodigo(codigo);
    }

    public VooEntity updateEstadoVoo(Long codigo, String novoEstado) {
        VooEntity voo = vooRepository.findByCodigo(codigo)
                .orElseThrow(() -> new IllegalArgumentException("Voo não encontrado"));
    
        StatusVooEnum statusVooEnum;
        try {
            statusVooEnum = StatusVooEnum.valueOf(novoEstado);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado inválido: " + novoEstado);
        }
    
        if (voo.getStatusVoo() == StatusVooEnum.CONFIRMADO &&
                (statusVooEnum == StatusVooEnum.CANCELADO || statusVooEnum == StatusVooEnum.REALIZADO)) {
            voo.setStatusVoo(statusVooEnum);
            vooRepository.save(voo);
    
            // Notificar o microsserviço de reserva
            notifyReservationService(voo.getCodigo(), statusVooEnum);
        } else {
            throw new IllegalStateException("Estado inválido para a transição");
        }
    
        return voo;
    }
    
    private void notifyReservationService(Long vooCodigo, StatusVooEnum novoEstado) {
        // Adicionar aqui a lógica de se comunicar com o microsserviço de reservas

        // Pensei em algo tipo assim:

        // String reservationServiceUrl = "http://nosso-link-para-ms-reservas/reservas/voo/" + vooCodigo + "/estado";
        // Map<String, String> payload = new HashMap<>();
        // payload.put("estado", novoEstado.toString());

        // RestTemplate restTemplate = new RestTemplate();
        // restTemplate.patchForObject(reservationServiceUrl, payload, Void.class);
    }

    @Transactional
    public VooEntity reservarPoltronas(Long codigoVoo, Long quantidadePoltronas) {
        VooEntity voo = this.vooRepository.findById(codigoVoo)
                .orElseThrow(() -> new EntityNotFoundException("Reservar poltronas: voo com o codigo " + codigoVoo + " nao encontrado"));

        if (!StatusVooEnum.CONFIRMADO.equals(voo.getStatusVoo())) {
            throw new StatusVooInvalidoException("Reservar poltronas: status do voo invalido. Status deve ser CONFIRMADO");
        }

        Long poltronasDisponiveis = voo.getQuantidadePoltronas() - voo.getQuantidadePoltronasOcupadas();

        if (quantidadePoltronas > poltronasDisponiveis) {
            throw new QuantidadePoltronasInsuficientesException("Reservar poltronas: não há poltronas suficientes disponíveis no voo");
        }

        voo.setQuantidadePoltronasOcupadas(voo.getQuantidadePoltronasOcupadas() + quantidadePoltronas);
        return this.vooRepository.save(voo);
    }

    @Transactional
    public VooEntity reverterReservaPoltronas(Long codigoVoo, Long quantidadePoltronas) {
        VooEntity voo = this.vooRepository.findById(codigoVoo)
                .orElseThrow(() -> new EntityNotFoundException("Reservar poltronas: voo com o codigo " + codigoVoo + " nao encontrado"));

        voo.setQuantidadePoltronasOcupadas(voo.getQuantidadePoltronasOcupadas() - quantidadePoltronas);
        return this.vooRepository.save(voo);
    }
}
