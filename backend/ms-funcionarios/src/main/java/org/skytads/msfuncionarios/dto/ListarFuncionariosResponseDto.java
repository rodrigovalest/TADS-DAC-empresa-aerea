package org.skytads.msfuncionarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListarFuncionariosResponseDto {
    private Long codigo;
    private String cpf;
    private String email;
    private String nome;
    private String telefone;
    private String tipo;
}
