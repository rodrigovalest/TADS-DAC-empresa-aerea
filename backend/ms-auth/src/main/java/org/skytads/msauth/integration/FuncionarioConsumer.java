package org.skytads.msauth.integration;

import lombok.RequiredArgsConstructor;
import org.skytads.msauth.dtos.messages.CriarFuncionarioMessageDto;
import org.skytads.msauth.mappers.UserMapper;
import org.skytads.msauth.services.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FuncionarioConsumer {

    private final UserService userService;

    @RabbitListener(queues = "criar-usuario-queue")
    public void receberMensagem(CriarFuncionarioMessageDto dto) {
        System.out.println("Mensagem recebida de funcionário: " + dto);
        this.userService.createFuncionario(UserMapper.toDomain(dto));
    }
}
