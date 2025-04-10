package org.skytads.mscliente.mappers;

import org.skytads.mscliente.dtos.requests.TransacaoMilhasDTO;
import org.skytads.mscliente.models.TransacaoMilhas;

public class TransacaoMilhasMapper {
    
    public static TransacaoMilhasDTO toDTO(TransacaoMilhas transacao) {
        if (transacao == null) {
            return null;
        }
        
        TransacaoMilhasDTO dto = new TransacaoMilhasDTO();
        dto.setId(transacao.getId());
        dto.setClienteCpf(transacao.getCliente().getCpf());
        dto.setDataHora(transacao.getDataHora());
        dto.setQuantidadeMilhas(transacao.getQuantidadeMilhas());
        dto.setTipo(transacao.getTipo());
        dto.setCodigoReserva(transacao.getCodigoReserva());
        dto.setDescricao(transacao.getDescricao());
        dto.setValorEmReais(transacao.getValorEmReais());
        return dto;
    }

    public static TransacaoMilhas toEntity(TransacaoMilhasDTO dto) {
        if (dto == null) {
            return null;
        }
        
        TransacaoMilhas transacao = new TransacaoMilhas();
        transacao.setId(dto.getId());
        transacao.setDataHora(dto.getDataHora());
        transacao.setQuantidadeMilhas(dto.getQuantidadeMilhas());
        transacao.setTipo(dto.getTipo());
        transacao.setCodigoReserva(dto.getCodigoReserva());
        transacao.setDescricao(dto.getDescricao());
        transacao.setValorEmReais(dto.getValorEmReais());
        return transacao;
    }
}