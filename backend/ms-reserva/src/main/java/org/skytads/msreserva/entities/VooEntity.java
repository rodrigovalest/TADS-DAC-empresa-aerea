package org.skytads.msreserva.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_voos")
public class VooEntity {

    @Id
    @Column(name = "codigo")
    private Long codigo;

    @Column(nullable = false)
    private String data;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aeroporto_origem_codigo")
    private AeroportoEntity aeroportoOrigem;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aeroporto_destino_codigo")
    private AeroportoEntity aeroportoDestino;

    @Column(nullable = false)
    private Float valorPassagem;

    @Column(nullable = false)
    private Long quantidadePoltronasTotal;

    @Column(nullable = false)
    private Long quantidadePoltronasOcupadas;
}
