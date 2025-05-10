package org.skytads.msreserva.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.skytads.msreserva.enums.EstadoReservaEnum;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "historico_alteracao_reserva")
public class HistoricoReservaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = false)
    private ReservaEntity reserva;

    @CreationTimestamp
    @Column(name = "data_hora_alteracao", nullable = false)
    private LocalDateTime dataHoraAlteracao;

    @Column(nullable = false)
    private EstadoReservaEnum estadoOrigem;

    @Column(nullable = false)
    private EstadoReservaEnum estadoDestino;
}
