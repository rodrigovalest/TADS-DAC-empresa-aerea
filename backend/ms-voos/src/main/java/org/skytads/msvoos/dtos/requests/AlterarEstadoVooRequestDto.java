package org.skytads.msvoos.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msvoos.enums.StatusVooEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlterarEstadoVooRequestDto {
    @NotNull
    private StatusVooEnum estado;
}
