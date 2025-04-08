package org.skytads.mscliente.services;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.exceptions.BadCredentialsException;
import org.skytads.mscliente.exceptions.ClienteNaoEncontradoException;
import org.skytads.mscliente.mappers.ClienteMapper;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.repositories.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EmailService emailService;
    private final ClienteMessagePublisherService clienteMessagePublisherService;

    @Transactional
    public Cliente autocadastro(Cliente novoCliente) {
        String senha = String.format("%04d", new Random().nextInt(10000));
        novoCliente.setSenha(senha);
        this.emailService.sendEmail(novoCliente.getEmail(), "Cadastro na plataforma SkyTADS", "Sua senha é: " + senha);

        novoCliente.setSaldoMilhas(0L);

        System.out.println("senha criada para o usuario " + novoCliente.getEmail() + ": " + senha);

        novoCliente = this.clienteRepository.save(novoCliente);
        this.clienteMessagePublisherService.sendPointsMessage(ClienteMapper.toCriarClienteMessageDto(novoCliente));

        return novoCliente;
    }

    @Transactional(readOnly = true)
    public Cliente findClienteByEmail(String email) {
        return this.clienteRepository.findByEmail(email).orElseThrow(
                () -> new ClienteNaoEncontradoException("cliente nao encontrado")
        );
    }
}
