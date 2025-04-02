package org.skytads.msfuncionarios.messaging;
import org.skytads.msfuncionarios.config.RabbitMQConfig;
import org.skytads.msfuncionarios.dto.MensagemCriarUsuarioDTO;
import org.skytads.msfuncionarios.dto.MensagemUsuarioDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void enviarParaCriacaoUsuario(String email, String senha, String tipo) {
        MensagemCriarUsuarioDTO mensagem = new MensagemCriarUsuarioDTO();
        mensagem.setEmail(email);
        mensagem.setSenha(senha);
        mensagem.setTipo(tipo);
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_FUNCIONARIO,
                RabbitMQConfig.ROUTING_KEY_CRIAR_USUARIO,
                mensagem
        );
    }
    
    public void enviarParaAtualizacaoUsuario(String email) {
        MensagemUsuarioDTO mensagem = new MensagemUsuarioDTO();
        mensagem.setEmail(email);
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_FUNCIONARIO,
                RabbitMQConfig.ROUTING_KEY_ATUALIZAR_USUARIO,
                mensagem
        );
    }
    
    public void enviarParaInativacaoUsuario(String email) {
        MensagemUsuarioDTO mensagem = new MensagemUsuarioDTO();
        mensagem.setEmail(email);
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_FUNCIONARIO,
                RabbitMQConfig.ROUTING_KEY_INATIVAR_USUARIO,
                mensagem
        );
    }
}