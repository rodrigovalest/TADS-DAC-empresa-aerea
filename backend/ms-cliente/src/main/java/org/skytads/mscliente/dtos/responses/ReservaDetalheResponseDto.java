package org.skytads.mscliente.dtos.responses;

import lombok.Data;

@Data
public class ReservaDetalheResponseDto {
    private String codigoLocalizador;
    private VooDto voo;

    @Data
    public static class VooDto {
        private AeroportoDto aeroportoOrigem;
        private AeroportoDto aeroportoDestino;
    }

    @Data
    public static class AeroportoDto {
        private String codigo;
    }
}