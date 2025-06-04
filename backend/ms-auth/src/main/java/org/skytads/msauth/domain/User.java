package org.skytads.msauth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    private String id;
    private int codigo;
    private String cpf;
    private String email;
    private String senha;
    private UserType tipo;
    private String accessToken;
    private String tokenType;
    private Instant createdAt;
    private Instant updatedAt;

    public void updateToken(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }
}
