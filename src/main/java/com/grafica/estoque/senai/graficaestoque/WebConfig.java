package com.grafica.estoque.senai.graficaestoque;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;

@Configuration
public class WebConfig {

    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {

                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {

                        Resource resource = location.createRelative(resourcePath);
                        return resource.exists() && resource.isReadable()
                                ? resource
                                : new ClassPathResource("/static/index.html");

                    }

                });

    }

}
