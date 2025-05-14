package org.skytads.msreserva.mappers;

import org.skytads.msreserva.dtos.messages.CriarReservaClienteMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaVooRequestMessageDto;

public class MessageMapper {

    public static CriarReservaClienteMessageDto toCriarReservaClienteMessageDto(
            String info, Long reservaId, Long codigoCliente, Long milhasUtilizadas, Float valor
    ) {
        return new CriarReservaClienteMessageDto(info, reservaId, codigoCliente, milhasUtilizadas, valor);
    }
}
