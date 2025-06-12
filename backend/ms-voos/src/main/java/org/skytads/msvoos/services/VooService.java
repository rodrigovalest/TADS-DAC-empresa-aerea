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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VooService {

    private final VooRepository vooRepository;
    private final AeroportoService aeroportoService;

    public VooEntity inserirVoo(
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
        return this.vooRepository.save(voo);
    }

    public List<VooEntity> findByAeroportoOrigem(String aeroportoOrigemCodigo) {
        return vooRepository.findByAeroportoOrigemCodigo(aeroportoOrigemCodigo);
    }

    public List<VooEntity> findByAeroportoDestino(String aeroportoDestinoCodigo) {
        return vooRepository.findByAeroportoDestinoCodigo(aeroportoDestinoCodigo);
    }

    public VooEntity findById(Long id) {
        return vooRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("voo nao encontrado"));
    }

    @Transactional
    public VooEntity updateEstadoVoo(Long codigo, StatusVooEnum novoEstado) {
        VooEntity voo = vooRepository.findByCodigo(codigo)
                .orElseThrow(() -> new EntityNotFoundException("Voo não encontrado"));

        StatusVooEnum estadoAtual = voo.getStatusVoo();
        boolean transicaoValida = StatusVooEnum.CONFIRMADO.equals(estadoAtual) && (StatusVooEnum.CANCELADO.equals(novoEstado) || StatusVooEnum.REALIZADO.equals(novoEstado));

        if (!transicaoValida) {
            throw new StatusVooInvalidoException("Transição de status do voo inválida: " + estadoAtual + " → " + novoEstado);
        }

        voo.setStatusVoo(novoEstado);
        return vooRepository.save(voo);
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

    @Transactional
    public VooEntity liberarPoltronas(Long codigoVoo, Long quantidadePoltronas) {
        VooEntity voo = this.vooRepository.findById(codigoVoo)
                .orElseThrow(() -> new EntityNotFoundException("Liberar poltronas: voo com o codigo " + codigoVoo + " nao encontrado"));

        voo.setQuantidadePoltronasOcupadas(voo.getQuantidadePoltronasOcupadas() - quantidadePoltronas);
        return this.vooRepository.save(voo);
    }

    public List<VooEntity> buscarVoosPorParametros(
            String origem,
            String destino,
            LocalDate data,
            LocalDate inicio,
            LocalDate fim
    ) {
        return vooRepository.findAll().stream()
                .filter(voo -> origem == null || voo.getAeroportoOrigem().getCodigo().equalsIgnoreCase(origem))
                .filter(voo -> destino == null || voo.getAeroportoDestino().getCodigo().equalsIgnoreCase(destino))
                .filter(voo -> {
                    LocalDate dataVoo = voo.getData().toLocalDate();

                    if (data != null) {
                        return dataVoo.isAfter(data);
                    } else if (inicio != null && fim != null) {
                        return !dataVoo.isBefore(inicio) && !dataVoo.isAfter(fim);
                    } else if (inicio != null) {
                        return !dataVoo.isBefore(inicio);
                    } else if (fim != null) {
                        return !dataVoo.isAfter(fim);
                    }

                    return true;
                })
                .toList();
    }
}
