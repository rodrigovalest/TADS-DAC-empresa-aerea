package org.skytads.msreserva.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msreserva.enums.EstadoReservaEnum;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_reservas")
public class ReservaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long codigo;

    @Column(nullable = false)
    private Long codigoVoo;

    @Column(name = "data_hora_reserva", nullable = false)
    private LocalDateTime dataHoraReserva;

    @Column(nullable = false)
    private EstadoReservaEnum estado;
}
