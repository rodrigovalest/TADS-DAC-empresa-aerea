package org.skytads.msreserva.integration.clients;

import org.skytads.msreserva.dtos.responses.SaldoMilhasResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.skytads.msreserva.config.FeignAuthPropagationConfig;

@FeignClient(
        name  = "ms-cliente",
        url   = "${cliente.service.url}",
        path  = "/clientes",
        configuration = FeignAuthPropagationConfig.class
)
public interface ClienteClient {

    @GetMapping("/{id}/milhas")
    SaldoMilhasResponse obterSaldoMilhas(@PathVariable("id") Long id);
}
