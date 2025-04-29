package org.skytads.msvoos.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.repositories.VooRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

    public List<VooEntity> findByAeroportoOrigem(Long aeroportoOrigemCodigo) {
        return vooRepository.findByAeroportoOrigemCodigo(aeroportoOrigemCodigo);
    }

    public List<VooEntity> findByAeroportoDestino(Long aeroportoDestinoCodigo) {
        return vooRepository.findByAeroportoDestinoCodigo(aeroportoDestinoCodigo);
    }

    public VooEntity findByCodigo(Long codigo) {
        return vooRepository.findByCodigo(codigo);
    }

    public void updateStatusToCancelado(Long codigo) {
        VooEntity voo = vooRepository.findByCodigo(codigo);
        if (voo != null) {
            if (voo.getStatusVoo() == StatusVooEnum.CONFIRMADO) {
                voo.setStatusVoo(StatusVooEnum.CANCELADO);
                vooRepository.save(voo);
            } else {
                throw new IllegalStateException("Apenas vôos CONFIRMADOS podem ser marcados como CANCELADOS.");
            }
        } else {
            throw new IllegalArgumentException("Nenhum vôo com este código foi encontrado.");
        }
    }

    public void updateStatusToRealizado(Long codigo) {
        VooEntity voo = vooRepository.findByCodigo(codigo);
        if (voo != null) {
            if (voo.getStatusVoo() == StatusVooEnum.CONFIRMADO) {
                voo.setStatusVoo(StatusVooEnum.REALIZADO);
                vooRepository.save(voo);
            } else {
                throw new IllegalStateException("Apenas vôos CONFIRMADOS podem ser marcados como REALIZADOS.");
            }
        } else {
            throw new IllegalArgumentException("Nenhum vôo com este código foi encontrado.");
        }
    }
}
