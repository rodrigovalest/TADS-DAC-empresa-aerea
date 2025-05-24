package org.skytads.msauth.mappers;

import org.skytads.msauth.domain.User;
import org.skytads.msauth.domain.UserType;
import org.skytads.msauth.dtos.messages.AtualizarFuncionarioMessageDto;
import org.skytads.msauth.dtos.messages.CriarClienteMessageDto;
import org.skytads.msauth.dtos.responses.ClienteResponseDto;
import org.skytads.msauth.dtos.responses.LoginResponseDto;
import org.skytads.msauth.dtos.responses.UsuarioResponseDto;
import org.skytads.msauth.entities.UserEntity;
import org.skytads.msauth.dtos.messages.CriarFuncionarioMessageDto;
import java.time.Instant;

public class UserMapper {

    public static User toDomain(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getCodigo(),
                entity.getCpf(),
                entity.getEmail(),
                entity.getSenha(),
                entity.getTipo(),
                entity.getAccessToken(),
                entity.getTokenType(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public static UserEntity toEntity(User domain) {
        return new UserEntity(
                domain.getId(),
                domain.getCodigo(),
                domain.getCpf(),
                domain.getEmail(),
                domain.getSenha(),
                domain.getTipo(),
                domain.getAccessToken(),
                domain.getTokenType(),
                domain.getCreatedAt(),
                domain.getUpdatedAt()
        );
    }

    public static User toDomain(ClienteResponseDto clienteResponseDto) {
        return new User(
                null,
                clienteResponseDto.getCodigo(),
                clienteResponseDto.getCpf(),
                clienteResponseDto.getEmail(),
                null,
                UserType.CLIENTE,
                null,
                null,
                null,
                null
        );
    }

    public static LoginResponseDto toLoginResponseDto(User user) {
        UsuarioResponseDto usuarioResponseDto = new UsuarioResponseDto(
                user.getCodigo(),
                user.getCpf(),
                user.getEmail()
        );

        return new LoginResponseDto(
                user.getAccessToken(),
                user.getTokenType(),
                usuarioResponseDto,
                user.getTipo().name()
        );
    }

    public static User toDomain(CriarClienteMessageDto dto) {
        User user = new User();
        user.setCodigo(dto.getCodigo());
        user.setCpf(dto.getCpf());
        user.setEmail(dto.getEmail());
        user.setSenha(dto.getSenha());
        user.setAccessToken(null);
        user.setTokenType(null);
        user.setTipo(UserType.CLIENTE);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        return user;
    }

    public static User toDomain(CriarFuncionarioMessageDto dto) {
        User user = new User();
        user.setCodigo(dto.getCodigo());
        user.setCpf(dto.getCpf());
        user.setEmail(dto.getEmail());
        user.setSenha(dto.getSenha());
        user.setTipo(UserType.FUNCIONARIO);
        user.setAccessToken(null);
        user.setTokenType(null);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        return user;
    }
}
