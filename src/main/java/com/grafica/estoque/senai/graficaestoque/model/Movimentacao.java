package com.grafica.estoque.senai.graficaestoque.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "movimentacao" )

public class Movimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "insumo_id", nullable = false )
    private Insumo insumo;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false )
    private Usuario usuario;

    @Enumerated(EnumType.STRING )
    @Column(nullable = false )
    private TipoMovimentacao tipo;

    @Column(nullable = false )
    private Integer quantidade;

    @Column(name = "data_movimentacao", nullable = false )
    private LocalDate dataMovimentacao;

    private String observacao;

    public enum TipoMovimentacao {
        ENTRADA,
        SAIDA
    }



}
