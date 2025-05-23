package org.skytads.mscliente.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.mscliente.models.TipoTransacao;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransacaoMilhaResponseDto {
    private String data;
    private Float valorReais;
    private Long quantidadeMilhas;
    private String descricao;
    private Long codigoReserva;
    private TipoTransacao tipo;
}
