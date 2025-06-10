package org.skytads.msvoos.configs;

import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.repositories.AeroportoRepository;
import org.skytads.msvoos.repositories.VooRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(AeroportoRepository aeroportoRepository, VooRepository vooRepository) {
        return args -> {
            if (aeroportoRepository.count() == 0) {
                aeroportoRepository.saveAll(List.of(
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

            // Seed de voos
            if (vooRepository.count() == 0) {
                var voos = List.of(
                        new Object[]{"2025-09-11T09:30:00-03:00", "CWB", "GIG"},
                        new Object[]{"2025-10-12T08:30:00-03:00", "CWB", "POA"}
                );

                var agora = OffsetDateTime.now(java.time.ZoneOffset.of("-03:00"));
                var voosAtuais = List.of(
                        new Object[]{agora.toString(), "POA", "CWB"},
                        new Object[]{agora.plusDays(1).toString(), "POA", "CWB"},
                        new Object[]{agora.toString(), "CWB", "GIG"},
                        new Object[]{agora.plusDays(1).toString(), "CWB", "GIG"},
                        new Object[]{agora.plusDays(1).toString(), "CWB", "BSB"},
                        new Object[]{agora.plusDays(2).toString(), "SDU", "CGH"},
                        new Object[]{agora.toString(), "CWB", "POA"},
                        new Object[]{agora.plusDays(1).toString(), "CWB", "POA"}
                );

                var todosVoos = new ArrayList<>(voos);
                todosVoos.addAll(voosAtuais);

                for (Object[] dados : todosVoos) {
                    var dataStr = (String) dados[0];
                    var origemCod = (String) dados[1];
                    var destinoCod = (String) dados[2];

                    var origem = aeroportoRepository.findById(origemCod)
                            .orElseThrow(() -> new IllegalStateException("[MIGRATION]: Aeroporto origem não encontrado: " + origemCod));

                    var destino = aeroportoRepository.findById(destinoCod)
                            .orElseThrow(() -> new IllegalStateException("[MIGRATION]: Aeroporto destino não encontrado: " + destinoCod));

                    var dataOffset = OffsetDateTime.parse(dataStr);
                    var dataLocal = dataOffset.toLocalDateTime();

                    var voo = new VooEntity(
                            dataLocal,
                            origem,
                            destino,
                            399.90f,
                            180L,
                            0L,
                            StatusVooEnum.CONFIRMADO
                    );

                    vooRepository.save(voo);
                }
            }
        };
    }
}
