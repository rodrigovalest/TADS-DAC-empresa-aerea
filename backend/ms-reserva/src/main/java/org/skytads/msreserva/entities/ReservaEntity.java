package org.skytads.msreserva.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
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

    @Column(name = "codigo_cliente", nullable = false)
    private Long codigoCliente;

    @Column(name = "codigo_voo", nullable = false)
    private Long codigoVoo;

    @Column(name = "quantidade_poltronas", nullable = false)
    private Long quantidadePoltronas;

    @CreationTimestamp
    @Column(name = "data_hora_reserva", nullable = false)
    private LocalDateTime dataHoraReserva;

    @Column(nullable = false)
    private EstadoReservaEnum estado;
}
