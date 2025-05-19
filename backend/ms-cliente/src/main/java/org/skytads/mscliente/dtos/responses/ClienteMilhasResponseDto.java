package org.skytads.mscliente.dtos.responses;

import java.util.List;

public class ClienteMilhasResponseDto {
    private String codigo;
    private Long saldoMilhas;
    private List<?> transacoes;

    public ClienteMilhasResponseDto(String codigo, Long saldoMilhas, List<?> transacoes) {
        this.codigo = codigo;
        this.saldoMilhas = saldoMilhas;
        this.transacoes = transacoes;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Long getSaldoMilhas() {
        return saldoMilhas;
    }

    public void setSaldoMilhas(Long saldoMilhas) {
        this.saldoMilhas = saldoMilhas;
    }

    public List<?> getTransacoes() {
        return transacoes;
    }

    public void setTransacoes(List<?> transacoes) {
        this.transacoes = transacoes;
    }
}