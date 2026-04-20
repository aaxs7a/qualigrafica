package com.grafica.estoque.senai.graficaestoque.service;

import com.grafica.estoque.senai.graficaestoque.model.Usuario;
import com.grafica.estoque.senai.graficaestoque.repository.UsuarioRepository;
import com.grafica.estoque.senai.graficaestoque.security.JwUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwUtil jwUtil;

    public Usuario registrar(Usuario usuario) {
        usuario.setSenhaHash(passwordEncoder.encode(usuario.getSenhaHash()));
        usuario.setCriadoEm(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    public String autenticar(String email, String senha) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, senha));
        return jwUtil.gerarToken(email);
    }
}