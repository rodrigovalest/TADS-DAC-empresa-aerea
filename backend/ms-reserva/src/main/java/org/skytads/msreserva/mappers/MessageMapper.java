package org.skytads.msreserva.mappers;

import org.skytads.msreserva.dtos.messages.CriarReservaClienteMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaVooMessageDto;

public class MessageMapper {

    public static CriarReservaClienteMessageDto toCriarReservaClienteMessageDto(
            String info, Long reservaId, Long codigoCliente, Long milhasUtilizadas, Float valor
    ) {
        return new CriarReservaClienteMessageDto(info, reservaId, codigoCliente, milhasUtilizadas, valor);
    }

    public static CriarReservaVooMessageDto toCriarReservaVooMessageDto(
            String info, Long reservaId, Long codigoVoo, Long quantidadePoltronas
    ) {
        return new CriarReservaVooMessageDto(info, reservaId, codigoVoo, quantidadePoltronas);
    }
}
