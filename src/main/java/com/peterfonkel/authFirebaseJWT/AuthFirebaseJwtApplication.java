package com.peterfonkel.authFirebaseJWT;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;

import com.peterfonkel.authFirebaseJWT.ClaseConfiguracionJava;

@SpringBootApplication
@ImportResource({"classpath:config/jpa-config.xml"})
@Import({ ClaseConfiguracionJava.class})
public class AuthFirebaseJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthFirebaseJwtApplication.class, args);
		System.out.println("API arrancada");
	}

}
