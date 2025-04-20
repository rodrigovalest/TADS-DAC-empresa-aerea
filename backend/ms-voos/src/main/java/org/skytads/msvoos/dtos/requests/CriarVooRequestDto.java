package org.skytads.msvoos.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CriarVooRequestDto {

    @NotBlank
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private String data;

    @NotNull
    @Positive
    @JsonProperty("valor_passagem")
    private Float valorPassagem;

    @NotNull
    @Positive
    @JsonProperty("quantidade_poltronas_total")
    private Long quantidadePoltronasTotal;

    @NotNull
    @Min(0)
    @JsonProperty("quantidade_poltronas_ocupadas")
    private Long quantidadePoltronasOcupadas;

    @NotBlank
    @Size(min = 3, max = 3)
    @JsonProperty("codigo_aeroporto_origem")
    private String codigoAeroportoOrigem;

    @NotBlank
    @Size(min = 3, max = 3)
    @JsonProperty("codigo_aeroporto_destino")
    private String codigoAeroportoDestino;
}
