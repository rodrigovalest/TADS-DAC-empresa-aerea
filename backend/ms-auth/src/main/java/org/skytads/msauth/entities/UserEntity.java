package org.skytads.msauth.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msauth.domain.UserType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "users")
public class UserEntity {

    @Id
    private String id;

    @Field("codigo")
    private int codigo;

    @Indexed(unique = true)
    @Field("cpf")
    private String cpf;

    @Indexed(unique = true)
    @Field("email")
    private String email;

    @Field("senha")
    private String senha;

    @Field("tipo")
    private UserType tipo;

    @Field("access_token")
    private String accessToken;

    @Field("token_type")
    private String tokenType;

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private Instant updatedAt;
}
