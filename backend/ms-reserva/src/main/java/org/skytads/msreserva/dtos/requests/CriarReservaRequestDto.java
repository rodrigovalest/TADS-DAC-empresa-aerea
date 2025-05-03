package org.skytads.msreserva.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CriarReservaRequestDto {

    @NotNull
    @Positive
    private Float valor;

    @NotNull
    @Positive
    @JsonProperty("milhas_utilizadas")
    private Long milhas;

    @NotNull
    @Positive
    @JsonProperty("quantidade_poltronas")
    private Long quantidadePoltronas;

    @NotNull
    @JsonProperty("codigo_cliente")
    private Long codigoCliente;

    @NotNull
    @JsonProperty("codigo_voo")
    private Long codigoVoo;
}
