package com.grafica.estoque.senai.graficaestoque.security;

import com.grafica.estoque.senai.graficaestoque.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl  implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername( String email ) throws UsernameNotFoundException {
        var usuario = UsuarioRepository.findByEmail( email )
                .orElseThrow(() -> new UsernameNotFoundException( "Usuário não encontrado: " + email ));

        return User.builder()
                .username( usuario.getEmail ())
                .password( usuario.getSenhaHash ())
                .roles( "USER" )
                .build();
    }
}
