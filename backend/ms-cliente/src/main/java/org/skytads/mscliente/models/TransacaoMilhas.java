package org.skytads.mscliente.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "transacoes_milhas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransacaoMilhas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_cpf", nullable = false)
    private Cliente cliente;
    
    @Column(nullable = false)
    private LocalDateTime dataHora;
    
    @Column(nullable = false)
    private Integer quantidadeMilhas;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransacao tipo;
    
    private String codigoReserva;
    
    @Column(nullable = false)
    private String descricao;
    
    private Double valorEmReais;
}