package org.skytads.msauth.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.skytads.msauth.domain.User;
import org.skytads.msauth.dtos.requests.LoginRequestDto;
import org.skytads.msauth.dtos.requests.LogoutRequestDto;
import org.skytads.msauth.dtos.responses.LoginResponseDto;
import org.skytads.msauth.mappers.UserMapper;
import org.skytads.msauth.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto requestDto) {
        User user = this.userService.login(requestDto.getLogin(), requestDto.getSenha());
        return ResponseEntity.ok(UserMapper.toLoginResponseDto(user));
    }

    @PatchMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody @Valid LogoutRequestDto requestDto) {
        this.userService.logout(requestDto.getLogin());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hello")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok("Hello world");
    }
}
