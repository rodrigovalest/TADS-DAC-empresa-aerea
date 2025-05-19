// Acho que esse arquivo está sobrando. O teste de milhas do professor vai ser direto no ClienteController.java

package org.skytads.mscliente.controllers;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.dtos.requests.TransacaoMilhasDTO;
import org.skytads.mscliente.services.TransacaoMilhasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/transacoes-milhas")
public class TransacaoMilhasController {

    private final TransacaoMilhasService transacaoMilhasService;

    @PostMapping("/comprar")
    public ResponseEntity<TransacaoMilhasDTO> comprarMilhas(
            @RequestParam @NotBlank String cpf,
            @RequestParam @NotNull @Min(1) Integer quantidadeMilhas) {
        
        TransacaoMilhasDTO transacao = transacaoMilhasService.comprarMilhas(cpf, quantidadeMilhas);
        return ResponseEntity.ok(transacao);
    }

    @GetMapping("/extrato/{cpf}")
    public ResponseEntity<List<TransacaoMilhasDTO>> listarExtrato(@PathVariable("cpf") String cpf) {
        List<TransacaoMilhasDTO> extrato = transacaoMilhasService.listarExtrato(cpf);
        return ResponseEntity.ok(extrato);
    }
    
}