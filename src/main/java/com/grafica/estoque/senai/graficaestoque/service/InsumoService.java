package com.grafica.estoque.senai.graficaestoque.service;

import com.grafica.estoque.senai.graficaestoque.model.Insumo;
import com.grafica.estoque.senai.graficaestoque.repository.InsumoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor

public class InsumoService {

    private final InsumoRepository insumoRepository;

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

    public void deletar(Long id) {
        insumoRepository.deleteById(id);
    }

    public boolean estoqueAbaixoDoMinimo(Insumo insumo) {
        return insumo.getQtdAtual() < insumo.getQtdMinima();
    }
}
