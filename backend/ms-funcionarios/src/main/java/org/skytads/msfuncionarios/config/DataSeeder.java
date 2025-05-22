/*package org.skytads.msfuncionarios.config;

import org.skytads.msfuncionarios.model.Funcionario;
import org.skytads.msfuncionarios.repository.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner initFuncionarios(FuncionarioRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    new Funcionario("90769281001", "FUNCIONARIO TADS", "func_pre@gmail.com", "TADS", "41999999999", true, LocalDateTime.now(), LocalDateTime.now()),
                    new Funcionario("23456789012", "Maria Souza", "maria@gmail.com", "TADS", "41888888888", true, LocalDateTime.now(), LocalDateTime.now()),
                    new Funcionario("34567890123", "Carlos Lima", "carlos@gmail.com", "TADS", "41777777777", true, LocalDateTime.now(), LocalDateTime.now())
                ));
            }
        };
    }
}
 */