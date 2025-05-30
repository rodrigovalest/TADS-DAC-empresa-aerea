package org.skytads.mscliente.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AutocadastroRequestDto {

    @NotBlank(message = "CPF must not be blank")
    // @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF must be in the format XXX.XXX.XXX-XX") Paulo: Comentei porque o teste do prof não está formatado
    private String cpf;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Nome must not be blank")
    @Size(min = 2, max = 100, message = "Nome must be between 2 and 100 characters")
    private String nome;

    @Min(value = 0, message = "saldo milhas deve ser no mínimo 0")
    private Long saldoMilhas;

    @NotNull(message = "Endereco must not be null")
    private EnderecoRequestDto endereco;
}
