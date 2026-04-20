package com.grafica.estoque.senai.graficaestoque.dto;

import lombok.Data;

@Data
public class InsumoDTO {

    private Long id;
    private String nome;
    private String tipo;
    private String gramatura;
    private String unidadeMedida;
    private Integer qtdAtual;
    private Integer qtdMinima;
    private boolean abaixoDoMinimo;

}
