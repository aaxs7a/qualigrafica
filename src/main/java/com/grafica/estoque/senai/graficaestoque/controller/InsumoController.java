package com.grafica.estoque.senai.graficaestoque.controller;

import com.grafica.estoque.senai.graficaestoque.dto.InsumoDTO;
import com.grafica.estoque.senai.graficaestoque.model.Insumo;
import com.grafica.estoque.senai.graficaestoque.service.InsumoService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/insumos")
@RequiredArgsConstructor
public class InsumoController {

    private final InsumoService insumoService;

    @GetMapping
    public ResponseEntity<List<InsumoDTO>> listar ( @RequestParam( required = false ) String busca ) {

        List<Insumo> insumos = busca != null

                ? insumoService.bucarPorNome(busca)
                : insumoService.listarTodos();

        List<InsumoDTO> response = insumos.stream().map(insumo -> {

            InsumoDTO dto = new InsumoDTO();
            dto.setId(insumo.getId());
            dto.setNome(insumo.getNome());
            dto.setTipo(insumo.getTipo());
            dto.setGramatura(insumo.getGramatura());
            dto.setUnidadeMedida(insumo.getUnidadeMedida());
            dto.setQtdAtual(insumo.getQtdAtual());
            dto.setQtdMinima(insumo.getQtdMinima());
            dto.setAbaixoDoMinimo(insumoService.estoqueAbaixoDoMinimo(insumo));
            return dto;

        }).toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Insumo> criar(@RequestBody Insumo insumo) {

        return ResponseEntity.ok(insumoService.salvar(insumo));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Insumo> atualizar(@PathVariable Long id, @RequestBody Insumo insumo) {

        insumo.setId(id);
        return ResponseEntity.ok(insumoService.salvar(insumo));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        insumoService.deletar(id);
        return ResponseEntity.noContent().build();

    }
}
