package com.grafica.estoque.senai.graficaestoque.service;

import com.grafica.estoque.senai.graficaestoque.model.Insumo;
import com.grafica.estoque.senai.graficaestoque.model.Movimentacao;
import com.grafica.estoque.senai.graficaestoque.repository.MovimentacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor

public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final InsumoService insumoService;

    public Movimentacao registrar(Movimentacao movimentacao) {
        Insumo insumo = insumoService.buscarPorId(movimentacao.getInsumo().getId());

        if (movimentacao.getTipo() == Movimentacao.TipoMovimentacao.ENTRADA ) {
            insumo.setQtdAtual(insumo.getQtdAtual() + movimentacao.getQuantidade());
        }
        else
        {
            if (insumo.getQtdAtual() < movimentacao.getQuantidade()) {
                throw new RuntimeException("Quantidade insuficiente em estoque.");
            }
            insumo.setQtdAtual(insumo.getQtdAtual() - movimentacao.getQuantidade());
        }

        insumoService.salvar(insumo);
        return movimentacaoRepository.save(movimentacao);
    }

    public List<Movimentacao> listarPorInsumo(Long insumoId) {
        return movimentacaoRepository.findByInsumoIdOrderByDataMovimentacaoDesc(insumoId);
    }
}
