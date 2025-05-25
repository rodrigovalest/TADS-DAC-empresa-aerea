package org.skytads.msfuncionarios.messaging;
import org.skytads.msfuncionarios.config.RabbitMQConfig;
import org.skytads.msfuncionarios.dto.AtualizarFuncionarioMessageDto;
import org.skytads.msfuncionarios.dto.DeletarFuncionarioMessageDto;
import org.skytads.msfuncionarios.dto.MensagemCriarUsuarioDTO;
import org.skytads.msfuncionarios.dto.MensagemUsuarioDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void enviarParaCriacaoUsuario(Long codigoFuncionario, String cpf, String email, String senha) {
        MensagemCriarUsuarioDTO mensagem = new MensagemCriarUsuarioDTO(
                codigoFuncionario, cpf, email, senha
        );

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_FUNCIONARIO,
                RabbitMQConfig.ROUTING_KEY_CRIAR_USUARIO,
                mensagem
        );
    }

    public void enviarParaAtualizacaoUsuario(Long codigo, String oldEmail, String newEmail, String cpf, String senha) {
        AtualizarFuncionarioMessageDto mensagem = new AtualizarFuncionarioMessageDto(
            codigo, cpf, oldEmail, newEmail, senha
        );

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_FUNCIONARIO,
                RabbitMQConfig.ROUTING_KEY_ATUALIZAR_USUARIO,
                mensagem
        );
    }
    
    public void enviarParaInativacaoUsuario(String email) {
        DeletarFuncionarioMessageDto mensagem = new DeletarFuncionarioMessageDto(email);

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_FUNCIONARIO,
                RabbitMQConfig.ROUTING_KEY_INATIVAR_USUARIO,
                mensagem
        );
    }
}