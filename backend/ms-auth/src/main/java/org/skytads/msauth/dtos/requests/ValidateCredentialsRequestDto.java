package org.skytads.msauth.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ValidateCredentialsRequestDto {
    private String email;
    private String senha;
}
