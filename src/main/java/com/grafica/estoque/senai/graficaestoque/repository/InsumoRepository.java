package com.grafica.estoque.senai.graficaestoque.repository;

import com.grafica.estoque.senai.graficaestoque.model.Insumo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InsumoRepository extends JpaRepository<Insumo, Long>{

    List<Insumo> findByNomeContainingIgnoreCase(String nome);
    
}
