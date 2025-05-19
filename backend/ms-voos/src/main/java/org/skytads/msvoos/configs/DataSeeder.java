package org.skytads.msvoos.configs;

import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.repositories.AeroportoRepository;
import org.skytads.msvoos.repositories.VooRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
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

    @Bean
    CommandLineRunner initVoos(AeroportoRepository aeroportoRepository, VooRepository vooRepository) {
        return args -> {
            if (vooRepository.count() == 0 && aeroportoRepository.count() >= 2) {
                AeroportoEntity poa = aeroportoRepository.findByCodigo("POA").orElse(null);
                AeroportoEntity cwb = aeroportoRepository.findByCodigo("CWB").orElse(null);
                AeroportoEntity gig = aeroportoRepository.findByCodigo("GIG").orElse(null);
                AeroportoEntity gru = aeroportoRepository.findByCodigo("GRU").orElse(null);
                AeroportoEntity cgh = aeroportoRepository.findByCodigo("CGH").orElse(null);
                AeroportoEntity sdu = aeroportoRepository.findByCodigo("SDU").orElse(null);
                AeroportoEntity cnf = aeroportoRepository.findByCodigo("CNF").orElse(null);
                AeroportoEntity bsb = aeroportoRepository.findByCodigo("BSB").orElse(null);
                if (gru != null && cgh != null && sdu != null && cnf != null && bsb != null) {
                    vooRepository.saveAll(List.of(
                        new VooEntity(
                            LocalDateTime.of(2025, 8, 10, 10, 30),
                            poa, cwb, 500.0f, 180L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                        new VooEntity(
                            LocalDateTime.of(2025, 9, 11, 9, 30),
                            cwb, gig, 400.0f, 150L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                        new VooEntity(
                            LocalDateTime.of(2025, 10, 12, 8, 30),
                            cwb, poa, 600.0f, 200L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                        new VooEntity(
                            LocalDateTime.of(2025, 11, 13, 7, 30),
                            gru, cgh, 700.0f, 250L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                        new VooEntity(
                            LocalDateTime.of(2025, 12, 14, 6, 30),
                            sdu, cnf, 800.0f, 300L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                        new VooEntity(
                            LocalDateTime.of(2025, 1, 15, 5, 30),
                            bsb, sdu, 900.0f, 350L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                        new VooEntity(
                            LocalDateTime.of(2025, 2, 16, 4, 30),
                            cnf, bsb, 1000.0f, 400L, 0L, StatusVooEnum.CONFIRMADO
                        ),
                    ));
                }
            }
        };
    }
}

