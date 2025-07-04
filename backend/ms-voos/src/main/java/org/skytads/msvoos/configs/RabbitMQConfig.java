package org.skytads.msvoos.configs;

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

    // Criar reserva step 1
    public static final String QUEUE_RESERVAR_POLTRONA_VOO = "reservar-poltronas.voo.queue";
    public static final String ROUTING_KEY_RESERVAR_POLTRONA_VOO = "reservar-poltronas.voo.routing";

    // Criar reserva step 2
    public static final String QUEUE_RESERVAR_POLTRONA_RESERVA = "reservar-poltronas.reserva.queue";
    public static final String ROUTING_KEY_RESERVAR_POLTRONA_RESERVA = "reservar-poltrona.reserva.routing";

    // Criar reserva step 5
    public static final String QUEUE_REVERTER_RESERVA_POLTRONAS_VOO = "reverter-reserva-poltronas.voo.queue";
    public static final String ROUTING_KEY_REVERTER_RESERVA_POLTRONAS_VOO = "reverter-reserva-poltronas.voo.routing";

    public static final String QUEUE_CANCELAR_RESERVA_POLTRONAS_VOO = "cancelar-reserva-poltronas.voo.queue";
    public static final String ROUTING_KEY_CANCELAR_RESERVA_POLTRONAS_VOO = "cancelar-reserva-poltronas.voo.routing";

    // Alterar estado voo
    public static final String QUEUE_CANCELAR_VOO_RESERVA = "cancelar-voo.reserva.queue";
    public static final String ROUTING_KEY_CANCELAR_VOO_RESERVA = "cancelar-voo.reserva.routing";

    public static final String QUEUE_REALIZAR_VOO_RESERVA = "realizar-voo.reserva.queue";
    public static final String ROUTING_KEY_REALIZAR_VOO_RESERVA = "realizar-voo.reserva.routing";

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
    public Queue filaReservarPoltronasVoo() {
        return new Queue(QUEUE_RESERVAR_POLTRONA_VOO, true);
    }

    @Bean
    public Binding bindingReservarPoltronasVoo() {
        return BindingBuilder.bind(filaReservarPoltronasVoo())
                .to(exchangeReserva())
                .with(ROUTING_KEY_RESERVAR_POLTRONA_VOO);
    }

    @Bean
    public Queue filaReservarPoltronasReserva() {
        return new Queue(QUEUE_RESERVAR_POLTRONA_RESERVA, true);
    }

    @Bean
    public Binding bindingReservarPoltronasReserva() {
        return BindingBuilder.bind(filaReservarPoltronasReserva())
                .to(exchangeReserva())
                .with(ROUTING_KEY_RESERVAR_POLTRONA_RESERVA);
    }

    @Bean
    public Queue filaReverterReservaPoltronasVoo() {
        return new Queue(QUEUE_REVERTER_RESERVA_POLTRONAS_VOO, true);
    }

    @Bean
    public Binding bindingReverterReservaPoltronasVoo() {
        return BindingBuilder.bind(filaReverterReservaPoltronasVoo())
                .to(exchangeReserva())
                .with(ROUTING_KEY_REVERTER_RESERVA_POLTRONAS_VOO);
    }

    @Bean
    public Queue filaCancelarReservaPoltronasVoo() {
        return new Queue(QUEUE_CANCELAR_RESERVA_POLTRONAS_VOO, true);
    }

    @Bean
    public Binding bindingCancelarReservaPoltronasVoo() {
        return BindingBuilder.bind(filaCancelarReservaPoltronasVoo())
                .to(exchangeReserva())
                .with(ROUTING_KEY_CANCELAR_RESERVA_POLTRONAS_VOO);
    }

    @Bean
    public Queue filaCancelarVooReserva() {
        return new Queue(QUEUE_CANCELAR_VOO_RESERVA, true);
    }

    @Bean
    public Binding bindingCancelarVooReserva() {
        return BindingBuilder.bind(filaCancelarVooReserva())
                .to(exchangeReserva())
                .with(ROUTING_KEY_CANCELAR_VOO_RESERVA);
    }

    @Bean
    public Queue filaRealizarVooReserva() {
        return new Queue(QUEUE_REALIZAR_VOO_RESERVA, true);
    }

    @Bean
    public Binding bindingRealizarVooReserva() {
        return BindingBuilder.bind(filaRealizarVooReserva())
                .to(exchangeReserva())
                .with(ROUTING_KEY_REALIZAR_VOO_RESERVA);
    }
}
