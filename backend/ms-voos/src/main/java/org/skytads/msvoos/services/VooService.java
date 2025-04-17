package org.skytads.msvoos.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.repositories.VooRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
}
