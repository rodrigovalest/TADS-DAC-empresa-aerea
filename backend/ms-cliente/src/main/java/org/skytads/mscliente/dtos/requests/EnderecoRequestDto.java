package org.skytads.mscliente.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EnderecoRequestDto {

    @NotBlank(message = "CEP must not be blank")
    @Pattern(regexp = "\\d{5}-\\d{3}", message = "CEP must be in the format XXXXX-XXX")
    private String cep;

    @NotBlank(message = "UF must not be blank")
    @Pattern(regexp = "[A-Z]{2}", message = "UF must be a valid Brazilian state abbreviation (e.g., SP, RJ)")
    private String uf;

    @NotBlank(message = "Cidade must not be blank")
    @Size(min = 2, max = 100, message = "Cidade name must be between 2 and 100 characters")
    private String cidade;

    @NotBlank(message = "Bairro must not be blank")
    @Size(min = 2, max = 100, message = "Bairro must be between 2 and 100 characters")
    private String bairro;

    @NotBlank(message = "Rua must not be blank")
    @Size(min = 2, max = 200, message = "Rua must be between 2 and 200 characters")
    private String rua;

    @NotBlank(message = "Numero must not be blank")
    @Pattern(regexp = "\\d+[A-Za-z]?", message = "Numero must be numeric and may contain a letter (e.g., 123A)")
    private String numero;

    @Size(max = 200, message = "Complemento must not exceed 200 characters")
    private String complemento;
}

