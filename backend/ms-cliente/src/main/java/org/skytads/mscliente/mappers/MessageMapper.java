package org.skytads.mscliente.mappers;

import org.skytads.mscliente.dtos.messages.CriarReservaResponseMessageDto;

public class MessageMapper {
    public static CriarReservaResponseMessageDto toCriarReservaResponseMessageDto(
            Long reservaId, Long codigoCliente, Boolean success, String info
    ) {
        return new CriarReservaResponseMessageDto(
                success, info, reservaId, codigoCliente
        );
    }
}
