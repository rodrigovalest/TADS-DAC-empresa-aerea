package org.skytads.msvoos.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.integration.producer.AlterarEstadoVooProducer;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlterarEstadoVooUseCase {

    private final VooService vooService;
    private final AlterarEstadoVooProducer alterarEstadoVooProducer;

    @Transactional
    public VooEntity execute(Long codigoVoo, StatusVooEnum novoEstado) {
        VooEntity voo = this.vooService.updateEstadoVoo(codigoVoo, novoEstado);

        if (StatusVooEnum.CANCELADO.equals(novoEstado))
            this.alterarEstadoVooProducer.sendCancelarVooToReserva(codigoVoo);

        if (StatusVooEnum.REALIZADO.equals(novoEstado))
            this.alterarEstadoVooProducer.sendRealizarVooToReserva(codigoVoo);

        return voo;
    }
}
