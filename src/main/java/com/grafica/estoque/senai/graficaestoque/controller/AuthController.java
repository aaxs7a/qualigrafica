package com.grafica.estoque.senai.graficaestoque.controller;

import com.grafica.estoque.senai.graficaestoque.dto.LoginRequest;
import com.grafica.estoque.senai.graficaestoque.dto.LoginResponse;
import com.grafica.estoque.senai.graficaestoque.model.Usuario;
import com.grafica.estoque.senai.graficaestoque.repository.UsuarioRepository;
import com.grafica.estoque.senai.graficaestoque.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String token = usuarioService.autenticar(request.getEmail(), request.getSenha());
        Usuario usuario = UsuarioRepository.findByEmail(request.getEmail()).orElseThrow();
        return ResponseEntity.ok(new LoginResponse(token, usuario.getNome()));
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Usuario usuario) {
        usuarioService.registrar(usuario);
        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }
}
