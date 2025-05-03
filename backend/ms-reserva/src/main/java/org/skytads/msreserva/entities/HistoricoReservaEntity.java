package org.skytads.msreserva.entities;

import jakarta.persistence.*;
import org.skytads.msreserva.enums.EstadoReservaEnum;

import java.time.LocalDateTime;

@Entity
@Table(name = "historico_alteracao_reserva")
public class HistoricoReservaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = false)
    private ReservaEntity reserva;

    @Column(name = "data_hora_alteracao", nullable = false)
    private LocalDateTime dataHoraAlteracao;

    @Column(nullable = false)
    private EstadoReservaEnum estadoOrigem;

    @Column(nullable = false)
    private EstadoReservaEnum estadoDestino;
}
