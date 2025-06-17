// package org.skytads.msreserva.usecases;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import org.skytads.msreserva.dtos.requests.CriarReservaVooRequestDto;
// import org.skytads.msreserva.dtos.responses.CriarReservaVooResponseDto;
// import org.skytads.msreserva.entities.AeroportoEntity;
// import org.skytads.msreserva.entities.ReservaEntity;
// import org.skytads.msreserva.entities.VooEntity;
// import org.skytads.msreserva.integration.clients.ClienteClient;
// import org.skytads.msreserva.integration.clients.VooClient;
// import org.skytads.msreserva.integration.producer.CriarReservaProducer;
// import org.skytads.msreserva.mappers.VooMapper;
// import org.skytads.msreserva.services.AeroportoService;
// import org.skytads.msreserva.services.ReservaService;
// import org.skytads.msreserva.services.VooService;
// import org.springframework.stereotype.Component;
// import org.springframework.transaction.annotation.Transactional;

// @Slf4j
// @RequiredArgsConstructor
// @Component
// public class CriarReservaUseCase {
//     private final ReservaService reservaService;
//     private final VooService vooService;
//     private final AeroportoService aeroportoService;
//     private final VooClient vooClient;
//     private final ClienteClient clienteClient;

//     @Transactional
//     public ReservaEntity execute(Float valor, Long milhas, Long quantidadePoltronas, Long codigoCliente, Long codigoVoo) {
//         log.info("[SAGA criar reserva (1)] criar reserva | valor {} | milhas {} | quantidadePoltronas {} | codigoCliente {} | codigoVoo {}", valor, milhas, quantidadePoltronas, codigoCliente, codigoVoo);

//         CriarReservaVooResponseDto criarReservaVooResponseDto = this.vooClient.criarReservaReservarPoltronasVoo(
//                 codigoVoo, new CriarReservaVooRequestDto(quantidadePoltronas)
//         );

//         log.info("[SAGA criar reserva (2)] reservar poltronas voo response: {}", criarReservaVooResponseDto);
//         VooEntity voo = VooMapper.toEntity(criarReservaVooResponseDto);
//         AeroportoEntity aeroportoOrigem = this.aeroportoService.criarOuAtualizarCopiaAeroporto(voo.getAeroportoOrigem());
//         AeroportoEntity aeroportoDestino = this.aeroportoService.criarOuAtualizarCopiaAeroporto(voo.getAeroportoDestino());

//         voo.setAeroportoOrigem(aeroportoOrigem);
//         voo.setAeroportoDestino(aeroportoDestino);
//         VooEntity persistedVoo = this.vooService.criarOuAtualizarCopiaVoo(voo);

//         ReservaEntity reserva = this.reservaService.criarReserva(valor, milhas, quantidadePoltronas, codigoCliente, persistedVoo);

//         log.info("[SAGA criar reserva (3)] Validar cliente e usar milhas | reservaId {}, milhas {}, cliente id {}", reserva.getCodigo(), milhas, codigoCliente);
//         reservaService.usarMilhasCliente(reserva.getCodigo());

//         return reserva;
//     }
// }

package org.skytads.msreserva.usecases;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.dtos.requests.CriarReservaVooRequestDto;
import org.skytads.msreserva.dtos.responses.CriarReservaVooResponseDto;
import org.skytads.msreserva.entities.AeroportoEntity;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.VooEntity;
import org.skytads.msreserva.exceptions.SaldoMilhasInsuficienteException;
import org.skytads.msreserva.integration.clients.ClienteClient;
import org.skytads.msreserva.integration.clients.VooClient;
import org.skytads.msreserva.mappers.VooMapper;
import org.skytads.msreserva.services.AeroportoService;
import org.skytads.msreserva.services.ReservaService;
import org.skytads.msreserva.services.VooService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Use-case responsável por orquestrar a criação de uma reserva.
 * <p>
 * Regras implementadas:
 * <ol>
 *   <li>Verificar saldo de milhas do cliente antes de iniciar a ​saga​.</li>
 *   <li>Reservar as poltronas no MS-Voos.</li>
 *   <li>Persistir cópias locais (CQRS) de voo e aeroportos.</li>
 *   <li>Criar a reserva em estado <code>CRIADA</code>.</li>
 *   <li>Disparar evento para o MS-Cliente descontar milhas (continuação da ​saga​).</li>
 * </ol>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CriarReservaUseCase {

    private final ReservaService   reservaService;
    private final VooService       vooService;
    private final AeroportoService aeroportoService;
    private final VooClient        vooClient;
    private final ClienteClient    clienteClient;   // ← novo

    /**
     * Executa o fluxo de criação da reserva.
     *
     * @param valor              valor da reserva em R$
     * @param milhasSolicitadas  quantidade de milhas a descontar
     * @param quantidadePoltronas número de poltronas
     * @param codigoCliente      id do cliente
     * @param codigoVoo          id do voo
     * @return entidade da reserva persistida
     */
    @Transactional
    public ReservaEntity execute(
            Float valor,
            Long  milhasSolicitadas,
            Long  quantidadePoltronas,
            Long  codigoCliente,
            Long  codigoVoo) {

        log.info("[SAGA criar reserva (1)] Início | valor={} milhas={} poltronas={} cliente={} voo={}",
                 valor, milhasSolicitadas, quantidadePoltronas, codigoCliente, codigoVoo);

        /* ------------------------------------------------------------------
         * 0. Verificar saldo de milhas do cliente (validação síncrona)
         * ------------------------------------------------------------------ */
        Long saldo = clienteClient.obterSaldoMilhas(codigoCliente).getSaldoMilhas();
        if (milhasSolicitadas > saldo) {
            throw new SaldoMilhasInsuficienteException(
                    "Saldo de milhas insuficiente",
                    codigoCliente,
                    saldo,
                    milhasSolicitadas);
        }

        /* ------------------------------------------------------------------
         * 1. Reservar poltronas no MS-Voos
         * ------------------------------------------------------------------ */
        CriarReservaVooResponseDto vooDto = vooClient
                .criarReservaReservarPoltronasVoo(
                        codigoVoo,
                        new CriarReservaVooRequestDto(quantidadePoltronas));

        log.info("[SAGA criar reserva (2)] Poltronas reservadas no voo {} | response={}",
                 codigoVoo, vooDto);

        /* ------------------------------------------------------------------
         * 2. Persistir cópia local do voo + aeroportos (CQRS read-side)
         * ------------------------------------------------------------------ */
        VooEntity voo = VooMapper.toEntity(vooDto);

        AeroportoEntity origemPersisted   =
                aeroportoService.criarOuAtualizarCopiaAeroporto(voo.getAeroportoOrigem());
        AeroportoEntity destinoPersisted  =
                aeroportoService.criarOuAtualizarCopiaAeroporto(voo.getAeroportoDestino());

        voo.setAeroportoOrigem(origemPersisted);
        voo.setAeroportoDestino(destinoPersisted);

        VooEntity vooPersisted = vooService.criarOuAtualizarCopiaVoo(voo);

        /* ------------------------------------------------------------------
         * 3. Criar reserva em estado CRIADA
         * ------------------------------------------------------------------ */
        ReservaEntity reserva = reservaService
                .criarReserva(valor, milhasSolicitadas,
                              quantidadePoltronas, codigoCliente, vooPersisted);

        /* ------------------------------------------------------------------
         * 4. Disparar evento para descontar milhas (continuação assíncrona)
         * ------------------------------------------------------------------ */
        log.info("[SAGA criar reserva (3)] Validar cliente e usar milhas | reservaId={} milhas={}",
                 reserva.getCodigo(), milhasSolicitadas);

        reservaService.usarMilhasCliente(reserva.getCodigo());

        return reserva;
    }
}
