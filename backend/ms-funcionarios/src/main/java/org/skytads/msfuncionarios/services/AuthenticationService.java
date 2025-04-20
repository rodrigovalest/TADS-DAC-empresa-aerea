package org.skytads.msfuncionarios.services;

import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.model.UserType;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class AuthenticationService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Value("${api.jwt.secret}")
    private String secretKey;

    @Value("${api.jwt.expiration:86400000}")
    private long expirationTime;

    public String autenticar(String email, String senha) {
        Funcionario funcionario = funcionarioRepository.findByEmailAndAtivoTrue(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + email));

        if (!senha.equals(funcionario.getSenha())) {
            throw new BadCredentialsException("Senha inválida");
        }

        return gerarToken(funcionario);
    }

    private String gerarToken(Funcionario funcionario) {
        Instant agora = Instant.now();
        Instant expiracao = agora.plus(expirationTime, ChronoUnit.MILLIS);

        return Jwts.builder()
                .subject(funcionario.getEmail())
                .claim("tipo", UserType.FUNCIONARIO.name())
                .claim("nome", funcionario.getNome())
                .claim("cpf", funcionario.getCpf())
                .issuedAt(Date.from(agora))
                .expiration(Date.from(expiracao))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }
}