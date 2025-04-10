package org.skytads.mscliente.services;

import org.skytads.mscliente.dtos.requests.TransacaoMilhasDTO;
import org.skytads.mscliente.exceptions.ClienteNaoEncontradoException;
import org.skytads.mscliente.exceptions.ValidationException;
import org.skytads.mscliente.mappers.TransacaoMilhasMapper;
import org.skytads.mscliente.models.Cliente;
import org.skytads.mscliente.models.TipoTransacao;
import org.skytads.mscliente.models.TransacaoMilhas;
import org.skytads.mscliente.repositories.ClienteRepository;
import org.skytads.mscliente.repositories.TransacaoMilhasRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransacaoMilhasService {

    private final TransacaoMilhasRepository transacaoMilhasRepository;
    private final ClienteRepository clienteRepository;
    private final ClienteService clienteService;
    
    private static final double VALOR_POR_MILHA = 5.0;
    private static final String DESCRICAO_COMPRA_MILHAS = "COMPRA DE MILHAS";
    private static final String FORMATO_DESCRICAO_RESERVA = "%s->%s";
    private static final String FORMATO_DESCRICAO_CANCELAMENTO = "CANCELAMENTO RESERVA %s";
    private static final String ERRO_QUANTIDADE_MILHAS = "A quantidade de milhas deve ser maior que zero";
    private static final String ERRO_CLIENTE_NAO_ENCONTRADO = "Cliente não encontrado com CPF: ";

    @Transactional
    public TransacaoMilhasDTO comprarMilhas(String cpf, Integer quantidadeMilhas) {
        validarQuantidadeMilhas(quantidadeMilhas);
        
        Cliente cliente = buscarClientePorCpf(cpf);
        double valorEmReais = calcularValorEmReais(quantidadeMilhas);
        
        TransacaoMilhas transacao = criarTransacao(
            cliente, 
            quantidadeMilhas, 
            TipoTransacao.ENTRADA, 
            DESCRICAO_COMPRA_MILHAS, 
            null, 
            valorEmReais
        );
        
        clienteService.atualizarMilhas(cpf, quantidadeMilhas);
        
        return TransacaoMilhasMapper.toDTO(transacao);
    }
    
    @Transactional
    public TransacaoMilhasDTO registrarTransacaoDeReserva(String cpf, String codigoReserva, Integer milhasUtilizadas, 
                                                         String origem, String destino, Double valorEmReais) {
        validarQuantidadeMilhas(milhasUtilizadas);
        
        Cliente cliente = buscarClientePorCpf(cpf);
        String descricao = String.format(FORMATO_DESCRICAO_RESERVA, origem, destino);
        
        TransacaoMilhas transacao = criarTransacao(
            cliente, 
            milhasUtilizadas,
            TipoTransacao.SAIDA, 
            descricao, 
            codigoReserva, 
            valorEmReais
        );
        
        clienteService.atualizarMilhas(cpf, -milhasUtilizadas);
        
        return TransacaoMilhasMapper.toDTO(transacao);
    }
    
    @Transactional
    public TransacaoMilhasDTO estornarMilhasDeReserva(String cpf, String codigoReserva, Integer milhasUtilizadas) {
        validarQuantidadeMilhas(milhasUtilizadas);
        
        Cliente cliente = buscarClientePorCpf(cpf);
        String descricao = String.format(FORMATO_DESCRICAO_CANCELAMENTO, codigoReserva);
        
        TransacaoMilhas transacao = criarTransacao(
            cliente, 
            milhasUtilizadas,
            TipoTransacao.ENTRADA, 
            descricao, 
            codigoReserva, 
            null
        );
        
        clienteService.atualizarMilhas(cpf, milhasUtilizadas);
        
        return TransacaoMilhasMapper.toDTO(transacao);
    }
    
    @Transactional(readOnly = true)
    public List<TransacaoMilhasDTO> listarExtrato(String cpf) {
        buscarClientePorCpf(cpf);
        
        List<TransacaoMilhas> transacoes = transacaoMilhasRepository.findByClienteCpfOrderByDataHoraDesc(cpf);
        
        return transacoes.stream()
                .map(TransacaoMilhasMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    private Cliente buscarClientePorCpf(String cpf) {
        return clienteRepository.findByCpf(cpf)
                .orElseThrow(() -> new ClienteNaoEncontradoException(ERRO_CLIENTE_NAO_ENCONTRADO + cpf));
    }
    
    private double calcularValorEmReais(Integer quantidadeMilhas) {
        return quantidadeMilhas * VALOR_POR_MILHA;
    }
    
    private void validarQuantidadeMilhas(Integer quantidadeMilhas) {
        if (quantidadeMilhas <= 0) {
            throw new ValidationException(ERRO_QUANTIDADE_MILHAS);
        }
    }
    
    private TransacaoMilhas criarTransacao(Cliente cliente, Integer quantidadeMilhas, 
                                          TipoTransacao tipo, String descricao, 
                                          String codigoReserva, Double valorEmReais) {
        TransacaoMilhas transacao = new TransacaoMilhas();
        transacao.setCliente(cliente);
        transacao.setDataHora(LocalDateTime.now());
        transacao.setQuantidadeMilhas(quantidadeMilhas);
        transacao.setTipo(tipo);
        transacao.setDescricao(descricao);
        transacao.setCodigoReserva(codigoReserva);
        transacao.setValorEmReais(valorEmReais);
        
        return transacaoMilhasRepository.save(transacao);
    }
}