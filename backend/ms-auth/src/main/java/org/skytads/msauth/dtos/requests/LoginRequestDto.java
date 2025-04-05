package org.skytads.msauth.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginRequestDto {

    @NotBlank(message = "Login must not be blank")
    @Email(message = "Login must be valid")
    private String login;

    @NotBlank(message = "Password must not be blank")
    private String senha;
}
