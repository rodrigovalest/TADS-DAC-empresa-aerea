package org.skytads.msfuncionarios.config;

import lombok.RequiredArgsConstructor;
import org.skytads.msfuncionarios.messaging.RabbitMQProducer;
import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initFuncionarios(FuncionarioRepository repository, RabbitMQProducer rabbitMQProducer) {
        return args -> {
            if (repository.count() == 0) {
                Funcionario funcionario1 = new Funcionario(
                        null, "90769281001", "FUNCIONARIO TADS", "func_pre@gmail.com",
                        "TADS", "41999999999", true, null, null
                );

                Funcionario saved = repository.save(funcionario1);

                rabbitMQProducer.enviarParaCriacaoUsuario(
                        saved.getId(), saved.getCpf(), saved.getEmail(), saved.getSenha()
                );
            }
        };
    }
}
