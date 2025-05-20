package org.skytads.msfuncionarios.config;

import org.skytads.msfuncionarios.messaging.RabbitMQProducer;
import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.model.UserType;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner initFuncionarios(FuncionarioRepository repository, RabbitMQProducer rabbitMQProducer) {
        return args -> {
            if (repository.count() == 0) {
                List<Funcionario> funcionarios = List.of(
                    new Funcionario(null, "90769281001", "FUNCIONARIO TADS", "func_pre@gmail.com", "1234", "41999999999", true, LocalDateTime.now(), LocalDateTime.now()),
                    new Funcionario(null, "23456789012", "Maria Souza", "maria@gmail.com", "1234", "41888888888", true, LocalDateTime.now(), LocalDateTime.now()),
                    new Funcionario(null, "34567890123", "Carlos Lima", "carlos@gmail.com", "1234", "41777777777", true, LocalDateTime.now(), LocalDateTime.now())
                );
                repository.saveAll(funcionarios);
                for (Funcionario f : funcionarios) {
                    rabbitMQProducer.enviarParaCriacaoUsuario(f.getEmail(), f.getSenha(), UserType.FUNCIONARIO.name());
                }
            }
        };
    }
}
