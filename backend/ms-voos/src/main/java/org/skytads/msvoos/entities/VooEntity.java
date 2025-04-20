package org.skytads.msvoos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.skytads.msvoos.enums.StatusVooEnum;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_voos")
public class VooEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long codigo;

    @Column(nullable = false)
    private LocalDateTime data;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aeroporto_origem_codigo")
    private AeroportoEntity aeroportoOrigem;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aeroporto_destino_codigo")
    private AeroportoEntity aeroportoDestino;

    @Column(nullable = false)
    private Float valorPassagem;

    @Column(nullable = false)
    private Long quantidadePoltronas;

    @Column(nullable = false)
    private Long quantidadePoltronasOcupadas;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusVooEnum statusVoo;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public VooEntity(LocalDateTime data, AeroportoEntity aeroportoOrigem, AeroportoEntity aeroportoDestino, Float valorPassagem, Long quantidadePoltronas, Long quantidadePoltronasOcupadas, StatusVooEnum statusVoo) {
        this.data = data;
        this.aeroportoOrigem = aeroportoOrigem;
        this.aeroportoDestino = aeroportoDestino;
        this.valorPassagem = valorPassagem;
        this.quantidadePoltronas = quantidadePoltronas;
        this.quantidadePoltronasOcupadas = quantidadePoltronasOcupadas;
        this.statusVoo = statusVoo;
    }
}
