package org.skytads.msvoos.dtos.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListarVoosPorParamsResponseDto {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String inicio;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String fim;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String data;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String origem;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String destino;

    private List<VooResponseDto> voos;
}
