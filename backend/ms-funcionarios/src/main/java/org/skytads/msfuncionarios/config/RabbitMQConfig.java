package org.skytads.msfuncionarios.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String FILA_CRIAR_USUARIO = "criar-usuario-queue";
    public static final String FILA_ATUALIZAR_USUARIO = "atualizar-usuario-queue";
    public static final String FILA_INATIVAR_USUARIO = "inativar-usuario-queue";

    public static final String EXCHANGE_FUNCIONARIO = "funcionario-exchange";

    public static final String ROUTING_KEY_CRIAR_USUARIO = "criar.usuario";
    public static final String ROUTING_KEY_ATUALIZAR_USUARIO = "atualizar.usuario";
    public static final String ROUTING_KEY_INATIVAR_USUARIO = "inativar.usuario";

    public static final String ROUTING_KEY_CADASTRAR_VOO = "cadastrar.voo";
    public static final String ROUTING_KEY_CONFIRMAR_EMBARQUE = "confirmar.embarque";
    public static final String ROUTING_KEY_CANCELAR_VOO = "cancelar.voo";
    public static final String ROUTING_KEY_REALIZAR_VOO = "realizar.voo";


    
    @Bean
    public Queue filaCriarUsuario() {
        return new Queue(FILA_CRIAR_USUARIO, true);
    }

    @Bean
    public Queue filaAtualizarUsuario() {
        return new Queue(FILA_ATUALIZAR_USUARIO, true);
    }

    @Bean
    public Queue filaInativarUsuario() {
        return new Queue(FILA_INATIVAR_USUARIO, true);
    }

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE_FUNCIONARIO);
    }

    @Bean
    public Binding bindingCriarUsuario() {
        return BindingBuilder.bind(filaCriarUsuario())
                .to(exchange())
                .with(ROUTING_KEY_CRIAR_USUARIO);
    }

    @Bean
    public Binding bindingAtualizarUsuario() {
        return BindingBuilder.bind(filaAtualizarUsuario())
                .to(exchange())
                .with(ROUTING_KEY_ATUALIZAR_USUARIO);
    }

    @Bean
    public Binding bindingInativarUsuario() {
        return BindingBuilder.bind(filaInativarUsuario())
                .to(exchange())
                .with(ROUTING_KEY_INATIVAR_USUARIO);
    }

    @Bean
    public Queue filaCadastrarVoo() {
        return new Queue("cadastrar-voo-queue", true);
    }

    @Bean
    public Binding bindingCadastrarVoo() {
        return BindingBuilder.bind(filaCadastrarVoo())
                .to(exchange())
                .with(ROUTING_KEY_CADASTRAR_VOO);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}
