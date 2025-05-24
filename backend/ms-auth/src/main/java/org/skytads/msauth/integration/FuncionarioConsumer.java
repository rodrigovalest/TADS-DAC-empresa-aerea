package org.skytads.msauth.integration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msauth.dtos.messages.AtualizarFuncionarioMessageDto;
import org.skytads.msauth.dtos.messages.CriarFuncionarioMessageDto;
import org.skytads.msauth.dtos.messages.DeletarFuncionarioMessageDto;
import org.skytads.msauth.mappers.UserMapper;
import org.skytads.msauth.services.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class FuncionarioConsumer {

    private final UserService userService;

    @RabbitListener(queues = "criar-usuario-queue")
    public void criarFuncionarioConsumer(CriarFuncionarioMessageDto dto) {
        log.info("[RabbitMQ criar-usuario-queue listener] criar funcionario message dto: {}", dto);
        this.userService.createFuncionario(UserMapper.toDomain(dto));
    }

    @RabbitListener(queues = "atualizar-usuario-queue")
    public void atualizarFuncionarioListener(AtualizarFuncionarioMessageDto dto) {
        log.info("[RabbitMQ atualizar-usuario-queue listener] atualizar funcionario message dto: {}", dto);
        this.userService.atualizarFuncionario(
                dto.getCodigo(), dto.getCpf(), dto.getOldEmail(), dto.getNewEmail(), dto.getSenha()
        );
    }

    @RabbitListener(queues = "inativar-usuario-queue")
    public void deletarFuncionario(DeletarFuncionarioMessageDto dto) {
        log.info("[RabbitMQ inativar-usuario-queue listener] deletar funcionario message dto: {}", dto);
        this.userService.deletarFuncionario(dto.getEmail());
    }
}
