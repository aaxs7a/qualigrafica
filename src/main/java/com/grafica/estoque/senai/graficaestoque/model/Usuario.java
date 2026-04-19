package com.grafica.estoque.senai.graficaestoque.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuario" )

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    @Column(nullable = false )
    private String nome;

    @Column(nullable = false, unique = true )
    private String email;

    @Column(nullable = false )
    private String senhaHash;

    @Column(name = "criado_em" )
    private LocalDateTime criadoEm;

}
