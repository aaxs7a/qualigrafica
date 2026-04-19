package com.grafica.estoque.senai.graficaestoque.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Insumo" )

public class Insumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    @Column(nullable = false )
    private String nome;

    @Column(nullable = false )
    private String tipo;

    private String gramatura;

    @Column(name = "unidade medida" )
    private String unidadeMedida;

    @Column(name = "qtd_atual" )
    private Integer qtdAtual;

    @Column(name = "qtd_minima" )
    private Integer qtdMinima;

    @Column(name = "cadastrado_em" )
    private LocalDateTime cadastradoEm;

}
