package org.skytads.msvoos.configs;

import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.repositories.AeroportoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(AeroportoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        new AeroportoEntity("GRU", "Aeroporto Internacional de SãoPaulos/Guarulhos", "Guarulhos", "SP"),
                        new AeroportoEntity("POA", "Aeroporto Internacional Salgado Filho", "Porto Alegre", "RS"),
                        new AeroportoEntity("CWB", "Aeroporto Internacional de Curitiba", "Curitiba", "PR"),
                        new AeroportoEntity("GIG", "Aeroporto Internacional do Rio de Janeiro/Galeão", "Rio de Janeiro", "RJ"),
                        new AeroportoEntity("CGH", "Aeroporto de Congonhas", "São Paulo", "SP"),
                        new AeroportoEntity("SDU", "Aeroporto Santos Dumont", "Rio de Janeiro", "RJ"),
                        new AeroportoEntity("CNF", "Aeroporto Internacional de Confins", "Belo Horizonte", "MG"),
                        new AeroportoEntity("BSB", "Aeroporto Internacional de Brasília", "Brasília", "DF")
                ));
            }
        };
    }
}
