package org.skytads.msfuncionarios.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.skytads.msfuncionarios.model.UserDetailsImpl;
import org.skytads.msfuncionarios.model.UserType;
import org.skytads.msfuncionarios.services.JwtService;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request, 
            @NonNull HttpServletResponse response, 
            @NonNull FilterChain filterChain) 
        throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        String token = (authHeader != null) ? authHeader.replace("Bearer ", "") : null;

        if (token != null) {
            String idFuncionario = jwtService.extrairIdFuncionario(token);
            String tipo = jwtService.extrairTipo(token);
            
            if (jwtService.validarToken(token, idFuncionario)) {
                UserDetailsImpl userDetails = new UserDetailsImpl(idFuncionario, UserType.valueOf(tipo));
                var authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}