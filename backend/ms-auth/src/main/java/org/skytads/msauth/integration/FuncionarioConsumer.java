package org.skytads.msauth.integration;

import lombok.RequiredArgsConstructor;
import org.skytads.msauth.dtos.messages.CriarClienteMessageDto;
import org.skytads.msauth.mappers.UserMapper;
import org.skytads.msauth.services.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FuncionarioConsumer {

    private final UserService userService;

    @RabbitListener(queues = "criar-cliente-queue")
    public void receberMensagem(CriarClienteMessageDto dto) {
        System.out.println("Mensagem recebida: " + dto);
        this.userService.createCliente(UserMapper.toDomain(dto));
    }
}
