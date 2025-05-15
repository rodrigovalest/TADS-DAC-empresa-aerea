package org.skytads.msauth.services;

import lombok.RequiredArgsConstructor;
import org.skytads.msauth.domain.User;
import org.skytads.msauth.domain.UserType;
import org.skytads.msauth.entities.UserEntity;
import org.skytads.msauth.exceptions.BadCredentialsException;
import org.skytads.msauth.exceptions.UserNotFoundException;
import org.skytads.msauth.mappers.UserMapper;
import org.skytads.msauth.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Transactional
    public User login(String login, String senha) {
        UserEntity userEntity = this.userRepository.findByEmail(login).orElseThrow(
                () -> new BadCredentialsException("Bad credentials")
        );

        if (!Objects.equals(senha, userEntity.getSenha())) {
            throw new BadCredentialsException("Bad credentials");
        }

        String token = this.jwtService.generateToken(UserMapper.toDomain(userEntity));
        userEntity.setTokenType("Bearer");
        userEntity.setAccessToken(token);

        userEntity = this.userRepository.save(userEntity);
        return UserMapper.toDomain(userEntity);
    }

    @Transactional
    public void logout(String login) {
        UserEntity userEntity = this.userRepository.findByEmail(login).orElseThrow(
                () -> new UserNotFoundException("Usuario nao encontrado")
        );

        userEntity.setAccessToken(null);
        userEntity.setTokenType(null);

        this.userRepository.save(userEntity);
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        UserEntity userEntity = this.userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("Usuario nao encontrado")
        );
        return UserMapper.toDomain(userEntity);
    }

    @Transactional
    public void createCliente(User user) {
        user.setTipo(UserType.CLIENTE);
        this.userRepository.save(UserMapper.toEntity(user));
    }

    @Transactional
    public void createFuncionario(User user) {
        user.setTipo(UserType.FUNCIONARIO);
        this.userRepository.save(UserMapper.toEntity(user));
    }
}
