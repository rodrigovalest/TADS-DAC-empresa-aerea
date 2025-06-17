package org.skytads.msreserva.integration.clients;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.skytads.msreserva.config.FeignAuthPropagationConfig;

import lombok.Data;

@FeignClient(
        name  = "ms-cliente",
        url   = "http://ms-cliente:8080",
        path  = "/clientes",
        configuration = FeignAuthPropagationConfig.class
)
public interface ClienteClient {

    @GetMapping("/{id}/milhas")
    SaldoMilhasResponse obterSaldoMilhas(@PathVariable("id") Long id);

    @Data
    class SaldoMilhasResponse {
        @JsonProperty("saldo_milhas")
        private Long saldoMilhas;
    }

}
