package org.skytads.msauth.dtos.responses;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String accessToken;
    private String tokenType;
    private UsuarioResponseDto usuario;
    private String tipo;
}
