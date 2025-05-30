package org.skytads.mscliente.services;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.exceptions.ClienteNaoEncontradoException;
import org.skytads.mscliente.exceptions.SaldoInsuficienteException;
import org.skytads.mscliente.integration.consumer.ClienteMessageProducerService;
import org.skytads.mscliente.mappers.ClienteMapper;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.models.TipoTransacao;
import org.skytads.mscliente.models.TransacaoMilhas;
import org.skytads.mscliente.repositories.ClienteRepository;
import org.skytads.mscliente.repositories.TransacaoMilhasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EmailService emailService;
    private final ClienteMessageProducerService clienteMessageProducerService;
    private final TransacaoMilhasRepository transacaoMilhasRepository;

    @Transactional
    public Cliente autocadastro(Cliente novoCliente) {
        novoCliente.setCpf(novoCliente.getCpf());

        String senha = String.format("%04d", new Random().nextInt(10000));
        novoCliente.setSenha(senha);
        this.emailService.sendEmail(novoCliente.getEmail(), "Cadastro na plataforma SkyTADS", "Sua senha é: " + senha);

        novoCliente.setSaldoMilhas(0L);

        System.out.println("senha criada para o usuario " + novoCliente.getEmail() + ": " + senha);

        novoCliente = this.clienteRepository.save(novoCliente);
        this.clienteMessageProducerService.sendToCriarClienteQueue(ClienteMapper.toCriarClienteMessageDto(novoCliente));

        return novoCliente;
    }

    @Transactional(readOnly = true)
    public Cliente findClienteByEmail(String email) {
        return this.clienteRepository.findByEmail(email).orElseThrow(
                () -> new ClienteNaoEncontradoException("cliente nao encontrado")
        );
    }
    
    @Transactional(readOnly = true)
    public List<Cliente> findAllClientes() {
        return this.clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Cliente findClienteById(Long id) {
        return this.clienteRepository.findById(id).orElseThrow(
                () -> new ClienteNaoEncontradoException("cliente nao encontrado com ID: " + id)
        );
    }

    @Transactional
    public Cliente atualizarMilhas(Long clienteId, Integer milhas) {
        Cliente cliente = this.findClienteById(clienteId);
        cliente.setSaldoMilhas(cliente.getSaldoMilhas() + milhas);
        return clienteRepository.save(cliente);
    }

    @Transactional
    public void atualizarMilhasByCpf(String cpf, Integer milhas) {
        Cliente cliente = clienteRepository.findByCpf(cpf)
                .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado com CPF: " + cpf));
        
        cliente.setSaldoMilhas(cliente.getSaldoMilhas() + milhas);
        clienteRepository.save(cliente);
    }

    @Transactional
    public void usarMilhas(Long codigoReserva, Long codigoCliente, Long milhas) {
        Cliente cliente = this.clienteRepository.findById(codigoCliente).orElseThrow(
                () -> new ClienteNaoEncontradoException("cliente nao encontrado com ID: " + codigoCliente)
        );

        if (milhas > cliente.getSaldoMilhas()) {
            throw new SaldoInsuficienteException("nao foi possivel usar as milhas. saldo insuficiente");
        }

        Long saldoMilhasAntigo = cliente.getSaldoMilhas();
        Long novoSaldoMilhas = cliente.getSaldoMilhas() - milhas;

        cliente.setSaldoMilhas(novoSaldoMilhas);
        this.clienteRepository.save(cliente);

        TransacaoMilhas transacaoMilhas = new TransacaoMilhas();
        transacaoMilhas.setCliente(cliente);
        transacaoMilhas.setQuantidadeMilhas(Math.toIntExact(milhas));
        transacaoMilhas.setValorEmReais((double) (milhas * 5.0f));
        transacaoMilhas.setTipo(TipoTransacao.SAIDA);
        transacaoMilhas.setDescricao("Usar milhas para efetuar a reserva {" + codigoReserva + "}");
        transacaoMilhas.setCodigoReserva(codigoReserva.toString());
        this.transacaoMilhasRepository.save(transacaoMilhas);
    }

    @Transactional(readOnly = true)
    public Long buscarSaldoMilhas(String cpf) {
        Cliente cliente = clienteRepository.findByCpf(cpf)
                                           .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado com CPF: " + cpf));
        return cliente.getSaldoMilhas();
    }
}