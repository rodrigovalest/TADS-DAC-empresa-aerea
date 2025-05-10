package org.skytads.msreserva.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_reserva_resumo")
public class ReservaResumoEntity {

    @Id
    @Column(name = "codigo_reserva", nullable = false, unique = true)
    private Long codigoReserva;

    @Column(name = "codigo_cliente", nullable = false)
    private Long codigoCliente;

    @Column(name = "codigo_voo", nullable = false)
    private Long codigoVoo;

    @Column(name = "quantidade_poltronas", nullable = false)
    private Long quantidadePoltronas;

    @Column(name = "valor", nullable = false)
    private Float valor;

    @Column(name = "milhas_utilizadas", nullable = false)
    private Long milhasUtilizadas;
}
