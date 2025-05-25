package org.skytads.msfuncionarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFuncionarioRequestDto {

    @NotNull
    private Long codigo;

    @NotBlank(message = "CPF must not be blank")
    private String cpf;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Nome must not be blank")
    private String nome;

    @NotBlank(message = "Telefone must not be blank")
    private String telefone;

    @NotBlank(message = "Senha must not be blank")
    private String senha;
}
