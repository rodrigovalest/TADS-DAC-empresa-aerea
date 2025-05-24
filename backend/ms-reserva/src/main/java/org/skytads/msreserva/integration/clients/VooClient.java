package org.skytads.msreserva.integration.clients;

import org.skytads.msreserva.dtos.requests.CriarReservaVooRequestDto;
import org.skytads.msreserva.dtos.responses.CriarReservaVooResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-voos", url = "http://localhost:8083")
public interface VooClient {

    @PutMapping("/voos/{codigo}/reservar-poltronas")
    CriarReservaVooResponseDto criarReservaReservarPoltronasVoo(
            @PathVariable("codigo") Long codigo, @RequestBody CriarReservaVooRequestDto dto
    );
}
