package com.grafica.estoque.senai.graficaestoque.controller;

import com.grafica.estoque.senai.graficaestoque.model.Movimentacao;
import com.grafica.estoque.senai.graficaestoque.service.MovimentacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.config.ResourceReaderRepositoryPopulatorBeanDefinitionParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
@RequiredArgsConstructor
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    @PostMapping
    public  ResponseEntity<Movimentacao> registrar( @RequestBody Movimentacao movimentacao ) {

        return ResponseEntity.ok(movimentacaoService.registrar( movimentacao ));

    }

    @GetMapping("/insumo/{insumoId}")
    public ResponseEntity<List<Movimentacao>> listarPorInsumo( @PathVariable Long insumoId ) {

        return ResponseEntity.ok(movimentacaoService.listarPorInsumo(insumoId));

    }

}

