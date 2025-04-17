package org.skytads.mscliente.dtos.requests;

import org.skytads.mscliente.models.TipoTransacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransacaoMilhasDTO {
    private Long id;
    private String clienteCpf;
    private LocalDateTime dataHora;
    private Integer quantidadeMilhas;
    private TipoTransacao tipo;
    private String codigoReserva;
    private String descricao;
    private Double valorEmReais;
}