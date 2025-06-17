package org.skytads.msreserva.exceptions;

public class SaldoMilhasInsuficienteException extends RuntimeException {
    public SaldoMilhasInsuficienteException(String msg,
                                            Long clienteId,
                                            Long saldo,
                                            Long solicitado) {
        super(msg + " | cliente=" + clienteId +
              " saldo=" + saldo + " solicitado=" + solicitado);
    }
}
