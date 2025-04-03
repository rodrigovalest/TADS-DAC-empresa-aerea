package org.skytads.mscliente.config;

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

    @Bean
    public Queue filaCriarCliente() {
        return new Queue(FILA_CRIAR_CLIENTE, true);
    }
    
    @Bean
    public DirectExchange exchangeCliente() {
        return new DirectExchange(EXCHANGE_CLIENTE);
    }
    
    @Bean
    public Binding bindingCriarUsuario() {
        return BindingBuilder.bind(filaCriarCliente())
                .to(exchangeCliente())
                .with(ROUTING_KEY_CRIAR_CLIENTE);
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