package org.skytads.mscliente.dtos.requests;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComprarMilhasRequestDto {
    @Min(value = 1, message = "quantidade minima deve ser 1")
    private Long quantidade;
}
