package org.skytads.msreserva.usecases;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.dtos.responses.FindVooByCodigoResponseDto;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.enums.EstadoReservaEnum;
import org.skytads.msreserva.enums.StatusVooEnum;
import org.skytads.msreserva.exceptions.AlterarEstadoReservaComEstadoVooInvalidoException;
import org.skytads.msreserva.exceptions.AlterarEstadoReservaInvalido;
import org.skytads.msreserva.integration.clients.VooClient;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlterarEstadoReservaUseCase {

    private final VooClient vooClient;
    private final ReservaService reservaService;

    public ReservaEntity execute(Long id, EstadoReservaEnum novoEstado) {
        ReservaEntity reserva = this.reservaService.buscarPorCodigo(id);

        // 1. Verificar se o estado do voo ainda permite alterar o estado da reserva
        FindVooByCodigoResponseDto voo = this.vooClient.findByCodigo(reserva.getVoo().getCodigo());

        if (!StatusVooEnum.CONFIRMADO.equals(voo.getEstado())) {
            throw new AlterarEstadoReservaComEstadoVooInvalidoException(
                    "Alteração inválida: o voo está em estado [" + voo.getEstado() + "], esperado: CONFIRMADO."
            );
        }

        // 2. Só é possível alterar de CRIADA -> CHECK_IN e de CHECK_IN -> EMBARCADA
        if (!EstadoReservaEnum.CHECK_IN.equals(novoEstado) && !EstadoReservaEnum.EMBARCADA.equals(novoEstado)) {
            throw new AlterarEstadoReservaInvalido(
                    "Estado de destino inválido: apenas CHECK_IN e EMBARCADA são permitidos (recebido: " + novoEstado + ")."
            );
        }

        if (EstadoReservaEnum.CHECK_IN.equals(novoEstado) &&
                !EstadoReservaEnum.CRIADA.equals(reserva.getEstado())) {
            throw new AlterarEstadoReservaInvalido(
                    "Transição inválida: só é permitido mudar para CHECK_IN a partir de CRIADA (atual: " + reserva.getEstado() + ")."
            );
        }

        if (EstadoReservaEnum.EMBARCADA.equals(novoEstado) &&
                !EstadoReservaEnum.CHECK_IN.equals(reserva.getEstado())) {
            throw new AlterarEstadoReservaInvalido(
                    "Transição inválida: só é permitido mudar para EMBARCADA a partir de CHECK_IN (atual: " + reserva.getEstado() + ")."
            );
        }

        // 3. Mudar o estado da reserva de fato
        return this.reservaService.alterarEstado(id, novoEstado);
    }
}
