package com.grafica.estoque.senai.graficaestoque.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

@Component
public class JwUtil {

    private final SecretKey chave = new SecretKeySpec(
            "qualigrafica-estoque-senai-pe-2026-arthur-verissimo".getBytes(),
            "HmacSHA256"
    );

    private final long EXPIRACAO = 86400000;

    public String gerarToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRACAO))
                .signWith(chave)
                .compact();
    }

    public String extrairEmail(String token) {
        return Jwts.parser()
                .verifyWith(chave)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validarToken(String token) {
        try {
            extrairEmail(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}