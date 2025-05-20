package org.skytads.msvoos.configs;

import org.skytads.msvoos.entities.AeroportoEntity;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.enums.StatusVooEnum;
import org.skytads.msvoos.repositories.AeroportoRepository;
import org.skytads.msvoos.repositories.VooRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initAeroportos(AeroportoRepository aeroportoRepository) {
        return args -> {
            // Definir todos os aeroportos necessários
            Map<String, AeroportoEntity> aeroportosMap = Map.of(
                "GRU", new AeroportoEntity("GRU", "Aeroporto Internacional de São Paulo/Guarulhos", "Guarulhos", "SP"),
                "POA", new AeroportoEntity("POA", "Aeroporto Internacional Salgado Filho", "Porto Alegre", "RS"),
                "CWB", new AeroportoEntity("CWB", "Aeroporto Internacional de Curitiba", "Curitiba", "PR"),
                "GIG", new AeroportoEntity("GIG", "Aeroporto Internacional do Rio de Janeiro/Galeão", "Rio de Janeiro", "RJ"),
                "CGH", new AeroportoEntity("CGH", "Aeroporto de Congonhas", "São Paulo", "SP"),
                "SDU", new AeroportoEntity("SDU", "Aeroporto Santos Dumont", "Rio de Janeiro", "RJ"),
                "CNF", new AeroportoEntity("CNF", "Aeroporto Internacional de Confins", "Belo Horizonte", "MG"),
                "BSB", new AeroportoEntity("BSB", "Aeroporto Internacional de Brasília", "Brasília", "DF")
            );
            
            // Verificar quais aeroportos já existem
            List<String> codigosExistentes = aeroportoRepository.findAll().stream()
                    .map(AeroportoEntity::getCodigo)
                    .collect(Collectors.toList());
            
            System.out.println("Aeroportos existentes: " + codigosExistentes);
            
            // Identificar quais aeroportos estão faltando
            List<AeroportoEntity> aeroportosFaltantes = new ArrayList<>();
            for (String codigo : aeroportosMap.keySet()) {
                if (!codigosExistentes.contains(codigo)) {
                    System.out.println("Aeroporto faltante: " + codigo);
                    aeroportosFaltantes.add(aeroportosMap.get(codigo));
                }
            }
            
            // Inserir apenas os aeroportos faltantes
            if (!aeroportosFaltantes.isEmpty()) {
                System.out.println("Inserindo " + aeroportosFaltantes.size() + " aeroportos faltantes");
                aeroportoRepository.saveAll(aeroportosFaltantes);
                System.out.println("Aeroportos adicionados com sucesso");
            } else {
                System.out.println("Todos os aeroportos necessários já existem");
            }
        };
    }

    @Bean
    CommandLineRunner initVoos(AeroportoRepository aeroportoRepository, VooRepository vooRepository) {
        return args -> {
            // Só tentamos criar voos se já houver aeroportos e nenhum voo ainda
            if (vooRepository.count() == 0 && aeroportoRepository.count() >= 8) {
                System.out.println("Iniciando criação de voos...");
                
                // Criamos voo por voo individualmente para ter mais controle
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "POA", "CWB", 
                    LocalDateTime.of(2025, 8, 10, 10, 30), 
                    500.0f, 180L
                );
                
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "CWB", "GIG", 
                    LocalDateTime.of(2025, 9, 11, 9, 30), 
                    400.0f, 150L
                );
                
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "CWB", "POA", 
                    LocalDateTime.of(2025, 10, 12, 8, 30), 
                    600.0f, 200L
                );
                
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "GRU", "CGH", 
                    LocalDateTime.of(2025, 11, 13, 7, 30), 
                    700.0f, 250L
                );
                
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "SDU", "CNF", 
                    LocalDateTime.of(2025, 12, 14, 6, 30), 
                    800.0f, 300L
                );
                
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "BSB", "SDU", 
                    LocalDateTime.of(2025, 1, 15, 5, 30), 
                    900.0f, 350L
                );
                
                criarVoo(
                    vooRepository, aeroportoRepository,
                    "CNF", "BSB", 
                    LocalDateTime.of(2025, 2, 16, 4, 30), 
                    1000.0f, 400L
                );
                
                System.out.println("Processo de criação de voos concluído!");
            } else if (aeroportoRepository.count() < 8) {
                System.out.println("Não há aeroportos suficientes para criar os voos. Encontrados: " 
                    + aeroportoRepository.count() + ", Necessários: 8");
            } else {
                System.out.println("Voos já existem ou não precisam ser criados");
            }
        };
    }
    
    @Transactional
    private void criarVoo(
            VooRepository vooRepository,
            AeroportoRepository aeroportoRepository,
            String codigoOrigem, 
            String codigoDestino,
            LocalDateTime data,
            float valor,
            long quantidadePoltronas) {
        
        try {
            // Busca os aeroportos diretamente do banco de dados
            Optional<AeroportoEntity> origemOpt = aeroportoRepository.findById(codigoOrigem);
            Optional<AeroportoEntity> destinoOpt = aeroportoRepository.findById(codigoDestino);
            
            if (origemOpt.isEmpty()) {
                System.err.println("Aeroporto de origem não encontrado: " + codigoOrigem);
                return;
            }
            
            if (destinoOpt.isEmpty()) {
                System.err.println("Aeroporto de destino não encontrado: " + codigoDestino);
                return;
            }
            
            AeroportoEntity origem = origemOpt.get();
            AeroportoEntity destino = destinoOpt.get();
            
            System.out.println("Criando voo: " + origem.getCodigo() + " -> " + destino.getCodigo());
            
            VooEntity voo = new VooEntity(
                data,
                origem,
                destino,
                valor,
                quantidadePoltronas,
                0L,
                StatusVooEnum.CONFIRMADO
            );
            
            vooRepository.save(voo);
            System.out.println("Voo criado com sucesso: " + origem.getCodigo() + " -> " + destino.getCodigo());
        } catch (Exception e) {
            System.err.println("Erro ao criar voo " + codigoOrigem + " -> " + codigoDestino + ": " + e.getMessage());
            e.printStackTrace();
        }
    }
}