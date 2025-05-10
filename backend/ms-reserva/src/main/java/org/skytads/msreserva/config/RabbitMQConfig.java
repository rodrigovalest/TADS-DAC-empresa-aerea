package org.skytads.msreserva.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_RESERVA = "reserva.direct.exchange";

    public static final String FILA_CRIAR_RESERVA_CLIENTE = "criar-reserva.cliente.queue";
    public static final String ROUTING_KEY_CRIAR_RESERVA_CLIENTE = "criar-reserva.cliente";

    public static final String QUEUE_USAR_MILHAS_CRIAR_RESERVA = "usar-milhas.criar-reserva.queue";
    public static final String ROUTING_KEY_COMPRAR_MILHAS_CRIAR_RESERVA = "comprar-milhas.criar-reserva";

    public static final String QUEUE_RETORNAR_MILHAS_CLIENTE = "reverter-milhas.cliente.queue";
    public static final String ROUTING_KEY_RETORNAR_MILHAS_CLIENTE = "reverter-milhas.cliente";

    public static final String QUEUE_CRIAR_RESERVA_VOO = "criar-reserva.voo.queue";
    public static final String ROUTING_KEY_CRIAR_RESERVA_VOO = "criar-reserva.voo";

    public static final String QUEUE_RESERVAR_VOO_CRIAR_RESERVA = "reservar-voo.criar-reserva.queue";
    public static final String ROUTING_KEY_RESERVAR_VOO_CRIAR_RESERVA = "reservar-voo.criar-reserva";

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

    @Bean
    public DirectExchange exchangeReserva() {
        return new DirectExchange(EXCHANGE_RESERVA);
    }

    @Bean
    public Queue filaCriarReservaCliente() {
        return new Queue(FILA_CRIAR_RESERVA_CLIENTE, true);
    }

    @Bean
    public Binding bindingCriarReservaCliente() {
        return BindingBuilder.bind(filaCriarReservaCliente())
                .to(exchangeReserva())
                .with(ROUTING_KEY_CRIAR_RESERVA_CLIENTE);
    }

    @Bean
    public Queue filaUsarMilhasCriarReserva() {
        return new Queue(QUEUE_USAR_MILHAS_CRIAR_RESERVA, true);
    }

    @Bean
    public Binding bindingComprarMilhasCriarReserva() {
        return BindingBuilder.bind(filaUsarMilhasCriarReserva())
                .to(exchangeReserva())
                .with(ROUTING_KEY_COMPRAR_MILHAS_CRIAR_RESERVA);
    }

    @Bean
    public Queue filaRetornarMilhasCliente() {
        return new Queue(QUEUE_RETORNAR_MILHAS_CLIENTE, true);
    }

    @Bean
    public Binding bindingRetornarMilhasCliente() {
        return BindingBuilder.bind(filaRetornarMilhasCliente())
                .to(exchangeReserva())
                .with(ROUTING_KEY_RETORNAR_MILHAS_CLIENTE);
    }

    @Bean
    public Queue filaCriarReservaVoo() {
        return new Queue(QUEUE_CRIAR_RESERVA_VOO, true);
    }

    @Bean
    public Binding bindingCriarReservaVoo() {
        return BindingBuilder.bind(filaCriarReservaVoo())
                .to(exchangeReserva())
                .with(ROUTING_KEY_CRIAR_RESERVA_VOO);
    }

    @Bean
    public Queue filaReservarVooCriarReserva() {
        return new Queue(QUEUE_RESERVAR_VOO_CRIAR_RESERVA, true);
    }

    @Bean
    public Binding bindingReservarVooCriarReserva() {
        return BindingBuilder.bind(filaReservarVooCriarReserva())
                .to(exchangeReserva())
                .with(ROUTING_KEY_RESERVAR_VOO_CRIAR_RESERVA);
    }
}
