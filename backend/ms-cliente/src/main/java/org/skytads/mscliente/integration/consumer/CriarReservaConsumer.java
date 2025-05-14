package org.skytads.mscliente.integration.consumer;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.config.RabbitMQConfig;
import org.skytads.mscliente.dtos.messages.CriarReservaClienteMessageDto;
import org.skytads.mscliente.exceptions.ClienteNaoEncontradoException;
import org.skytads.mscliente.exceptions.SaldoInsuficienteException;
import org.skytads.mscliente.integration.producer.CriarReservaProducer;
import org.skytads.mscliente.services.ClienteService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaConsumer {

    private final ClienteService clienteService;
    private final CriarReservaProducer criarReservaProducer;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_USAR_MILHAS_CLIENTE)
    public void usarMilhas(CriarReservaClienteMessageDto dto) {
        System.out.println("Consumer criar reserva cliente: " + dto);

        try {
            this.clienteService.usarMilhas(dto.getCodigoCliente(), dto.getMilhasUtilizadas());
            this.criarReservaProducer.sendUsarMilhasToReserva(
                    dto.getReservaId(), dto.getCodigoCliente(), true, "cliente valido e milhas utilizadas com sucesso"
            );
        } catch (ClienteNaoEncontradoException e) {
            System.out.println("reserva id: " + dto.getReservaId() + " | cliente nao encontrado");
            this.criarReservaProducer.sendUsarMilhasToReserva(
                    dto.getReservaId(), dto.getCodigoCliente(), false, "cliente nao encontrado"
            );
        } catch (SaldoInsuficienteException e) {
            System.out.println("reserva id: " + dto.getReservaId() + " | saldo insuficiente");
            this.criarReservaProducer.sendUsarMilhasToReserva(
                    dto.getReservaId(), dto.getCodigoCliente(), false, "saldo de milhas insuficiente"
            );
        } catch (Exception e) {
            System.out.println("algo deu errado" + e.getMessage());
            this.criarReservaProducer.sendUsarMilhasToReserva(
                    dto.getReservaId(), dto.getCodigoCliente(), false, "algo deu errado: " + e.getMessage()
            );
        }
    }
}
