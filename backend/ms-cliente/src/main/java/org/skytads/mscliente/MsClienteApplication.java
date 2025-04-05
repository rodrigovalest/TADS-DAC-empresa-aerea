package org.skytads.mscliente;

import org.skytads.mscliente.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MsClienteApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(MsClienteApplication.class, args);
    }

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public void run(String... args) throws Exception {
        this.clienteRepository.deleteAll();
    }
}