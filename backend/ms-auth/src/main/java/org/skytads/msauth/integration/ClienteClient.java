package org.skytads.msauth.integration;

import org.skytads.msauth.dtos.requests.ValidateCredentialsRequestDto;
import org.skytads.msauth.dtos.responses.ClienteResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-cliente", url = "${integration.client.mscliente.url}")
public interface ClienteClient {

    @PostMapping("/validate")
    ClienteResponseDto validateCredentials(@RequestBody ValidateCredentialsRequestDto requestDto);
}
