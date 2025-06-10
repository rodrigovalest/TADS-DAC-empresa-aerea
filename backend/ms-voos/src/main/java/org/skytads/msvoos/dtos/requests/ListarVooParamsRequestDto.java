package org.skytads.msvoos.dtos.requests;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListarVooParamsRequestDto {

    @Size(min = 3, max = 3)
    private String origem;

    @Size(min = 3, max = 3)
    private String destino;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate data;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate inicio;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fim;
}
