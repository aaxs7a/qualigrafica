package com.grafica.estoque.senai.graficaestoque.repository;

import com.grafica.estoque.senai.graficaestoque.model.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long>{

    // Busca todas as movimentações de um insumo específico de recent para antigo

    List<Movimentacao> findByInsumoIdOrderByDataMovimentacaoDesc(Long insumoId);

}
