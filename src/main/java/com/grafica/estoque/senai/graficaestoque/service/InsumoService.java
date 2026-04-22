package com.grafica.estoque.senai.graficaestoque.service;

import com.grafica.estoque.senai.graficaestoque.model.Insumo;
import com.grafica.estoque.senai.graficaestoque.repository.InsumoRepository;
import com.grafica.estoque.senai.graficaestoque.repository.MovimentacaoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor

public class InsumoService {

    private final InsumoRepository insumoRepository;
    private final MovimentacaoRepository movimentacaoRepository;

    public List<Insumo> listarTodos() {

        return insumoRepository.findAll();

    }

    public List<Insumo> buscarPorNome(String nome) {

        return insumoRepository.findByNomeContainingIgnoreCase(nome);

    }

    public Insumo salvar(Insumo insumo) {

        return insumoRepository.save(insumo);

    }

    public Insumo buscarPorId(Long id) {

        return insumoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo não encontrado!"));

    }

    @Transactional
    public void deletar(Long id) {

        movimentacaoRepository.deleteByInsumoId(id);
        insumoRepository.deleteById(id);

    }

    public boolean estoqueAbaixoDoMinimo(Insumo insumo) {

        return insumo.getQtdAtual() < insumo.getQtdMinima();

    }

    public List<Insumo> bucarPorNome(String busca) {

        return insumoRepository.findByNomeContainingIgnoreCase(busca);

    }
}
