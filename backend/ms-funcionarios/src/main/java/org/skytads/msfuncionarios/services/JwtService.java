package org.skytads.msfuncionarios.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${api.jwt.secret}")
    private String secretKey;

    public String extrairIdFuncionario(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String extrairTipo(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("tipo", String.class);
    }

    public boolean validarToken(String token, String idFuncionario) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String idNoToken = claims.getSubject();
            Date expiracao = claims.getExpiration();

            return idNoToken.equals(idFuncionario) && !expiracao.before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}