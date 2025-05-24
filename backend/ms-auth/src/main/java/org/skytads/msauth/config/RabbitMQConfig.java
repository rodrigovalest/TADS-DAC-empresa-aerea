package org.skytads.msauth.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String FILA_CRIAR_CLIENTE = "criar-cliente-queue";
    public static final String EXCHANGE_CLIENTE = "cliente-exchange";
    public static final String ROUTING_KEY_CRIAR_CLIENTE = "criar.cliente";

    public static final String EXCHANGE_FUNCIONARIO = "funcionario-exchange";

    public static final String FILA_CRIAR_USUARIO = "criar-usuario-queue";
    public static final String FILA_ATUALIZAR_USUARIO = "atualizar-usuario-queue";
    public static final String FILA_INATIVAR_USUARIO = "inativar-usuario-queue";

    public static final String ROUTING_KEY_CRIAR_USUARIO = "criar.usuario";
    public static final String ROUTING_KEY_ATUALIZAR_USUARIO = "atualizar.usuario";
    public static final String ROUTING_KEY_INATIVAR_USUARIO = "inativar.usuario";

    @Bean
    public Queue filaCriarCliente() {
        return new Queue(FILA_CRIAR_CLIENTE, true);
    }

    @Bean
    public DirectExchange exchangeCliente() {
        return new DirectExchange(EXCHANGE_CLIENTE);
    }

    @Bean
    public Binding bindingCriarCliente() {
        return BindingBuilder.bind(filaCriarCliente())
                .to(exchangeCliente())
                .with(ROUTING_KEY_CRIAR_CLIENTE);
    }

    @Bean
    public Queue filaCriarUsuario() {
        return new Queue(FILA_CRIAR_USUARIO, true);
    }

    @Bean
    public DirectExchange exchangeFuncionario() {
        return new DirectExchange(EXCHANGE_FUNCIONARIO);
    }

    @Bean
    public Binding bindingCriarUsuario() {
        return BindingBuilder.bind(filaCriarUsuario())
                .to(exchangeFuncionario())
                .with(ROUTING_KEY_CRIAR_USUARIO);
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
    public Binding bindingAtualizarUsuario() {
        return BindingBuilder.bind(filaAtualizarUsuario())
                .to(exchangeFuncionario())
                .with(ROUTING_KEY_ATUALIZAR_USUARIO);
    }

    @Bean
    public Binding bindingInativarUsuario() {
        return BindingBuilder.bind(filaInativarUsuario())
                .to(exchangeFuncionario())
                .with(ROUTING_KEY_INATIVAR_USUARIO);
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
