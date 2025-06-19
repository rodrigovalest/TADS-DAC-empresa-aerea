package org.skytads.msreserva.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SaldoMilhasResponse {
    @JsonProperty("saldo_milhas")
    private Long saldoMilhas;
}
